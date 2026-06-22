import React from 'react';

// General utility for styling icons
const iconClass = (className = 'w-5 h-5') => className;

export function TrophyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Z" />
    </svg>
  );
}

export function SoccerBallIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m12 2-2 4h4Z" />
      <path d="m12 22-2-4h4Z" />
      <path d="m2 12 4-2v4Z" />
      <path d="m22 12-4-2v4Z" />
      <path d="M6 10h4v4H6Z" />
      <path d="M14 10h4v4h-4Z" />
    </svg>
  );
}

export function SportsMedalIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8a2 2 0 0 1 2.2-.13L14.47 7.3" />
      <path d="M16.79 15 21.34 7.14a2 2 0 0 0-.13-2.2L19.6 2.8a2 2 0 0 0-2.2-.13L9.53 7.3" />
      <circle cx="12" cy="15" r="5" />
      <path d="M12 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
}

export function HomeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function SearchIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function StarIcon({ className = 'w-5 h-5', filled = false }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function EntertainmentIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.47.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function FilmIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

export function MusicNoteIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function KidsToyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

export function NewspaperIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

export function ReligiousIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m12 7 1.25 3.75L17 12l-3.75 1.25L12 17l-1.25-3.75L7 12l3.75-1.25L12 7Z" />
    </svg>
  );
}

export function BriefcaseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function TVIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  );
}

export function LeafIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
      <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
    </svg>
  );
}

export function VideoCameraIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
    </svg>
  );
}

export function ComedyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 13.5c1 1.5 2.5 2 4 2s3-.5 4-2" />
      <path d="M9 9.5c.3-.5.8-.8 1.5-.8s1.2.3 1.5.8" />
      <path d="M12 9.5c.3-.5.8-.8 1.5-.8s1.2.3 1.5.8" />
    </svg>
  );
}

export function LegislativeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="8" rx="1" />
      <path d="m12 2-8 5v1h16V7l-8-5Z" />
      <path d="M4 22h16" />
      <path d="M9 10v8" />
      <path d="M15 10v8" />
    </svg>
  );
}

export function PlayIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function PauseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export function MuteIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export function UnmuteIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export function FullscreenIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function FullscreenExitIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h3a2 2 0 0 1 2 2v3" />
      <path d="M20 14h-3a2 2 0 0 0-2 2v3" />
      <path d="M4 10h3a2 2 0 0 0 2-2V5" />
      <path d="M20 10h-3a2 2 0 0 1-2-2V5" />
    </svg>
  );
}

export function CopyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CheckIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function MenuIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function CloseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ----------------------------------------------------
// GENUINE FLAG COMPONENT
// Uses real country flag images from flagcdn.com CDN for pixel-perfect genuine flags.
// Supports all ISO 3166-1 alpha-2 country codes + special codes (MENA, GL, SCO).
// Scotland gets a custom SVG since it's not an ISO country.
// ----------------------------------------------------
export function VectorFlag({ code, className = 'w-6 h-4' }) {
  const c = code ? code.toUpperCase() : 'GL';
  
  // Scotland — not an ISO country, needs custom SVG (St. Andrew's Cross)
  if (c === 'SCO' || c === 'SCOTLAND') {
    return (
      <svg className={`${className} flex-shrink-0 rounded`} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" rx="2" fill="#005EB8" />
        <line x1="0" y1="0" x2="24" y2="16" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="24" y1="0" x2="0" y2="16" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>
    );
  }

  // England — use the St. George's Cross rather than Union Jack
  if (c === 'ENGLAND') {
    return (
      <svg className={`${className} flex-shrink-0 rounded`} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" rx="2" fill="#FFFFFF" />
        <rect x="10.5" width="3" height="16" fill="#CE1126" />
        <rect y="6.5" width="24" height="3" fill="#CE1126" />
      </svg>
    );
  }

  // MENA region — custom gradient flag for beIN etc.
  if (c === 'MENA') {
    return (
      <svg className={`${className} flex-shrink-0 rounded`} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="menaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="24" height="16" rx="2" fill="url(#menaGrad)" />
        <circle cx="12" cy="8" r="4" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="8" y1="8" x2="16" y2="8" stroke="#FFFFFF" strokeWidth="0.8" />
        <path d="M12 4a8 8 0 0 0 0 8 8 8 0 0 0 0-8Z" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
      </svg>
    );
  }

  // Global / Unknown — dark globe icon
  if (c === 'GL' || c === 'GLOBAL' || !c) {
    return (
      <svg className={`${className} flex-shrink-0 rounded`} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="globalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect width="24" height="16" rx="2" fill="url(#globalGrad)" />
        <circle cx="12" cy="8" r="4.5" fill="none" stroke="#94a3b8" strokeWidth="1" />
        <path d="M12 3.5a10 10 0 0 0 0 9" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="7.5" y1="8" x2="16.5" y2="8" stroke="#94a3b8" strokeWidth="0.8" />
      </svg>
    );
  }

  // GB maps to England flag by default (St. George's Cross) for World Cup context
  const isoCode = c === 'GB' ? 'gb-eng' : c.toLowerCase();

  // All real country flags — served from flagcdn.com CDN as high-quality PNGs
  return (
    <img
      src={`https://flagcdn.com/w80/${isoCode}.png`}
      srcSet={`https://flagcdn.com/w160/${isoCode}.png 2x`}
      alt={`${c} flag`}
      className={`${className} flex-shrink-0 rounded object-cover`}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null; // Prevent infinite loop
        e.currentTarget.srcset = ""; // Clear srcset
        e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' rx='2' fill='%231e293b'/><circle cx='12' cy='8' r='4.5' fill='none' stroke='%2394a3b8' stroke-width='1'/><path d='M12 3.5a10 10 0 0 0 0 9' fill='none' stroke='%2394a3b8' stroke-width='0.8'/><line x1='7.5' y1='8' x2='16.5' y2='8' stroke='%2394a3b8' stroke-width='0.8'/></svg>";
      }}
    />
  );
}

// Category Icon Mapper
export function getCategoryIcon(category, className = 'w-5 h-5') {
  switch (category) {
    case 'FIFA World Cup 2026':
      return <TrophyIcon className={className} />;
    case 'FIFA Special':
      return <SoccerBallIcon className={className} />;
    case 'Sports':
      return <SportsMedalIcon className={className} />;
    case 'Bangladesh':
      return <VectorFlag code="BD" className="w-5 h-4 rounded-[4px]" />;
    case 'Indian Entertainment':
      return <EntertainmentIcon className={className} />;
    case 'Movies':
      return <FilmIcon className={className} />;
    case 'Music':
      return <MusicNoteIcon className={className} />;
    case 'Kids':
      return <KidsToyIcon className={className} />;
    case 'India News':
      return <NewspaperIcon className={className} />;
    case 'Religious':
      return <ReligiousIcon className={className} />;
    case 'Business':
      return <BriefcaseIcon className={className} />;
    case 'General':
      return <TVIcon className={className} />;
    case 'Lifestyle':
      return <LeafIcon className={className} />;
    case 'Documentary':
      return <VideoCameraIcon className={className} />;
    case 'Comedy':
      return <ComedyIcon className={className} />;
    case 'Legislative':
      return <LegislativeIcon className={className} />;
    default:
      return <TVIcon className={className} />;
  }
}
