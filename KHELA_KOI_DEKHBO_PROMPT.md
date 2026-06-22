# 🎯 AI Coding Agent Prompt: Build "Khela Koi Dekhbo?" — Premium IPTV Streaming Web App

---

## MISSION BRIEF

You are building a **fully functional, production-quality IPTV streaming web app** called **"Khela Koi Dekhbo?"** (Bengali: "খেলা কই দেখবো?" — meaning *"Where do I watch the game?"*) — a slick, dark, TV-grade web application that lets the user browse, search, filter, and watch 225 live HLS/M3U8 streams from a curated playlist. It features a **dedicated FIFA World Cup 2026 hero section** as the centerpiece.

The entire channel list is loaded at runtime from a file named `mahmud-picks.m3u` placed in the `public/` directory. **Parse it dynamically — do not hardcode a single channel, URL, name, or group.** Every one of the 225 channels must appear correctly categorized.

---

## TECH STACK

- **Framework**: Next.js 14+ with the **App Router** (`app/` directory)
- **Language**: JavaScript (no TypeScript required, keep it simple)
- **Styling**: Tailwind CSS v3 (configured via `tailwind.config.js`)
- **Player**: HLS.js (npm package: `hls.js`)
- **State**: React Context API (no Redux/Zustand — keep dependencies lean)
- **Persistence**: `localStorage` (favorites, recents, preferences)
- **Fonts**: Google Fonts loaded via `next/font/google` — `Rajdhani` (display) + `Inter` (body)
- **Deployment target**: Vercel (primary) or Netlify (secondary) — static export compatible

### Key Packages
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "hls.js": "^1.5.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## DEPLOYMENT CONFIGURATION

### Vercel (Recommended)
This app must deploy to Vercel with **zero configuration** — just `git push`. Ensure:

1. `next.config.js` is set up for static asset serving of the M3U file:
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from external domains (for channel logos)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    unoptimized: true, // Needed for external logo URLs that may be HTTP
  },
  // No output: 'export' — use standard Next.js SSR/edge runtime on Vercel
};

module.exports = nextConfig;
```

2. The M3U file lives at `public/mahmud-picks.m3u` — Next.js serves `public/` as static assets automatically. It will be accessible at `/mahmud-picks.m3u` in production.

3. Add a `vercel.json` at project root:
```json
{
  "headers": [
    {
      "source": "/mahmud-picks.m3u",
      "headers": [
        { "key": "Content-Type", "value": "application/x-mpegurl" },
        { "key": "Cache-Control", "value": "public, max-age=300" }
      ]
    }
  ]
}
```

### Netlify (Alternative)
Add a `netlify.toml` at project root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/mahmud-picks.m3u"
  [headers.values]
    Content-Type = "application/x-mpegurl"
    Cache-Control = "public, max-age=300"
```

Also add `@netlify/plugin-nextjs` to devDependencies.

### README instructions to include
The generated project must include a `README.md` with:
- One-click Vercel deploy button: `[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=...)`
- Step-by-step Netlify instructions
- Local dev: `npm install && npm run dev` → open `http://localhost:3000`
- How to update the channel list (replace `public/mahmud-picks.m3u`)

---

## PROJECT STRUCTURE

```
khela-koi-dekhbo/
├── public/
│   └── mahmud-picks.m3u              ← SOURCE FILE (copy here before deploy)
├── app/
│   ├── layout.js                     ← Root layout, fonts, metadata
│   ├── page.js                       ← Home page
│   ├── globals.css                   ← Tailwind directives + CSS variables
│   ├── category/
│   │   └── [slug]/
│   │       └── page.js              ← Dynamic category page: /category/sports
│   └── watch/
│       └── [id]/
│           └── page.js              ← (optional) Direct channel URL: /watch/btv
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx              ← Desktop left nav
│   │   ├── Topbar.jsx               ← Search bar + logo + mobile menu toggle
│   │   └── MobileBottomNav.jsx      ← Mobile bottom tab bar
│   ├── player/
│   │   ├── VideoPlayer.jsx          ← HLS.js wrapper (Client Component)
│   │   └── PlayerOverlay.jsx        ← Channel info overlay on hover/tap
│   ├── channels/
│   │   ├── ChannelGrid.jsx          ← Responsive grid of channel cards
│   │   ├── ChannelCard.jsx          ← Individual channel card
│   │   └── ChannelList.jsx          ← Compact list-view alternative
│   ├── sections/
│   │   ├── FifaHero.jsx             ← 🏆 The big World Cup hero section
│   │   ├── CategoryRow.jsx          ← Horizontal scroll row per category
│   │   └── FeaturedRow.jsx          ← "Featured Bangladesh Channels" row
│   └── ui/
│       ├── SearchBar.jsx
│       ├── Badge.jsx
│       ├── LiveDot.jsx              ← Pulsing green live indicator
│       └── LogoAvatar.jsx           ← Fallback initials avatar for missing logos
├── context/
│   └── AppContext.jsx               ← Global state: active channel, favorites, recent
├── utils/
│   ├── m3uParser.js                 ← M3U parsing logic
│   └── fifaData.js                  ← FIFA channel metadata (priority, badge, country)
├── hooks/
│   ├── useM3U.js                    ← Fetches + parses mahmud-picks.m3u client-side
│   ├── usePlayer.js                 ← Player state: playing, loading, error
│   └── useSearch.js                 ← Search + filter logic
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── netlify.toml
└── README.md
```

### Critical Next.js App Router notes
- `VideoPlayer.jsx` **must** have `'use client'` at the top — HLS.js uses browser APIs
- `AppContext.jsx` **must** have `'use client'` — uses React state/hooks
- `useM3U.js`, `usePlayer.js`, `useSearch.js` — all Client-side hooks, mark accordingly
- `app/layout.js` is a Server Component — import fonts there via `next/font/google`
- Pages that use context or hooks must either be Client Components or wrap client subtrees properly
- The M3U is fetched via `fetch('/mahmud-picks.m3u')` inside a `useEffect` — purely client-side

---

## THE M3U SOURCE FILE

The file `public/mahmud-picks.m3u` contains every stream. Parse it dynamically at app startup via `useM3U.js`. The parser must extract from each `#EXTINF` line:

- `tvg-name` → channel display name
- `tvg-logo` → logo URL (may be empty — handle with fallback)
- `group-title` → raw category from M3U
- Stream URL on the very next line after `#EXTINF`

Map raw `group-title` values to app category labels:

| M3U `group-title` | App Category Label | Emoji |
|---|---|---|
| `Football World Cup 2026` | FIFA World Cup 2026 | 🏆 |
| `⚽ FIFA Special` | FIFA Special | ⚽ |
| `Sports` | Sports | 🏅 |
| `Bangladesh` | Bangladesh | 🇧🇩 |
| `Indian Entertainment` | Indian Entertainment | 🎭 |
| `Movies` | Movies | 🎬 |
| `Music` | Music | 🎵 |
| `Kids` | Kids | 👶 |
| `India News` | India News | 📰 |
| `Religious` | Religious | 🕌 |
| `Business` | Business | 💼 |
| `General` | General | 📺 |
| `Lifestyle` | Lifestyle | 🌿 |
| `Documentary` | Documentary | 🎥 |
| `Comedy` | Comedy | 😂 |
| `Legislative` | Legislative | 🏛️ |

---

## FIFA WORLD CUP 2026 — VERIFIED BROADCAST INTELLIGENCE

> **Confirmed broadcasting rights (June 2026):** Bangladesh's official FIFA World Cup 2026 broadcasters are **BTV, Somoy TV, and T Sports**. Pakistan: **PTV Sports**. Argentina: **TYC Sports**. USA: **Fox Sports**. Canada: **TSN 1/2/3**. MENA + SE Asia: **beIN Sports**.

After M3U parsing, enrich every channel using `utils/fifaData.js`. The enrichment function adds `isFifaChannel: true`, a `fifaPriority` (1 = official BD broadcaster, 2 = official international, 3 = FIFA special feed), and a `fifaBadge` string to the matching channels.

### Priority 1 — Official Bangladesh Broadcasters
| Channel Name (as in M3U) | Badge |
|---|---|
| FIFA 2026 — BTV | OFFICIAL 🇧🇩 |
| FIFA 2026 — T Sports | OFFICIAL 🇧🇩 |
| FIFA 2026 — T Sports Alt | ALT FEED 🇧🇩 |
| FIFA 2026 — Somoy TV | OFFICIAL 🇧🇩 |
| Somoy FIFA World Cup 2026 | SOMOY LIVE 🇧🇩 |
| BTV | BD Free-to-Air ⚽ |
| Somoy TV | BD Official ⚽ |
| Somoy TV New | BD Official ⚽ |
| T Sports HD | BD Official ⚽ |

### Priority 2 — Official International FIFA Broadcasters
| Channel Name | Badge |
|---|---|
| FIFA 2026 — PTV Sports | 🇵🇰 Official |
| FIFA 2026 — TYC Sports | 🇦🇷 Official |
| FIFA 2026 — Fox Sports 2 | 🇺🇸 Official |
| PTV Sports | 🇵🇰 FIFA Rights |
| Tyc Sports | 🇦🇷 FIFA Rights |
| Fox Sports 2 | 🇺🇸 FIFA Rights |
| TSN 1 | 🇨🇦 Official |
| TSN 2 | 🇨🇦 Official |
| TSN 3 | 🇨🇦 Official |
| Bein Sports 1 | MENA Rights |
| Bein Sports 2 | MENA Rights |
| Bein Sports 3 | MENA Rights |
| Bein Sports 4 | MENA Rights |
| Bein Sports 4 Amagi | MENA Rights |
| beIN Sports Xtra | MENA Rights |
| Bein Sports 1 Alt | MENA Alt |

### Priority 3 — FIFA Special Feeds
| Channel Name | Badge |
|---|---|
| FUSSBALL.TV 1 | ⚽ FIFA Special |
| FUSSBALL.TV 2 | ⚽ FIFA Special |
| Coze TV FIFA World Cup 2026 | ⚽ Global Feed |
| Stream 32 | ⚽ Sports Stream |

---

## COMPLETE CHANNEL ROSTER — ALL 225 (Parser Verification Reference)

Your M3U parser must produce exactly these channels. Use this list to verify output.

### 🇧🇩 Bangladesh — 30 channels
Somoy TV New, Somoy TV, NTV, RTV, Jamuna TV, Ekattor TV HD, Channel I, Channel 24, Channel 9 HD, Channel 1 News 4K, ATN News HD, Deepto TV, News 24, DBC News, Maasranga TV, BTV, Bangla Vision, Star News BD, Ananda TV, Boishakhi TV, Bangla TV, Desh TV, SA TV, Duronto Live, Ekhon TV, Ekushe TV, Independent TV, My TV, Nexus TV, Channel S TV

### ⚽ FIFA Special — 2 channels
FUSSBALL.TV 1, FUSSBALL.TV 2

### 🏅 Sports — 24 channels
Stream 32, T Sports HD, Star Sports 1, Star Sports 1 Alt, Bein Sports 1, Bein Sports 2, Bein Sports 3, Bein Sports 4, Bein Sports 4 Amagi, beIN Sports Xtra, Bein Sports 1 Alt, ESPN, Fox Sports 2, Willow HD TV, Cricket Gold, Euro TV Sports HD, ASports, PTV Sports, Tyc Sports, TSN 1, TSN 2, TSN 3, A SPOR, Real Madrid TV

### 🏆 Football World Cup 2026 — 9 channels
FIFA 2026 — BTV, FIFA 2026 — T Sports, FIFA 2026 — T Sports Alt, FIFA 2026 — Somoy TV, FIFA 2026 — PTV Sports, FIFA 2026 — TYC Sports, FIFA 2026 — Fox Sports 2, Somoy FIFA World Cup 2026, Coze TV FIFA World Cup 2026

### 🎭 Indian Entertainment — 20 channels
Star Jalsha, Zee Bangla, Colors Bangla, G Series Drama, SRK TV, Republic Bangla, DD National HD, EET TV, ETV Josh, Gangaur TV, GTC Punjabi, Mazhavil Manorama HD, MNTV, Oli TV, PTC Punjabi, PTC Punjabi Gold, Roja TV, Subin TV, Suriya TV, Telugu One

### 🎬 Movies — 12 channels
Goldmines, Goldmines Movies, Goldmines Bollywood, Hindi Classic 24, Action Hollywood, Sony Max, Sony Max HD, Sony Max 2, Raj Digital Plus, Roja Movies, Thalaa TV, Tolly TV

### 🎵 Music — 21 channels
9X Tashan, 9X Jalwa, 9X Jalwa HD, 9X Jhakaas, 9XM, Sangeet Bangla, Party Universe, Party Universe Alt, Aaryaa TV, ETV Music, Punjabi Hits, Qello Concerts, Raj Musix Tamil, Sana Plus, Stingray Classic Rock, Stingray DJAZZ, Stingray Easy Listening, Stingray Naturescape, Stingray The Spa, Stingray KPOP, Ultimate TV

### 👶 Kids — 8 channels
Motu Patlu, Tom & Jerry TV, Doraemon TV, Bantul The Great, Oggy and the Cockroaches, Gopal Bhar TV, Mr Bean Animated, Cartoon Network

### 📰 India News — 57 channels
Aaj Tak HD, ABP News, ABP Ananda, ABP Asmita, ABP Ganga, AKD Calcutta News, AmarUjala, Asianet Suvarna News, Bharat24, Chardikla Gurbaani TV, Chardikla Time TV, Chardikla Time TV NA, CTVN AKD Plus, DD News HD, ETV News, Global Punjab, Guarantee News, Hamdard TV, India Daily Live, Kannur Vision, Living India News, NDTV MP Chhattisgarh, NDTV Marathi, NDTV Rajasthan, News9Live, News18 Assam NE, News18 Bangla, News18 Bihar Jharkhand, News18 Delhi NCR JK, News18 Gujarati, News18 India, News18 Kannada, News18 Kerala, News18 MP Chhattisgarh, News18 Marathi, News18 Odia, News18 Punjab Haryana HP, News18 Rajasthan, News18 Tamil Nadu, News18 Urdu, News18 UP Uttarakhand, News Nation, NTV Telugu, Prime9 News, Prudent Media, Republic Bangla HD, Republic Bharat, Republic Kannada, Republic TV, Rozana Spokesman, RT India, Samay Kolkata, Sudarshan News, Swatantra TV, Times Now Navbharat, TNP News, Zee News

### 🕌 Religious — 19 channels
Peace TV Bangla, Anand TV, Channel Divya, Fateh TV, Hebron TV, Joy TV, Mahaa Bhakti, Mercy TV, PMC Telugu, Salvation TV, Sanskar Web TV, Sanskar TV, Satsang TV, Satsang Web TV, Shalom TV, SVBC 2, SVBC 4, SVBC Sri Venkateswara, Total Bhakti

### 💼 Business — 5 channels
CNBC TV18, CNBC TV18 Prime HD, CNBC Awaaz, CNBC Bajar, NDTV Profit

### 📺 General — 9 channels
DD India, DD Tamil, Metro TV, NKR TV Kannada, TV BRICS English, Pravasi Channel, Shekinah TV, Shubh TV, Tamilan TV

### 🌿 Lifestyle — 1 channel
INFAST Lifestyle

### 🎥 Documentary — 4 channels
History TV18 HD, INWILD, InWonder, Adventure Earth

### 😂 Comedy — 1 channel
ETV Comedy

### 🏛️ Legislative — 3 channels
Sansad TV 1, Sansad TV 1 HD, Sansad TV 2

---

## FEATURE SPECIFICATIONS

### PAGE LAYOUT — HOME (`app/page.js`)

Three zones rendered top-to-bottom:

**Zone A — FIFA World Cup Hero (top, full width)**
A cinematic, immersive section. Must include:
- Background: deep-green-to-dark-navy animated gradient with a slow "stadium glow" radial pulse (CSS keyframes, 4s ease-in-out infinite alternating)
- Headline: `🏆 খেলা কই দেখবো?` in large Rajdhani font, with subtitle "FIFA World Cup 2026 • Live Now"
- A pulsing red dot `●` labeled "LIVE" next to the headline
- A horizontally scrollable channel strip showing all 29 FIFA-tagged channels, sorted by `fifaPriority` ascending then alphabetically within each priority tier
- Each FIFA card shows: logo/avatar, channel name, country badge (🇧🇩 🇵🇰 🇦🇷 🇺🇸 🇨🇦 MENA), priority badge text, and a glowing green LIVE dot
- Info bar below the strip: `📡 29 FIFA Channels • 3 Official BD Broadcasters • 16 International • Live Now`
- Clicking any FIFA card immediately sets it as the active channel in the player

**Zone B — Sidebar (desktop) / Bottom Tab Bar (mobile)**
- Desktop: fixed left sidebar, 220px wide
- Mobile: fixed bottom tabs (Home, Search, Favorites, Categories)
- Sidebar items: 🏠 Home, 🔍 Search, ⭐ Favorites, then all 16 categories with icon + name + channel count badge
- Active item gets a left accent border (2px, gold on FIFA-related, blue elsewhere)
- Sidebar is collapsible to icon-only mode (72px) via a toggle button

**Zone C — Main Content**
Home page renders in this order below the hero:
1. ⭐ Your Favorites row (if any saved — skip row if empty)
2. 🕐 Recently Watched row (last 10 channels — skip if empty)
3. Category rows for all 16 categories, each as a horizontal scroll strip showing up to 8 channels with a "See All →" link
4. Category order: FIFA World Cup 2026 → FIFA Special → Sports → Bangladesh → Indian Entertainment → Movies → India News → Music → Kids → Religious → Business → General → Lifestyle → Documentary → Comedy → Legislative

---

## M3U PARSER (`utils/m3uParser.js`)

Write as a pure utility function, importable anywhere:

```javascript
// utils/m3uParser.js

export function parseM3U(rawText) {
  const lines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const channels = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('#EXTINF')) continue;
    
    const name    = (line.match(/tvg-name="([^"]*)"/)    || [])[1] || 'Unknown Channel';
    const logo    = (line.match(/tvg-logo="([^"]*)"/)    || [])[1] || '';
    const group   = (line.match(/group-title="([^"]*)"/) || [])[1] || 'General';
    
    // Find the next non-empty, non-comment line as the stream URL
    let url = '';
    for (let j = i + 1; j < lines.length; j++) {
      const next = lines[j].trim();
      if (next && !next.startsWith('#')) { url = next; break; }
    }
    
    if (!url) continue;
    
    const id = `ch_${Buffer ? Buffer.from(name + url).toString('base64').slice(0,10) : btoa(encodeURIComponent(name)).slice(0,10)}_${channels.length}`;
    
    channels.push({
      id,
      name: name.trim(),
      logo: logo.trim() || null,
      group: group.trim(),
      category: mapGroupToCategory(group.trim()),
      url,
      isFifaChannel: false,
      fifaPriority: null,
      fifaBadge: null,
    });
  }
  
  return enrichWithFifaData(channels);
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
```

Import `enrichWithFifaData` from `utils/fifaData.js` — that function checks `channel.name` against the FIFA channel roster and sets the three FIFA fields.

---

## VIDEO PLAYER (`components/player/VideoPlayer.jsx`)

This is a Client Component (`'use client'`). It accepts a `channel` prop and handles HLS playback:

```javascript
'use client';
import { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ channel }) {
  const videoRef = useRef(null);
  const hlsRef   = useRef(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'playing' | 'error'

  useEffect(() => {
    if (!channel?.url || !videoRef.current) return;
    
    // Destroy previous HLS instance
    if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }
    
    setStatus('loading');
    
    const tryPlay = async () => {
      const Hls = (await import('hls.js')).default;
      
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hlsRef.current = hls;
        hls.loadSource(channel.url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play().catch(() => {});
          setStatus('playing');
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) setStatus('error');
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = channel.url;
        videoRef.current.play().catch(() => setStatus('error'));
        setStatus('playing');
      } else {
        setStatus('error');
      }
    };
    
    tryPlay();
    
    // Timeout fallback after 20s of no signal
    const timeout = setTimeout(() => {
      if (status === 'loading') setStatus('error');
    }, 20000);
    
    return () => {
      clearTimeout(timeout);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [channel?.url]);

  // Render: loading spinner, error state, or <video> element
  // Always render <video> but layer status UI on top
}
```

**Player UI requirements:**
- 16:9 aspect ratio container, black background
- Loading: centered spinner + "Connecting to [channel.name]..."
- Error: `📡 Stream Unavailable • [Try Again] [Next Channel →]`
- Playing: bottom-left overlay (fades in on hover/tap) with logo + channel name + category badge
- Bottom-right: fullscreen button
- Mobile: tap video to toggle overlay visibility

**Placement:**
- Desktop ≥1200px: fixed right panel, 45% width, vertically centered
- Tablet: top of content area, full width, 16:9
- Mobile: sticky top, full viewport width, 16:9

---

## CHANNEL CARD (`components/channels/ChannelCard.jsx`)

Client Component. Renders a single channel in grid or list mode.

**Grid card (default) — ~160×185px:**
- Logo: `<img>` with `onError` fallback to `<LogoAvatar>` (initials, hashed color)
- Channel name: Rajdhani font, max 2 lines, `line-clamp-2`
- Category pill: small rounded badge, color-coded per category
- FIFA badge: gold ⚽ icon top-right corner if `channel.isFifaChannel`
- "NOW PLAYING" indicator: pulsing green dot bottom-left if this channel is active
- Hover state: `scale(1.04)`, drop shadow, ▶ play overlay appears
- Favorite star: ☆/⭐ top-left corner, toggleable, persists to localStorage

**List row (compact mode):**
- 48×48 logo left, channel name + category center, FIFA badge + live dot right
- Full width, 64px height

**Logo fallback (`components/ui/LogoAvatar.jsx`):**
- Takes `name` prop, computes a background color from `name.charCodeAt(0) % 12` mapped to 12 distinct hues
- Displays first 2 characters of name in white, bold

---

## GLOBAL STATE (`context/AppContext.jsx`)

```javascript
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [channels, setChannels]         = useState([]);       // all 225 parsed channels
  const [activeChannel, setActiveChannel] = useState(null);   // currently playing
  const [favorites, setFavorites]       = useState([]);       // array of channel IDs
  const [recentlyWatched, setRecentlyWatched] = useState([]); // array of channel IDs (max 10)
  const [isLoading, setIsLoading]       = useState(true);
  const [viewMode, setViewMode]         = useState('grid');   // 'grid' | 'list'

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavs    = JSON.parse(localStorage.getItem('kkd_favorites')    || '[]');
    const savedRecents = JSON.parse(localStorage.getItem('kkd_recent')       || '[]');
    const savedView    = localStorage.getItem('kkd_viewmode') || 'grid';
    setFavorites(savedFavs);
    setRecentlyWatched(savedRecents);
    setViewMode(savedView);
  }, []);

  const watchChannel = (channel) => {
    setActiveChannel(channel);
    // Add to recently watched (deduplicated, max 10)
    setRecentlyWatched(prev => {
      const updated = [channel.id, ...prev.filter(id => id !== channel.id)].slice(0, 10);
      localStorage.setItem('kkd_recent', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = (channelId) => {
    setFavorites(prev => {
      const updated = prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId];
      localStorage.setItem('kkd_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{
      channels, setChannels, activeChannel, watchChannel,
      favorites, toggleFavorite, recentlyWatched,
      isLoading, setIsLoading, viewMode, setViewMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
```

Wrap the root layout: `app/layout.js` → `<AppProvider>{children}</AppProvider>`.

---

## SEARCH & FILTER (`hooks/useSearch.js`)

```javascript
'use client';
import { useState, useMemo } from 'react';

export function useSearch(channels) {
  const [query, setQuery]       = useState('');
  const [fifaOnly, setFifaOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // null = all

  const results = useMemo(() => {
    let filtered = channels;
    if (fifaOnly) filtered = filtered.filter(c => c.isFifaChannel);
    if (activeCategory) filtered = filtered.filter(c => c.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [channels, query, fifaOnly, activeCategory]);

  const grouped = useMemo(() => {
    return results.reduce((acc, ch) => {
      (acc[ch.category] = acc[ch.category] || []).push(ch);
      return acc;
    }, {});
  }, [results]);

  return { query, setQuery, fifaOnly, setFifaOnly, activeCategory, setActiveCategory, results, grouped };
}
```

Search UX:
- Debounced 200ms (use `setTimeout` in `setQuery`)
- Shows `Found 12 channels for "somoy"` below search bar
- `Escape` key clears query
- A ⚽ toggle button next to the search bar activates FIFA-only mode (turns gold when active)

---

## UI DESIGN SYSTEM

### CSS Variables (add to `app/globals.css`)
```css
:root {
  --bg-primary:     #090d18;
  --bg-secondary:   #101826;
  --bg-elevated:    #1a2538;
  --bg-card:        #141e2e;
  --accent-gold:    #f5c842;
  --accent-green:   #22c55e;
  --accent-red:     #ef4444;
  --accent-blue:    #3b82f6;
  --text-primary:   #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted:     #4b5563;
  --border-subtle:  #1e2d45;
  --fifa-green:     #0a4a1f;
  --fifa-navy:      #0d1b3e;
  --fifa-purple:    #1a0a2e;
}

/* FIFA stadium glow animation */
@keyframes stadium-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.08); }
}

/* Live dot pulse */
@keyframes live-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}

/* Skeleton shimmer */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--bg-elevated) 25%, var(--bg-card) 50%, var(--bg-elevated) 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 8px;
}
```

### Tailwind Config (`tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#090d18',
        'bg-secondary': '#101826',
        'bg-elevated':  '#1a2538',
        'bg-card':      '#141e2e',
        'gold':         '#f5c842',
        'live-green':   '#22c55e',
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      animation: {
        'live-pulse': 'live-pulse 1.5s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [],
};
```

### FIFA Hero Section Visual Spec
- Background: CSS `background: linear-gradient(135deg, #0a4a1f 0%, #0d1b3e 50%, #1a0a2e 100%)`
- Centered radial glow overlay: `radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.12) 0%, transparent 65%)` with `stadium-glow` animation
- Top + bottom gold divider lines: `border-top: 1px solid rgba(245,200,66,0.3)`
- FIFA World Cup 2026 emblem (from M3U logo attribute on FUSSBALL.TV entries) rendered as background watermark: `opacity: 0.06`, `filter: blur(4px)`, `position: absolute`, centered
- Channel cards in this strip: dark card with gold border on hover (`border-color: var(--accent-gold)`)

### Category Color System (for pills and sidebar accents)
```javascript
const CATEGORY_COLORS = {
  'FIFA World Cup 2026': '#f5c842',   // gold
  'FIFA Special':        '#f59e0b',   // amber
  'Sports':              '#3b82f6',   // blue
  'Bangladesh':          '#16a34a',   // green
  'Indian Entertainment':'#8b5cf6',  // purple
  'Movies':              '#ec4899',   // pink
  'Music':               '#06b6d4',   // cyan
  'Kids':                '#f97316',   // orange
  'India News':          '#64748b',   // slate
  'Religious':           '#a78bfa',   // violet
  'Business':            '#0ea5e9',   // sky
  'General':             '#6b7280',   // gray
  'Lifestyle':           '#84cc16',   // lime
  'Documentary':         '#78716c',   // stone
  'Comedy':              '#facc15',   // yellow
  'Legislative':         '#94a3b8',   // cool gray
};
```

---

## ADDITIONAL FEATURES

### Keyboard Shortcuts (global `useEffect` on document)
| Key | Action |
|-----|--------|
| `K` | Play / Pause |
| `F` | Toggle fullscreen |
| `M` | Toggle mute |
| `↑` / `↓` | Previous / next channel in current category |
| `/` | Focus search bar |
| `Escape` | Clear search or exit fullscreen |

### Copy Stream URL
Every channel card (in list mode) and the channel info panel has a 📋 button that calls `navigator.clipboard.writeText(channel.url)` and briefly shows "✅ Copied!" toast.

### Toast Notifications
A simple bottom-center toast system (no library — just `useState` + `setTimeout`):
- "✅ Added to Favorites"
- "❌ Removed from Favorites"
- "📋 Stream URL copied"
- "📡 Stream error — try another channel"

### Skeleton Loading State
While the M3U is being fetched and parsed (usually 1–2s), show:
- Hero section: gradient placeholder + 6 skeleton channel cards in a row
- Category rows: 8 skeleton cards each
- No "Loading..." text — just the animated shimmer skeletons

### Error Boundaries
Wrap the player in an error boundary so a bad stream never crashes the whole app.

### `<head>` Metadata (`app/layout.js`)
```javascript
export const metadata = {
  title: 'Khela Koi Dekhbo? | খেলা কই দেখবো? — Live FIFA World Cup 2026 & 225 Channels',
  description: 'Watch FIFA World Cup 2026 live on BTV, Somoy TV, T Sports and more. 225 live channels — Sports, Bangladesh, Movies, Music, Kids, News and more.',
  keywords: 'FIFA World Cup 2026, BTV live, Somoy TV, T Sports, live streaming, Bangladesh TV, khela',
  openGraph: {
    title: 'খেলা কই দেখবো? — Live Streaming',
    description: 'FIFA World Cup 2026 live + 225 channels',
    type: 'website',
  },
};
```

---

## IMPLEMENTATION SEQUENCE

Build in this exact order to avoid dependency issues:

1. **Scaffold** — `npx create-next-app@latest khela-koi-dekhbo --js --tailwind --app --no-src-dir --no-turbopack`
2. **Copy** `mahmud-picks.m3u` → `public/mahmud-picks.m3u`
3. **Configure** `next.config.js`, `vercel.json`, `netlify.toml`, `tailwind.config.js`
4. **Build** `utils/m3uParser.js` + `utils/fifaData.js` — test the parser in isolation with `console.log`
5. **Build** `context/AppContext.jsx` and `hooks/useM3U.js` (fetches + parses the file on mount)
6. **Wrap** `app/layout.js` with `<AppProvider>`, configure fonts and metadata
7. **Build** `components/player/VideoPlayer.jsx` — test with a hardcoded URL first
8. **Build** `components/channels/ChannelCard.jsx` + `LogoAvatar.jsx`
9. **Build** `components/sections/FifaHero.jsx`
10. **Build** `components/layout/Sidebar.jsx` + `MobileBottomNav.jsx` + `Topbar.jsx`
11. **Build** `app/page.js` — assemble all sections
12. **Build** `hooks/useSearch.js` + `components/ui/SearchBar.jsx`
13. **Build** `app/category/[slug]/page.js` — category drill-down
14. **Test** `npm run build` — fix any SSR/client boundary errors
15. **Deploy** to Vercel via `vercel` CLI or GitHub push

---

## DELIVERABLES CHECKLIST

Verify all of the following before considering the build complete:

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` succeeds without errors (critical for Vercel)
- [ ] M3U parsed: all 225 channels load, zero missing
- [ ] All 16 categories render with correct channel counts
- [ ] FIFA hero shows all 29 FIFA channels sorted by priority (P1 first)
- [ ] BD official channels (BTV, Somoy, T Sports) display OFFICIAL 🇧🇩 badge prominently
- [ ] Player loads an HLS stream and plays video
- [ ] Switching channels works without page reload
- [ ] Search filters across all 225 channels in real-time
- [ ] FIFA-only toggle shows only the 29 FIFA channels
- [ ] Favorites persist after browser refresh (localStorage)
- [ ] Recently Watched updates on each channel switch
- [ ] Mobile layout: no horizontal overflow, player at top works, bottom nav works
- [ ] Skeleton loading shows during M3U fetch
- [ ] Stream error state displays correctly
- [ ] `vercel.json` present and correct
- [ ] `netlify.toml` present and correct
- [ ] `README.md` includes deploy instructions
- [ ] No hardcoded channel data anywhere — everything from `mahmud-picks.m3u`

---

## STARTER COMMANDS (include in README)

```bash
# Clone and run locally
git clone <your-repo-url>
cd khela-koi-dekhbo
npm install
cp /path/to/mahmud-picks.m3u public/mahmud-picks.m3u
npm run dev
# → open http://localhost:3000

# Deploy to Vercel
npm i -g vercel
vercel --prod
# (or push to GitHub and connect repo in vercel.com dashboard)

# Deploy to Netlify
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=.next
```

---

*Prompt for "Khela Koi Dekhbo?" (খেলা কই দেখবো?) — Next.js IPTV streaming web app. Source: `public/mahmud-picks.m3u` (225 channels). FIFA broadcast rights verified June 2026. Deploy target: Vercel / Netlify.*
