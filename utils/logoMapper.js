'use client';

const LOGO_MAP = [
  { keywords: ['somoy'], logo: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Somoy_TV_logo.svg' },
  { keywords: ['t sports', 'tsports'], logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/T-sports-logo.png' },
  { keywords: ['caze'], logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_Caz%C3%A9TV.png' },
  { keywords: ['bein'], logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/BeIN_Sports_logo.svg' },
  { keywords: ['tsn'], logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/TSN_Logo.svg' },
  { keywords: ['sport5'], logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Sport_5_logo.png' },
  { keywords: ['dazn'], logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/DAZN_Logo.svg' },
  { keywords: ['cctv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/CCTV-5_logo.svg' },
  { keywords: ['rtbgo', 'rtb go'], logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Radio_Television_Brunei_logo.png' },
  { keywords: ['sportv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/SporTV_logo.svg' },
  { keywords: ['trt', 'tr sport', 'idman'], logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/TRT_Spor_logo_2021.svg' },
  { keywords: ['dsports', 'd sports'], logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/D_Sports_logo.svg/1024px-D_Sports_logo.svg.png' },
  { keywords: ['fussball'], logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/2026_FIFA_World_Cup_emblem.svg/1280px-2026_FIFA_World_Cup_emblem.svg.png' },
  { keywords: ['joj'], logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/JOJ_Group_logo.png' },
  { keywords: ['tvp'], logo: 'https://upload.wikimedia.org/wikipedia/commons/3/34/TVP_Sport_logo_2021.svg' },
  { keywords: ['real madrid', 'rmtv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Real_Madrid_TV_Logo.png' },
  { keywords: ['willow'], logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Willow_logo.png' },
  { keywords: ['fancode'], logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/FanCode_Logo.png' },
  { keywords: ['telemundo'], logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Telemundo_logo.svg' },
  { keywords: ['fox sports', 'fox sports 2', 'fox ny', 'fox 11', 'fx sports', 'fx prem'], logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Fox_Sports_logo.svg' },
  { keywords: ['quran'], logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Saudi_Quran_logo.png' },
  { keywords: ['btv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/BTV_logo.svg' },
  { keywords: ['sansad'], logo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Sansad_TV_logo.png' },
  { keywords: ['ptv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/PTV_Sports_logo_2022.svg' },
  { keywords: ['tyc'], logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/TyC_Sports_Logo_2021.png' },
  { keywords: ['fubo'], logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Fubo_TV_logo.svg' },
  { keywords: ['redbull', 'red bull'], logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Red_Bull_TV_logo.svg' },
  { keywords: ['fight network'], logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Fight_Network_logo.png' },
  { keywords: ['fuel tv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/FUEL_TV_Logo.svg' },
  { keywords: ['horse & country'], logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Horse_%26_Country_logo.png' },
  { keywords: ['sport italia', 'sportitalia'], logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Sportitalia_logo_2019.png' },
  { keywords: ['cignal'], logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Cignal_logo.png' },
  { keywords: ['sky'], logo: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Sky_Sports_logo_2020.svg' },
  { keywords: ['starhub'], logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/StarHub_Logo.svg' },
  // Extended listings (Star Sports, ESPN, and Bangladeshi / Indian entertainment)
  { keywords: ['star sports', 'sspts'], logo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Star_Sports_logo.svg' },
  { keywords: ['espn'], logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg' },
  { keywords: ['sony max'], logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Sony_MAX_logo.svg' },
  { keywords: ['star jalsha'], logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Star_Jalsha_logo.png' },
  { keywords: ['zee bangla'], logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Zee_Bangla_Logo.png' },
  { keywords: ['colors bangla'], logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Colors_Bangla_logo.png' },
  { keywords: ['ntv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/NTV_Bangladesh_logo.png' },
  { keywords: ['rtv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/RTV_Bangladesh_Logo.png' },
  { keywords: ['jamuna'], logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Jamuna_Television_logo.png' },
  { keywords: ['ekattor'], logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Ekattor_TV_logo.png' },
  { keywords: ['channel i'], logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Channel_i_logo.png' },
  { keywords: ['duronto'], logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Duronto_TV_logo.png' },
  { keywords: ['banglavision', 'bangla vision'], logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Banglavision_logo.svg/1024px-Banglavision_logo.svg.png' },
  { keywords: ['independent tv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Independent_Television_logo.png' },
  { keywords: ['dbc news'], logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/DBC_News_logo.png' },
  { keywords: ['maasranga'], logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Maasranga_TV_logo.png' },
  { keywords: ['deepto'], logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Deepto_TV_logo.png' },
  { keywords: ['republic bangla'], logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Republic_Media_Network_Logo.png' },
  { keywords: ['dd national'], logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/DD_National_logo.svg' },
  { keywords: ['goldmines'], logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Goldmines_Telefilms_logo.png' },
  
  // New Additions: Bangladeshi channels
  { keywords: ['channel 24'], logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Channel_24_Bangladesh_logo.png' },
  { keywords: ['channel 9'], logo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Channel_9_Bangladesh_Logo.png' },
  { keywords: ['atn news'], logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/ATN_News_logo.png' },
  { keywords: ['atn bangla'], logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/ATN_Bangla_logo.png' },
  { keywords: ['news 24', 'news24 bd'], logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/News_24_Bangladesh_Logo.png' },
  { keywords: ['desh tv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Desh_TV_logo.png' },
  { keywords: ['bijoy tv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Bijoy_TV_logo.png' },
  
  // New Additions: Indian Entertainment / Kids
  { keywords: ['sony aath'], logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sony_Aath_logo.png' },
  { keywords: ['g-series', 'g series'], logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/G-Series_logo.png' },
  { keywords: ['etv josh', 'etv network'], logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/ETV_Network_Logo.svg' },
  { keywords: ['oli tv'], logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Colors_Bangla_logo.png' },
  
  // New Additions: Sports
  { keywords: ['asports', 'a sports'], logo: 'https://upload.wikimedia.org/wikipedia/commons/5/54/A_Sports_logo.png' },
  { keywords: ['a spor'], logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/A_Spor_logo.png' },
  { keywords: ['euro tv sports', 'eurosport'], logo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Eurosport_logo.svg' },
  { keywords: ['dd sports'], logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/DD_Sports_logo.svg' }
];

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
