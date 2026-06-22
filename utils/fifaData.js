export function enrichWithFifaData(channel) {
  const name = channel.name.toLowerCase();
  const url = (channel.url || '').toLowerCase();

  // Initialize FIFA fields
  let isFifaChannel = true;
  let fifaPriority = 99;     // Default fallback priority (sits at the end)
  let fifaBadge = 'FIFA Stream';
  let countryCode = 'GL';   // Global default

  // Precise Priority list placing TSNs first, then Caze TV, then Bein Sports Turkey, etc.
  const PRIORITY_RULES = [
    { match: (n, u) => n.includes('tsn 1'), label: 'TSN 1', priority: 1, country: 'CA' },
    { match: (n, u) => n.includes('tsn 2'), label: 'TSN 2', priority: 2, country: 'CA' },
    { match: (n, u) => n.includes('tsn 3'), label: 'TSN 3', priority: 3, country: 'CA' },
    { match: (n, u) => n.includes('tsn 4'), label: 'TSN 4', priority: 4, country: 'CA' },
    { match: (n, u) => n.includes('tsn') && !n.includes('1') && !n.includes('2') && !n.includes('3') && !n.includes('4'), label: 'TSN Live', priority: 5, country: 'CA' },
    { match: (n, u) => n.includes('caze'), label: 'Caze TV', priority: 6, country: 'BR' },
    { match: (n, u) => n.includes('bein') && n.includes('turkey'), label: 'beIN Sports Turkey', priority: 7, country: 'TR' },
    { match: (n, u) => n.includes('bein') && n.includes('1080p'), label: 'beIN Sports 1080p', priority: 8, country: 'GL' },
    { match: (n, u) => n.includes('somoy'), label: 'Somoy TV', priority: 9, country: 'BD' },
    { match: (n, u) => n.includes('sport5'), label: 'SP (IOS)', priority: 10, country: 'IL' },
    { match: (n, u) => n.includes('dazn fast+'), label: 'FAST', priority: 11, country: 'GL' },
    { match: (n, u) => n.includes('bein sports 1') || n.includes('bein sports 1 1080p') || n.includes('bein english') || n.includes('bein sports xtra'), label: 'beIN Sports English', priority: 12, country: 'UK' },
    { match: (n, u) => n.includes('cctv 5'), label: 'CCTV 5', priority: 13, country: 'CN' },
    { match: (n, u) => n.includes('football world cup 2026 sky') || u.includes('rtbgo'), label: 'RTB GO (IOS)', priority: 14, country: 'GL' },
    { match: (n, u) => n.includes('sportv 2'), label: 'SP - 2', priority: 15, country: 'BR' },
    { match: (n, u) => n.includes('sportv 3'), label: 'SP - 3', priority: 16, country: 'BR' },
    { match: (n, u) => n.includes('dsports') || n.includes('d sports'), label: 'D Sports', priority: 17, country: 'GL' },
    { match: (n, u) => n.includes('sportv') && !n.includes('2') && !n.includes('3'), label: 'SPORTV', priority: 18, country: 'BR' },
    { match: (n, u) => n.includes('tr sport') || n.includes('trt sport'), label: 'TRT SPORTS', priority: 19, country: 'TR' },
    { match: (n, u) => n.includes('fussball.tv 1') || n.includes('fussball (g'), label: 'FUSSBALL (GERMANY)', priority: 20, country: 'DE' },
    { match: (n, u) => n.includes('fussball.tv 2') || n.includes('fussball 4k'), label: 'FUSSBALL 4K', priority: 21, country: 'DE' },
    { match: (n, u) => n.includes('joj sport'), label: 'JOJ SPORT', priority: 22, country: 'SK' },
    { match: (n, u) => n.includes('tvp sport'), label: 'TVP SPORT', priority: 23, country: 'PL' }
  ];

  // Try to find a match in the priority rules
  const matchedRule = PRIORITY_RULES.find(rule => rule.match(name, url));

  if (matchedRule) {
    fifaPriority = matchedRule.priority;
    fifaBadge = matchedRule.label;
    countryCode = matchedRule.country;
  } else {
    // General fallback mapping for other channels
    if (name.includes('telemundo')) {
      fifaPriority = 23;
      fifaBadge = 'Telemundo';
      countryCode = 'US';
    } else if (name.includes('fox')) {
      fifaPriority = 24;
      fifaBadge = 'Fox Sports';
      countryCode = 'US';
    } else if (name.includes('bein') || name.includes('be in')) {
      fifaPriority = 25;
      fifaBadge = 'beIN Sports';
      countryCode = 'MENA';
    } else if (name.includes('somoy')) {
      fifaPriority = 26;
      fifaBadge = 'Somoy World Cup';
      countryCode = 'BD';
    } else if (name.includes('t sports') || name.includes('tsports')) {
      fifaPriority = 27;
      fifaBadge = 'T Sports Live';
      countryCode = 'BD';
    } else if (name.includes('willow')) {
      fifaPriority = 28;
      fifaBadge = 'Willow Sports';
      countryCode = 'US';
    } else if (name.includes('real madrid')) {
      fifaPriority = 29;
      fifaBadge = 'RMTV';
      countryCode = 'ES';
    } else if (name.includes('fancode')) {
      fifaPriority = 30;
      fifaBadge = 'FanCode';
      countryCode = 'IN';
    }
  }

  return {
    ...channel,
    isFifaChannel,
    fifaPriority,
    fifaBadge,
    countryCode,
  };
}
