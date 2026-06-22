# Khela Koi Dekhbo? (খেলা কই দেখবো?) 🏆

A premium, TV-grade IPTV live streaming web application called **"Khela Koi Dekhbo?"** (Bengali: "খেলা কই দেখবো?" — meaning *"Where do I watch the game?"*). Built using Next.js 16 (App Router), Tailwind CSS v4, and HLS.js, it supports parallel parsing of multiple M3U playlists and provides a dedicated FIFA World Cup 2026 live streaming interface.

## Features

- **🏆 Dedicated FIFA World Cup 2026 Hero Section:** Sourced specifically from `public/IPTV-Flow-World-Cup.m3u` and enriched with priority tiers, country codes, and badges.
- **📺 250+ Curated Live Channels:** Sourced from `public/mahmud-picks.m3u` across 14+ categories including Bangladesh, Sports, Entertainment, Movies, Music, Kids, and News.
- **⚡ High Performance HLS.js Player:** Connects directly to `.m3u8` feeds with adaptive bitrate, error recoveries, controls bar, and keyboard shortcuts.
- **🎹 Global Keyboard Shortcuts:**
  - `K` or `Space` — Play / Pause
  - `F` — Toggle Fullscreen
  - `M` — Toggle Mute
  - `ArrowUp` / `ArrowDown` — Switch channels in current section
  - `/` — Focus search input
  - `Escape` — Clear search / exit fullscreen
- **🎨 TV-Grade Dark Aesthetics:** Designed with flat, high-contrast dark backgrounds, glowing outlines, custom squircles, and zero stickers or emojis (uses crisp vector SVGs).
- **⭐ Favorites & Recents:** Save channels and keep track of recently watched feeds across refreshes (persisted in `localStorage`).

---

## Getting Started

### Local Setup

1. **Clone the repository and enter the directory:**
   ```bash
   git clone <your-repo-url>
   cd khela-koi-dekhbo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify playlist asset positions:**
   Make sure the source playlists exist inside the static asset folder:
   - `public/IPTV-Flow-World-Cup.m3u` (FIFA World Cup channels)
   - `public/mahmud-picks.m3u` (General and category channels)

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Updating Channel Playlists

To update the streams, simply replace the M3U files in the `public/` directory:
- For FIFA World Cup streams: overwrite `public/IPTV-Flow-World-Cup.m3u`.
- For other channels: overwrite `public/mahmud-picks.m3u`.

The application parses these files dynamically at startup on the client-side. No hardcoding or server rebuilds required!

---

## Deployment Configuration

### Deploy with Vercel (Recommended)

Deploy to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/khela-koi-dekhbo)

The project includes `vercel.json` which maps headers and cache directives for `/mahmud-picks.m3u` and `/IPTV-Flow-World-Cup.m3u` to optimize distribution.

### Deploy with Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build and export:
   ```bash
   npm run build
   ```
3. Deploy to production:
   ```bash
   netlify deploy --prod --dir=.next
   ```
   *Netlify configuration and headers are handled automatically via `netlify.toml`.*
