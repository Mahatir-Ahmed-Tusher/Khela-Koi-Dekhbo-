# 🎯 FULL REDESIGN BRIEF — "Khela Koi Dekhbo?" (খেলা কই দেখবো?)
## AI Agent Prompt: Complete UI/UX Overhaul — Sports Streaming App

---

## ⚡ BEFORE ANYTHING ELSE — MANDATORY AUDIT STEP

**Do not write a single line of code before completing these steps:**

1. Run `find . -type f -name "*.jpg" -o -name "*.png" -o -name "*.webp" -o -name "*.jpeg" | grep -v node_modules` from the project root — list every image asset in `public/`.
2. Run `find . -type f -name "*.js" -o -name "*.jsx" -o -name "*.tsx" | grep -v node_modules` — list all component files.
3. Identify the existing logo image file inside `public/` — use that exact file path every time a logo appears anywhere on the site.
4. Identify all background/sports image files inside `public/` — you will use them as described below.
5. Identify the M3U channel list or channel data file and find which of the following priority channels **exist in the system**: `TSN4 (CANADA)`, `TSN1 (CANADA)`, `TSN3 (CANADA)`, `FUSSBALL (GERMANY)`, `FUSSBALL 4K`, any channel containing `CAZE`, `SP (IOS)`, `FAST`, `Bein English`, `JOJ SPORT`, `TVP SPORT`, `CCTV 5`, `RTB GO (IOS)`, `SP-2`, `SP-3`, `D Sports`, `SPORTV`, `TRT SPORTS`. **Only use channels that exist — skip any that don't.**
6. Understand the current routing system (`/`, `/watch`, `/channel/[id]`, etc.) before modifying.

---

## 🎨 DESIGN SYSTEM — ESTABLISH THESE TOKENS FIRST

Create or overwrite `/app/globals.css` with these CSS custom properties as your single source of truth:

```css
:root {
  /* Core Backgrounds */
  --bg-void: #080810;
  --bg-primary: #0D0D18;
  --bg-surface: #13131F;
  --bg-elevated: #1A1A2E;
  --bg-hover: #22223A;

  /* Accent — Sports Gold */
  --accent-gold: #F5B800;
  --accent-gold-dim: #B38900;
  --accent-gold-glow: rgba(245, 184, 0, 0.15);

  /* Accent — Live Red */
  --accent-live: #FF2D2D;
  --accent-live-glow: rgba(255, 45, 45, 0.2);

  /* Accent — Electric Blue */
  --accent-blue: #1A6FFF;
  --accent-blue-dim: #1050CC;

  /* Text */
  --text-primary: #F0F0F8;
  --text-secondary: #8A8AA8;
  --text-muted: #4A4A68;
  --text-gold: #F5B800;

  /* Borders */
  --border-subtle: rgba(255,255,255,0.06);
  --border-active: rgba(245,184,0,0.5);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-gold: 0 0 20px rgba(245,184,0,0.25);
  --shadow-card: 0 4px 24px rgba(0,0,0,0.5);
}
```

**Typography:** Import `Inter` (body/UI) and `Barlow Condensed` (headings/labels) from Google Fonts via `layout.js` or `_document.js`.

- Display/Hero: `Barlow Condensed`, 700–900 weight, uppercase, tight letter-spacing
- Body/Labels: `Inter`, 400–600 weight
- Score/Stats: `Barlow Condensed`, tabular numerals

---

## 📱 MOBILE UI — "NATIVE SPORTS APP" EXPERIENCE

> Target: Feel like DAZN, JioCinema, or ESPN mobile app. NOT a website viewed on phone.

### Mobile Layout Architecture

```
┌─────────────────────────┐  ← Fixed Header (44px)
│  [LOGO]    [SEARCH][MORE]│     SEARCH = Search icon, MORE = MoreVertical icon
├─────────────────────────┤
│                         │  ← Sticky Video Player (16:9)
│     VIDEO PLAYER        │     AUTO-PLAYS on load — never blank
│     aspect-ratio: 16/9  │     (see Auto-Load Logic below)
│                         │
├─────────────────────────┤
│ FIFA 2026  [TSN4][TSN1] │  ← Server Selector (horizontal scroll)
│ [SP IOS][FAST][BEIN]... │     pill buttons, gold accent on active
├─────────────────────────┤
│ [LIVE*][SPORTS][BD]...  │  ← Category Tab Bar (horizontal scroll)
│                         │     * LIVE tab has animated red dot (CSS)
├─────────────────────────┤
│  SCROLLABLE CONTENT     │  ← Channel Grid (2 columns, compact)
│  [card][card]           │
│  [card][card]           │
│  ...                    │
└─────────────────────────┘
│ [Home][Search][Star][User]│ ← Bottom Nav Bar (fixed, 56px) — Lucide icons
└───────────────────────────┘
```

### Mobile — Implementation Details

#### A. Fixed Header (Mobile Only)
- Height: **44px**, background: `var(--bg-surface)`, bottom border: `1px solid var(--border-subtle)`
- Left: **Logo image** — use the actual logo file from `public/`, height 28px, keep aspect ratio
- Right: `<Search size={18} />` icon button + `<MoreVertical size={18} />` icon button — both from `lucide-react`, color `var(--text-secondary)`
- NO text titles. NO hamburger nav. Logo only. **No emoji anywhere.**

#### B. Video Player — Auto-Load Logic (CRITICAL — READ CAREFULLY)

**The player must NEVER be blank or idle when the page loads. There is no "waiting for user to pick" state.**

On mount, run this priority chain immediately in order:

```
1. Check localStorage for "kk_lastWatched" key
   → If found AND the channel still exists in channel data → load it immediately
   
2. If no lastWatched → scan the World Cup priority list (TSN4, TSN1, SP IOS, FAST, etc.)
   → Load the first one that exists in the channel data
   
3. If no World Cup channels exist in data → load the first channel
   where isLive === true (or equivalent live flag in data)
   
4. If nothing is live → load the very first channel in the channel list
   
5. There is no step 5. Something always loads.
```

Implement this as a `useEffect` on the page root or in a `useDefaultChannel()` custom hook that returns the resolved channel object. Pass it as the initial value of `activeChannel` state.

**Player component specs:**
- Full-width, `aspect-ratio: 16/9`, background `#000`
- Always renders an active `<iframe>` or `<video>` pointing to the resolved stream URL
- `border-radius: 0` on mobile (full bleed, no rounded corners)
- On stream error (onerror / iframe load fail): show an in-player error state — see Error States section below
- Sticky behavior: `position: sticky; top: 44px; z-index: 40` so it locks below the header during scroll

#### C. World Cup Server Selector
- Renders **only** the priority World Cup channels that exist in your system (from the audit list)
- Layout: horizontal `overflow-x: auto`, `scrollbar-width: none` (hidden scrollbar), `gap: 6px`, `padding: 10px 12px`
- Section label: `"FIFA 2026"` — `Barlow Condensed 10px/700 var(--accent-gold)` uppercase, letter-spacing 1.5px — sits flush left before the scroll row. **No emoji, no icon prefix.**
- Each server button:
  ```
  border-radius: var(--radius-full)
  background: var(--bg-elevated)
  border: 1px solid var(--border-subtle)
  color: var(--text-secondary)
  font: Inter 11px/600
  padding: 6px 14px
  white-space: nowrap
  ```
- **Active state**: `background: var(--accent-gold)`, `color: #000`, `font-weight: 700`, subtle gold glow shadow
- The channel that was auto-loaded at page start must be **pre-highlighted** as active from the beginning
- On tap: instantly swap the player stream, no page navigation

#### D. Category Tab Bar
- Tabs: `LIVE`, `SPORTS`, `বাংলাদেশ`, `MOVIES`, `NEWS`, `ALL`
- The `LIVE` tab gets a CSS animated red dot — a `<span>` with `width: 6px; height: 6px; border-radius: 50%; background: var(--accent-live); display: inline-block; margin-right: 4px` with a `@keyframes pulse-dot` animation (`opacity: 1 → 0.3 → 1`, 1.4s infinite). **No emoji.**
- Same horizontal scroll, `scrollbar-width: none`
- Active tab: bottom border `2px solid var(--accent-gold)`, text `var(--accent-gold)`
- Inactive: `var(--text-muted)`
- Font: `Inter 12px/600`, `padding: 10px 16px`
- Sticky: `position: sticky; top: calc(44px + (100vw * 9/16) + server-bar-height); z-index: 30`

#### E. Channel Grid (Mobile)
- 2-column CSS grid: `grid-template-columns: 1fr 1fr`, `gap: 8px`, `padding: 8px 10px`
- **Channel Card (Mobile)**:
  ```
  background: var(--bg-surface)
  border-radius: var(--radius-md)
  overflow: hidden
  aspect-ratio: auto
  padding: 10px
  display: flex
  flex-direction: column
  gap: 6px
  ```
  - Top row: Channel logo/avatar (40px squircle, `border-radius: 10px`, `background: var(--bg-elevated)`) + LIVE badge if live — a `<span>` containing a 5px red CSS dot + text `"LIVE"` in `var(--accent-live)` 9px `font-weight: 700`. **No emoji, no unicode bullet — pure CSS dot via `border-radius: 50%` span.**
  - Middle: Channel name `Inter 12px/600 var(--text-primary)` — max 1 line, ellipsis
  - Bottom: Category tag `Barlow Condensed 10px var(--text-muted)` — e.g. "SPORTS", "BD TV"
  - On tap: scroll to top, load stream in player, highlight active server button
  - Active/selected card: `border: 1px solid var(--border-active)`, gold glow

#### F. Mobile Background Treatment
- Page background: `var(--bg-void)`
- Below the player, **above the category tabs**, add a `<div>` with `height: 120px, position: absolute, pointer-events: none` that shows the FIFA/sports background image from `public/` at `opacity: 0.08`, `background-size: cover`, `background-position: center top`, blended with `mask-image: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)` — creates a very subtle atmospheric bleed without distracting from content
- Do NOT make background images compete with content

#### G. Bottom Navigation Bar (Mobile Only)
- Fixed bottom, `height: 56px`, `background: var(--bg-surface)`, top border `1px solid var(--border-subtle)`, `padding-bottom: env(safe-area-inset-bottom)` for iPhone home bar
- 4 items: `Home` (`<Home size={20} />`), `Search` (`<Search size={20} />`), `Favorites` (`<Star size={20} />`), `Settings` (`<Settings size={20} />`)
- All icons from `lucide-react`. **No emoji. No PNG icons. Vector only.**
- Active tab: icon color `var(--accent-gold)` + 3px gold dot below the icon (`border-radius: 50%`, `width: 3px; height: 3px; background: var(--accent-gold); margin: 0 auto`)
- Inactive: icon color `var(--text-muted)`
- Each nav item: `display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 9px; letter-spacing: 0.5px; text-transform: uppercase; font-family: Inter`

---

## 🖥️ DESKTOP UI — "SPORTS PORTAL" EXPERIENCE

> Target: Feel like beIN Sports Connect or ESPN+ web — dramatic, cinematic, content-first.

### Desktop Layout Architecture

```
┌──────────────────────────────────────────────────────┐
│  [LOGO]  Home  Sports  Bangladesh  Movies  [🔍][⚙]   │  ← Top Nav (64px)
├───────────────────────────────────────┬──────────────┤
│                                       │              │
│   CINEMATIC HERO BANNER               │  STICKY      │
│   (FIFA/Sports BG image + overlay)    │  VIDEO       │
│   "WORLD CUP 2026 IS LIVE"            │  PLAYER      │
│   [TSN4][TSN1][SP IOS][FAST]...       │  (right rail)│
│   (Server selector row)               │              │
│                                       ├──────────────┤
├───────────────────────────────────────│  NOW LIVE    │
│   ── LIVE SPORTS ──────────────────   │  schedule    │
│   [card][card][card][card][card] ▸    │  list        │
├───────────────────────────────────────┤              │
│   ── বাংলাদেশ টিভি ────────────────   │  [card]      │
│   [card][card][card][card] ▸          │  [card]      │
├───────────────────────────────────────┤  [card]      │
│   ── ENTERTAINMENT ────────────────   │              │
│   [card][card][card][card] ▸          │              │
└───────────────────────────────────────┴──────────────┘
      LEFT PANEL — 65%                 RIGHT PANEL — 35%
```

### Desktop — Implementation Details

#### A. Top Navigation Bar
- Height: **64px**, `background: rgba(8,8,16,0.92)`, `backdrop-filter: blur(12px)`, sticky top, `z-index: 50`
- Left: **Logo** from `public/` — height 36px, aspect-ratio preserved — click goes to `/`
- Center: Nav links — `Home`, `Sports`, `Bangladesh`, `Movies`, `News` — `Inter 14px/500`, `var(--text-secondary)` default, `var(--text-primary)` on hover, gold underline on active
- Right: `<Search size={18} />` icon button + `<Settings size={18} />` icon button — both from `lucide-react`, color `var(--text-secondary)`. **No emoji. Vector only.**

#### B. Cinematic Hero Banner (Desktop Only)
- Full-width section, height `clamp(380px, 45vh, 520px)`
- Background: use **all available sports/FIFA images** from `public/` — implement as an **auto-rotating background** (CSS animation or `setInterval`, 6-second intervals) with `background-size: cover`, `background-position: center`
- Dark overlay: `linear-gradient(135deg, rgba(8,8,16,0.92) 0%, rgba(8,8,16,0.6) 60%, rgba(8,8,16,0.3) 100%)` — left side darker for text legibility, right side lighter to see the image
- Left side content area (max-width 55% of banner):
  - Eyebrow: `"FIFA WORLD CUP 2026"` — `Barlow Condensed 13px/700`, `var(--accent-live)`, uppercase, letter-spacing 2px. **No emoji prefix.**
  - Headline: `"দেখো এখনই"` or `"WATCH NOW"` — `Barlow Condensed 52px/900`, `var(--text-primary)`, uppercase, tight line-height (0.9)
  - Subline: `"Live Streams — Free"` — `Inter 15px/400`, `var(--text-secondary)` — **one line, no fluff**
  - Below: **Server Selector Row** (see below)

#### C. World Cup Server Selector (Desktop Hero)
- Same priority channel list as mobile (only channels that exist in system)
- Layout: horizontal flex, `flex-wrap: wrap`, `gap: 8px`, `margin-top: 20px`
- Each button:
  ```
  background: rgba(255,255,255,0.07)
  border: 1px solid rgba(255,255,255,0.12)
  border-radius: var(--radius-full)
  color: var(--text-primary)
  font: Barlow Condensed 13px/700 uppercase
  padding: 8px 20px
  letter-spacing: 0.5px
  cursor: pointer
  transition: all 0.15s ease
  ```
- **Hover**: `background: rgba(245,184,0,0.12)`, `border-color: var(--accent-gold)`, `color: var(--accent-gold)`
- **Active**: `background: var(--accent-gold)`, `color: #000`, `border-color: transparent`, gold glow

#### D. Left Panel — Category Strips
- Takes 65% width, `overflow: hidden`
- Each category strip:
  - Header row: Category name `Barlow Condensed 18px/700 uppercase var(--text-primary)` on the left + `"See All →"` link on the right in `Inter 12px var(--text-muted)`
  - Below: horizontal scrolling row, `overflow-x: auto scrollbar-width: none`, `gap: 12px`
  - Strip order: `LIVE SPORTS` first, then `বাংলাদেশ`, then `ENTERTAINMENT`, then `MOVIES`, then rest

- **Desktop Channel Card**:
  ```
  width: 160px
  flex-shrink: 0
  background: var(--bg-surface)
  border-radius: var(--radius-lg)
  padding: 14px
  cursor: pointer
  transition: transform 0.2s, box-shadow 0.2s
  ```
  - Logo/avatar: 52px squircle (`border-radius: 12px`, `background: var(--bg-elevated)`, centered logo image)
  - LIVE badge: a `<span>` with a 5px CSS red dot + text `"LIVE"` — `Barlow Condensed 10px/700 var(--accent-live)`, right-aligned on same row as logo. **No emoji, no unicode bullet.**
  - Channel name: `Inter 13px/600 var(--text-primary)`, 2 lines max, ellipsis overflow
  - Category: `Barlow Condensed 11px/500 var(--text-muted)` uppercase
  - **Hover**: `transform: translateY(-3px)`, `box-shadow: var(--shadow-card)`, logo box gets `border: 1.5px solid var(--border-active)` (gold)
  - On click: load stream in the right-panel player

#### E. Right Panel — Sticky Player + Live Schedule
- Takes 35% width, `position: sticky; top: 64px; max-height: calc(100vh - 64px); overflow-y: auto`
- **Player box**: full width of panel, `aspect-ratio: 16/9`, `background: #000`, `border-radius: var(--radius-lg)`, `overflow: hidden`
  - **Follows the same Auto-Load Logic as mobile** — the player already has a stream loaded when the page mounts. It is never blank. The auto-loaded channel on desktop is the same resolved channel from the `useDefaultChannel()` hook.
  - Active: iframe/video element always present
- **Below player**: current stream info row — channel name `Inter 14px/600` + category tag `Barlow Condensed 11px var(--text-muted)` uppercase
- **"NOW LIVE" list**: compact vertical list of live channels
  - Each item: small 32px logo box + channel name `Inter 13px` + animated CSS red dot (5px, `border-radius: 50%`, pulse animation — **no emoji, no unicode**) — full width, `padding: 10px 12px`, hover background `var(--bg-hover)`, click loads stream in player above
  - Max 8–10 items, scrollable within the right panel

---

## 🔄 SHARED BEHAVIORS — APPLY TO BOTH MOBILE AND DESKTOP

### Auto-Load on Page Mount (useDefaultChannel hook)
Create `hooks/useDefaultChannel.js` (or `.ts`). This hook runs once on mount and returns the channel object to use as the initial `activeChannel` state. Priority order:

```js
function useDefaultChannel(allChannels, worldCupPriorityList) {
  // 1. Try localStorage
  const lastId = localStorage.getItem('kk_lastWatched');
  if (lastId) {
    const found = allChannels.find(c => c.id === lastId);
    if (found) return found;
  }
  // 2. Try first World Cup priority channel that exists in data
  for (const name of worldCupPriorityList) {
    const found = allChannels.find(c =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    if (found) return found;
  }
  // 3. Try first channel with isLive flag
  const live = allChannels.find(c => c.isLive === true);
  if (live) return live;
  // 4. Absolute fallback — first channel in list
  return allChannels[0] ?? null;
}
```

The `activeChannel` state is initialised with the return value of this hook. The player renders immediately with that channel's stream URL. **There is no loading screen. There is no "pick a channel" empty state. The app starts playing.**

### Stream Selection (after initial load)
When a user taps/clicks a channel card OR a server button:
1. Extract the stream URL for that channel
2. Update `activeChannel` state
3. Update the player `src`/`iframe src`
4. Mark that card/button as visually active (gold border/fill)
5. On mobile: `window.scrollTo({ top: 0, behavior: 'smooth' })` to bring player into view
6. `localStorage.setItem('kk_lastWatched', channel.id)` — persist for next visit

### LIVE Badge (CSS only — no emoji, no unicode bullets)
```jsx
// LiveBadge component — reuse everywhere
<span className="live-badge">
  <span className="live-dot" />
  LIVE
</span>
```
```css
.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 700;
  color: var(--accent-live);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-live);
  animation: pulse-dot 1.4s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
```

### Icons — Lucide React Only
Install `lucide-react` if not already present. Use ONLY these icons across the entire UI:
- Header search: `<Search />`
- Header more menu: `<MoreVertical />`
- Bottom nav home: `<Home />`
- Bottom nav search: `<Search />`
- Bottom nav favorites: `<Star />`
- Bottom nav settings: `<Settings />`
- Desktop nav search: `<Search />`
- Desktop nav settings: `<Settings />`
- Player error state: `<AlertCircle />`
- See-all arrow: `<ChevronRight />`

**No emoji. No PNG/JPG icons. No custom SVG blobs. Lucide vector icons only throughout.**

### Search
- Search bar appears as a **full-screen overlay** on mobile (slides up from bottom, dark background, `backdrop-filter: blur(10px)`)
- On desktop: expands inline from the `<Search />` icon in the navbar as a `<input>` with autocomplete dropdown
- Filter as user types — match against channel names, categories, languages

### Error / Empty States
- If a stream fails to load: replace player content with a dark panel showing `<AlertCircle size={32} color="var(--accent-live)" />` centered, below it text `"সার্ভার পাওয়া যাচ্ছে না"` (`Inter 13px var(--text-secondary)`), and a button `"অন্য সার্ভার দেখো"` (`Barlow Condensed 12px/700`, gold, pill-shaped) that focuses/scrolls to the server selector
- If a category strip has zero channels after filtering: remove the strip entirely from the DOM — do not show empty rows

---

## 🗂️ FILE MODIFICATION CHECKLIST

Work through this order to avoid breaking changes:

1. **`app/globals.css`** — Add design tokens. Add utility classes: `.line-clamp-1`, `.line-clamp-2`, `.hide-scrollbar { scrollbar-width: none; -webkit-overflow-scrolling: touch; }`, `.aspect-video { aspect-ratio: 16/9 }`, `.live-badge` + `.live-dot` + `@keyframes pulse-dot` as specified in the Shared Behaviors section.

2. **Install `lucide-react`** — Run `npm install lucide-react` if not already in `package.json`. No other icon library is needed.

3. **`app/layout.js` (or equivalent root layout)** — Add Google Fonts import for `Barlow Condensed` (weights 700, 900) and `Inter` (weights 400, 500, 600). Apply `font-family: 'Inter', sans-serif` to `<body>`. Add `<meta name="theme-color" content="#080810">`. Remove any default light-mode body background.

4. **`hooks/useDefaultChannel.js`** — Create this file as specified in Shared Behaviors. It is the single source of truth for what plays on load.

5. **`components/layout/MobileHeader`** — Fixed 44px header. Logo `<img>` (actual file from `public/`), `<Search />` and `<MoreVertical />` from lucide-react on the right.

6. **`components/layout/DesktopNav`** — Sticky 64px nav. Logo `<img>`, center text links, `<Search />` and `<Settings />` on right. All from lucide-react.

7. **`components/layout/BottomNav`** — Mobile only. 4 items using `<Home />`, `<Search />`, `<Star />`, `<Settings />` from lucide-react. Active gold dot indicator.

8. **`components/player/VideoPlayer`** — Accepts `channel` prop (full channel object). Renders iframe/video immediately. On error renders the `<AlertCircle />` error state. No idle/blank state exists.

9. **`components/channels/ServerSelector`** — Takes filtered World Cup channels array + `activeChannel` + `onSelect`. Renders pill buttons. The currently playing channel is pre-highlighted gold.

10. **`components/common/LiveBadge`** — Shared `<LiveBadge />` component using the CSS dot + LIVE text as specified. Used in cards, now-live list, everywhere. No emoji.

11. **`components/channels/ChannelCard`** — Single component, `variant="mobile" | "desktop"` prop. Uses `<LiveBadge />`. No emoji anywhere.

12. **`components/sections/CategoryStrip`** — Takes `title`, `channels`, `variant`. Renders `<ChevronRight />` for the "see all" indicator. Hides itself entirely if `channels.length === 0`.

13. **`components/sections/HeroBanner`** — Desktop only. Rotating background from all sports images in `public/`. Dark overlay. `<ServerSelector />` embedded inside.

14. **`components/channels/NowLiveList`** — Desktop right panel. Compact list of live channels, each with `<LiveBadge />`. Click triggers `onSelect`.

15. **`app/page.js`** — Rewire with `useDefaultChannel()` at the top. Pass resolved channel as initial `activeChannel`. Render separate mobile and desktop layout trees.

---

## ✅ QUALITY CHECKLIST — VERIFY BEFORE FINISHING

- [ ] Logo image from `public/` is used in ALL header locations (mobile + desktop). No placeholder text. No emoji.
- [ ] Background images from `public/` are used with dark overlays — never raw bright images
- [ ] World Cup server selector only shows channels that **actually exist in the channel data**
- [ ] `useDefaultChannel()` hook is wired up — player has a stream loaded on first render, no blank/idle state ever
- [ ] The auto-loaded channel is visually highlighted (gold) in the server selector and channel grid on load
- [ ] Video player is sticky on both mobile (top: 44px) and desktop (right panel, top: 64px)
- [ ] No horizontal scroll on the page itself (only inside scroll-strips)
- [ ] Bottom nav is present and fixed on mobile only (`md:hidden`)
- [ ] No white backgrounds anywhere — everything uses the dark token system
- [ ] Text sizes: mobile card titles max 12px, desktop card titles 13–14px, hero headlines use `Barlow Condensed` display sizes
- [ ] Remove ALL promotional/marketing copy — zero fluff text
- [ ] LIVE badge uses CSS animated dot only — no emoji, no unicode bullets
- [ ] All icons are from `lucide-react` — no emoji, no PNG icons anywhere in the UI
- [ ] Active server button and active channel card both have gold highlight from the moment of page load
- [ ] On mobile, tapping a channel scrolls to top and loads stream
- [ ] Stream error state shows `<AlertCircle />` + Bengali error text + retry button
- [ ] Search overlay works on both mobile (full-screen) and desktop (inline dropdown)
- [ ] Test at 375px width (iPhone SE) and 1280px width (desktop) — both must look intentional and polished

---

## 🚫 THINGS TO EXPLICITLY AVOID

- No white or light-mode color anywhere in the UI
- **No emoji anywhere in the UI** — not in labels, not in badges, not in buttons, not in headings. Zero emoji.
- **No idle/blank player state** — the player always has a stream on load. Do not render an empty black box or a "tap to watch" placeholder.
- No large blocks of text explaining anything — if a user needs a paragraph to understand the UI, the UI is wrong
- No default browser-style buttons (plain `<button>` without styling)
- No card shadows in neon green, bright purple, or unrelated accent colors — only gold, live-red, or electric-blue
- No category sections with zero channels — hide them entirely
- No "CHANNEL NAME - HD - EXTRA - STREAM 1" full strings as card labels — truncate cleanly with CSS ellipsis
- Do not use placeholder images or broken `img` tags — always have a fallback background color (`var(--bg-elevated)`)
- Do not hardcode image paths — reference them from the actual filenames found in `public/` during the audit step
- Do not use PNG/JPG/GIF for UI icons — Lucide React vector icons only

---

## 📝 IMPLEMENTATION ORDER (DO THIS SEQUENCE)

```
Step 1:  Audit (images, components, channels, routes)
Step 2:  globals.css — tokens + live-badge CSS + pulse-dot keyframe
Step 3:  npm install lucide-react
Step 4:  Root layout — fonts (Barlow Condensed + Inter), meta, body styles
Step 5:  hooks/useDefaultChannel.js — priority chain auto-load logic
Step 6:  MobileHeader — logo + Search + MoreVertical (lucide)
Step 7:  DesktopNav — logo + links + Search + Settings (lucide)
Step 8:  BottomNav — Home, Search, Star, Settings (lucide), gold active dot
Step 9:  LiveBadge — shared CSS dot component, no emoji
Step 10: VideoPlayer — accepts channel prop, always renders stream, error state with AlertCircle
Step 11: ServerSelector — pill buttons, active = gold, pre-selects auto-loaded channel
Step 12: ChannelCard (mobile variant) — uses LiveBadge
Step 13: ChannelCard (desktop variant) — uses LiveBadge
Step 14: CategoryStrip — shared, hides if empty, ChevronRight icon
Step 15: HeroBanner (desktop) — rotating BG images, dark overlay, ServerSelector inside
Step 16: NowLiveList (desktop right panel) — uses LiveBadge
Step 17: CategoryTabBar (mobile) — CSS animated dot on LIVE tab, no emoji
Step 18: Rewire app/page.js — useDefaultChannel at top, full mobile + desktop layout trees
Step 19: Test mobile 375px — player auto-loaded, bottom nav visible, no emoji visible
Step 20: Test desktop 1280px — player auto-loaded in right rail, hero banner, no emoji visible
Step 21: Final pass — remove remaining text clutter, verify all icons are lucide vectors
```
