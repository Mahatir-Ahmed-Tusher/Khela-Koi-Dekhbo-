import { enrichWithFifaData } from './fifaData';
import { getChannelLogo } from './logoMapper';

function cleanChannelName(name) {
  try {
    return name
      .replace(/\p{Emoji_Presentation}/gu, '')
      .replace(/\p{Extended_Pictographic}/gu, '')
      .replace(/\p{Regional_Indicator}/gu, '')
      .replace(/[\u2600-\u27BF]/g, '') // Dingbats / symbols
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();
  } catch (e) {
    return name.replace(/[^\x00-\x7F]/g, "").trim();
  }
}

export function parseM3U(rawText, source) {
  const lines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const channels = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('#EXTINF')) continue;
    
    let name = 'Unknown Channel';
    // Match tvg-name first, then fallback to comma-separated name at end of line
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
    const nameLower = name.toLowerCase();
    if (nameLower.includes('btv') || nameLower.includes('sansad')) {
      continue;
    }
    
    const logo = (line.match(/tvg-logo="([^"]*)"/) || [])[1] || '';
    const group = (line.match(/group-title="([^"]*)"/) || [])[1] || 'General';
    
    // Find the next non-empty, non-comment line as the stream URL
    let url = '';
    for (let j = i + 1; j < lines.length; j++) {
      const next = lines[j].trim();
      if (next && !next.startsWith('#')) {
        url = next;
        break;
      }
    }
    
    if (!url) continue;
    
    // Create bulletproof unique ID
    const id = `ch_${source}_${channels.length}`;
    const finalLogo = getChannelLogo(name, logo);
    
    if (source === 'fifa') {
      // FIFA playlist: force category to FIFA World Cup 2026 and enrich
      const channel = {
        id,
        name: name.trim(),
        logo: finalLogo,
        group: 'Football World Cup 2026',
        category: 'FIFA World Cup 2026',
        url,
      };
      channels.push(enrichWithFifaData(channel));
    } else {
      // Mahmud picks playlist: skip original FIFA categories to avoid duplicates
      if (group === 'Football World Cup 2026' || group === '⚽ FIFA Special') {
        continue;
      }

      const channel = {
        id,
        name: name.trim(),
        logo: finalLogo,
        group: group.trim(),
        category: mapGroupToCategory(group.trim()),
        url,
      };

      const enriched = enrichWithFifaData(channel);
      if (enriched.fifaPriority && enriched.fifaPriority !== 99) {
        channels.push(enriched);
      } else {
        channels.push({
          ...channel,
          isFifaChannel: false,
          fifaPriority: null,
          fifaBadge: null,
          countryCode: null,
        });
      }
    }
  }
  
  return channels;
}

function mapGroupToCategory(group) {
  const map = {
    'Football World Cup 2026': 'FIFA World Cup 2026',
    '⚽ FIFA Special': 'FIFA Special',
    'Sports': 'Sports',
    'Bangladesh': 'Bangladesh',
    'Indian Entertainment': 'Indian Entertainment',
    'Movies': 'Movies',
    'Music': 'Music',
    'Kids': 'Kids',
    'India News': 'India News',
    'Religious': 'Religious',
    'Business': 'Business',
    'General': 'General',
    'Lifestyle': 'Lifestyle',
    'Documentary': 'Documentary',
    'Comedy': 'Comedy',
    'Legislative': 'Legislative',
  };
  return map[group] || group;
}
