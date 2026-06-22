const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper to normalize strings for comparison
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/\b(hd|sd|4k|3d|alt|alternative|new|live|bd|india|tv|channel|sports|sport|news|asia|uk|us)\b/g, '') // remove common tags
    .replace(/[^a-z0-9]/g, '') // keep only alphanumeric
    .trim();
}

// Clean channel name from emoji/pictographs (same as in m3uParser)
function cleanChannelName(name) {
  try {
    return name
      .replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  } catch (e) {
    return name;
  }
}

// Parse M3U to extract unique clean channel names
function extractNamesFromM3U(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf-8');
  const lines = text.split('\n');
  const names = new Set();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('#EXTINF')) continue;

    let name = 'Unknown Channel';
    const nameMatch = line.match(/tvg-name="([^"]*)"/);
    if (nameMatch && nameMatch[1]) {
      name = nameMatch[1];
    } else {
      const commaIndex = line.lastIndexOf(',');
      if (commaIndex !== -1) {
        name = line.substring(commaIndex + 1).trim();
      }
    }

    name = cleanChannelName(name);
    if (name && name !== 'Unknown Channel') {
      names.add(name);
    }
  }

  return Array.from(names);
}

// Main execution function
async function run() {
  console.log('--- Step 1: Parsing channels from local M3U files ---');
  const projectRoot = path.join(__dirname, '..');
  
  const m3uFiles = [
    path.join(projectRoot, 'mahmud-picks.m3u'),
    path.join(projectRoot, 'IPTV-Flow-World-Cup.m3u')
  ];

  const uniqueChannelNames = new Set();
  m3uFiles.forEach(file => {
    console.log(`Parsing ${path.basename(file)}...`);
    const names = extractNamesFromM3U(file);
    names.forEach(n => uniqueChannelNames.add(n));
  });

  const localNames = Array.from(uniqueChannelNames);
  console.log(`Found ${localNames.length} unique local channel names to resolve.\n`);

  console.log('--- Step 2: Fetching iptv-org channels and logos databases ---');
  
  function fetchJSON(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download: Status ${res.statusCode} for ${url}`));
          return;
        }
        let raw = '';
        res.on('data', (chunk) => { raw += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }

  let apiChannels = [];
  let apiLogos = [];
  try {
    console.log('Fetching channels.json (~10MB)...');
    apiChannels = await fetchJSON('https://iptv-org.github.io/api/channels.json');
    console.log(`Successfully fetched ${apiChannels.length} channels.`);

    console.log('Fetching logos.json (~2MB)...');
    apiLogos = await fetchJSON('https://iptv-org.github.io/api/logos.json');
    console.log(`Successfully fetched ${apiLogos.length} logos.\n`);
  } catch (err) {
    console.error('Error fetching database:', err);
    return;
  }

  // Map logo URLs by channel ID
  const logoMap = new Map();
  apiLogos.forEach(item => {
    if (item.channel && item.url) {
      logoMap.set(item.channel, item.url);
    }
  });

  console.log('--- Step 3: Matching local channels against database ---');
  
  // Build a index of normalized database names for fast lookup
  const dbIndex = new Map();
  apiChannels.forEach(ch => {
    const logoUrl = logoMap.get(ch.id);
    if (!logoUrl) return;
    
    // Index by original name
    const normCh = normalizeName(ch.name);
    if (normCh) {
      if (!dbIndex.has(normCh)) {
        dbIndex.set(normCh, []);
      }
      dbIndex.get(normCh).push(logoUrl);
    }

    // Index by aliases/alt_names if available
    if (ch.alt_names && Array.isArray(ch.alt_names)) {
      ch.alt_names.forEach(alias => {
        const normAlias = normalizeName(alias);
        if (normAlias) {
          if (!dbIndex.has(normAlias)) {
            dbIndex.set(normAlias, []);
          }
          dbIndex.get(normAlias).push(logoUrl);
        }
      });
    }
  });

  const matchedLogos = {};

  localNames.forEach(localName => {
    const normLocal = normalizeName(localName);
    if (!normLocal) return;

    // Check direct normalized match
    let logos = dbIndex.get(normLocal);
    
    // If not found, try partial match (e.g. if database is "CNN International" and local is "CNN")
    if (!logos) {
      for (const [dbNorm, dbLogos] of dbIndex.entries()) {
        if (dbNorm.includes(normLocal) || normLocal.includes(dbNorm)) {
          // Verify that they are close enough in length to avoid false positives (e.g. 'star' matching 'star sports')
          const lenDiff = Math.abs(dbNorm.length - normLocal.length);
          if (lenDiff < 5 || (normLocal.length > 5 && dbNorm.includes(normLocal))) {
            logos = dbLogos;
            break;
          }
        }
      }
    }

    if (logos && logos.length > 0) {
      // Find the first logo that is hosted on a secure CDN or is a valid URL
      const bestLogo = logos.find(l => l.startsWith('http')) || logos[0];
      matchedLogos[localName.toLowerCase()] = bestLogo;
    }
  });

  console.log(`Matched ${Object.keys(matchedLogos).length} channels to official logo URLs.\n`);

  console.log('--- Step 4: Merging with existing logoMapper.js values ---');
  
  // Read current mapper to keep custom handpicked mappings intact
  const mapperPath = path.join(__dirname, 'logoMapper.js');
  let currentContent = fs.readFileSync(mapperPath, 'utf-8');
  
  // Extract custom mappings that were hand-mapped (usually from upload.wikimedia.org)
  const existingMapMatch = currentContent.match(/const LOGO_MAP = (\[[\s\S]*?\]);/);
  if (!existingMapMatch) {
    console.error('Could not parse current logoMapper.js structure.');
    return;
  }

  // Parse current map manually
  const existingMap = eval(existingMapMatch[1]);
  
  // Create a map of keywords -> logo URL from existing mappings
  const mergedKeywords = [];
  
  existingMap.forEach(item => {
    mergedKeywords.push(item);
  });

  // For any new matched logos from iptv-org, add them as new keyword mappings if not already covered
  let newMatchesCount = 0;
  for (const [name, logo] of Object.entries(matchedLogos)) {
    // Check if any existing entry covers this channel name in its keywords
    const isCovered = existingMap.some(item => 
      item.keywords.some(kw => name.includes(kw) || kw.includes(name))
    );

    if (!isCovered) {
      mergedKeywords.push({
        keywords: [name],
        logo: logo
      });
      newMatchesCount++;
    }
  }

  console.log(`Added ${newMatchesCount} new channel mappings from the database.\n`);

  // Write new file content
  const newContent = `'use client';

// LOGO_MAP matches channel names against keywords to find high-quality logos.
// Values combine handpicked Wikimedia SVG logos and auto-fetched logos from the iptv-org database.
const LOGO_MAP = ${JSON.stringify(mergedKeywords, null, 2)};

export function getChannelLogo(name = '', m3uLogo = '') {
  // If we have a valid M3U logo URL, use it first
  if (m3uLogo && m3uLogo.trim().startsWith('http')) {
    return m3uLogo.trim();
  }

  // Try to match search terms in our official logo map
  const nameLower = name.toLowerCase();
  const matched = LOGO_MAP.find(item => 
    item.keywords.some(keyword => nameLower.includes(keyword))
  );

  if (matched) {
    return matched.logo;
  }

  // Default fallback to a high-quality TV broadcast network logo
  return 'https://upload.wikimedia.org/wikipedia/commons/3/34/TVP_Sport_logo_2021.svg';
}
`;

  fs.writeFileSync(mapperPath, newContent, 'utf-8');
  console.log('Successfully updated logoMapper.js with the new mappings!');
}

run().catch(console.error);
