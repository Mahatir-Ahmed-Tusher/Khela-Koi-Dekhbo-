'use client';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TrophyIcon, SoccerBallIcon, ChevronLeftIcon, ChevronRightIcon, VectorFlag } from '../ui/Icons';
import LiveDot from '../ui/LiveDot';

const REAL_MATCHES = [
  // Tuesday, June 23, 2026
  {
    id: 'm1',
    teamA: 'Portugal',
    codeA: 'PT',
    teamB: 'Uzbekistan',
    codeB: 'UZ',
    time: '2026-06-23T17:00:00Z', // 5:00 PM UTC
    stage: 'Group Stage • Group K'
  },
  {
    id: 'm2',
    teamA: 'England',
    codeA: 'ENGLAND',
    teamB: 'Ghana',
    codeB: 'GH',
    time: '2026-06-23T20:00:00Z', // 8:00 PM UTC
    stage: 'Group Stage • Group L'
  },
  {
    id: 'm3',
    teamA: 'Panama',
    codeA: 'PA',
    teamB: 'Croatia',
    codeB: 'HR',
    time: '2026-06-23T23:00:00Z', // 11:00 PM UTC
    stage: 'Group Stage • Group L'
  },
  {
    id: 'm4',
    teamA: 'Colombia',
    codeA: 'CO',
    teamB: 'DR Congo',
    codeB: 'CD',
    time: '2026-06-24T02:00:00Z', // 2:00 AM UTC (June 24)
    stage: 'Group Stage • Group K'
  },
  // Wednesday, June 24, 2026
  {
    id: 'm5',
    teamA: 'Switzerland',
    codeA: 'CH',
    teamB: 'Canada',
    codeB: 'CA',
    time: '2026-06-24T19:00:00Z', // 7:00 PM UTC
    stage: 'Group Stage • Group B'
  },
  {
    id: 'm6',
    teamA: 'Bosnia & Herz.',
    codeA: 'BA',
    teamB: 'Qatar',
    codeB: 'QA',
    time: '2026-06-24T19:00:00Z', // 7:00 PM UTC
    stage: 'Group Stage • Group B'
  },
  {
    id: 'm7',
    teamA: 'Scotland',
    codeA: 'SCO',
    teamB: 'Brazil',
    codeB: 'BR',
    time: '2026-06-24T22:00:00Z', // 10:00 PM UTC
    stage: 'Group Stage • Group C'
  },
  {
    id: 'm8',
    teamA: 'Morocco',
    codeA: 'MA',
    teamB: 'Haiti',
    codeB: 'HT',
    time: '2026-06-24T22:00:00Z', // 10:00 PM UTC
    stage: 'Group Stage • Group C'
  },
  {
    id: 'm9',
    teamA: 'Czechia',
    codeA: 'CZ',
    teamB: 'Mexico',
    codeB: 'MX',
    time: '2026-06-25T01:00:00Z', // 1:00 AM UTC (June 25)
    stage: 'Group Stage • Group A'
  },
  {
    id: 'm10',
    teamA: 'South Africa',
    codeA: 'ZA',
    teamB: 'South Korea',
    codeB: 'KR',
    time: '2026-06-25T01:00:00Z', // 1:00 AM UTC (June 25)
    stage: 'Group Stage • Group A'
  },
  // Thursday, June 25, 2026
  {
    id: 'm11',
    teamA: 'Türkiye',
    codeA: 'TR',
    teamB: 'USA',
    codeB: 'US',
    time: '2026-06-26T02:00:00Z', // 2:00 AM UTC (June 26)
    stage: 'Group Stage • Group D'
  }
];

export default function FifaWorldCupWidget({ onSelectChannel }) {
  const { channels, activeChannel, watchChannel, showToast } = useApp();
  const scrollContainerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [nowTime, setNowTime] = useState(null);

  useEffect(() => {
    setMounted(true);
    setNowTime(new Date().getTime());
    
    // Periodically update current time to trigger status changes
    const timer = setInterval(() => {
      setNowTime(new Date().getTime());
    }, 30000);
    
    return () => clearInterval(timer);
  }, []);

  // Filter and sort FIFA channels
  const fifaChannels = useMemo(() => {
    return channels
      .filter(ch => ch.isFifaChannel)
      .sort((a, b) => {
        if (a.fifaPriority !== b.fifaPriority) {
          return (a.fifaPriority ?? 99) - (b.fifaPriority ?? 99);
        }
        return a.name.localeCompare(b.name);
      });
  }, [channels]);

  // Compute matches list with live statuses based on client clock (filtered for today and next 1 day only)
  const matchesWithStatus = useMemo(() => {
    if (!nowTime) {
      return REAL_MATCHES.map(m => ({ ...m, status: 'upcoming' }));
    }

    // Filter to only include today and next 1 day (tomorrow) local time
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today local time
    const startMs = today.getTime();
    const endMs = startMs + (2 * 24 * 60 * 60 * 1000); // 48 hours later (covers today and tomorrow completely)

    const filteredMatches = REAL_MATCHES.filter(m => {
      const matchMs = new Date(m.time).getTime();
      return matchMs >= startMs && matchMs < endMs;
    });

    return filteredMatches.map(m => {
      const matchStart = new Date(m.time).getTime();
      const matchEnd = matchStart + (2.5 * 60 * 60 * 1000); // 2.5 hours match duration

      let status = 'upcoming';
      if (nowTime >= matchStart && nowTime < matchEnd) {
        status = 'live';
      } else if (nowTime >= matchEnd) {
        status = 'completed';
      }

      return { ...m, status };
    });
  }, [nowTime]);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handlePlayMatchStream = (match) => {
    // Find best live sports stream
    const tsn = channels.find(c => c.name.toLowerCase().includes('tsn 1') || c.name.toLowerCase().includes('tsn 2'));
    const caze = channels.find(c => c.name.toLowerCase().includes('caze'));
    const tsports = channels.find(c => c.name.toLowerCase().includes('t sports'));
    const anyFifa = fifaChannels[0];

    const streamToPlay = tsn || caze || tsports || anyFifa;

    if (streamToPlay) {
      if (onSelectChannel) {
        onSelectChannel(streamToPlay);
      } else {
        watchChannel(streamToPlay);
      }
      showToast(`Tuning into ${streamToPlay.name} for ${match.teamA} vs ${match.teamB}`, 'success');
      if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      showToast('No active World Cup streams found at the moment.', 'error');
    }
  };

  const formatBDTime = (utcString) => {
    const d = new Date(utcString);
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const bdDate = new Date(utc + (3600000 * 6)); // UTC+6
    
    const day = bdDate.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[bdDate.getMonth()];
    
    let hours = bdDate.getHours();
    const minutes = bdDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${day} ${month}, ${hours}:${minutes} ${ampm}`;
  };

  const formatLocalTime = (utcString) => {
    if (!mounted) return '...';
    try {
      const d = new Date(utcString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch (e) {
      return '';
    }
  };

  if (fifaChannels.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden p-5 md:p-8 rounded-2xl border border-border-subtle bg-gradient-to-br from-fifa-green/45 via-fifa-navy to-fifa-purple/40 mb-6">
      {/* Stadium Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(34,197,94,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Gold Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between gap-4 mb-6 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-1.5 text-gold font-display font-semibold tracking-wider text-[10px] md:text-xs uppercase">
            <TrophyIcon className="w-3.5 h-3.5 animate-bounce text-accent-gold" />
            <span>FIFA WORLD CUP 2026</span>
          </div>
          <h2 className="font-display font-black text-xl md:text-3xl text-text-primary mt-1 tracking-wide flex items-center gap-3">
            World Cup Hub
            {matchesWithStatus.some(m => m.status === 'live') && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-accent-red/20 text-accent-red border border-accent-red/30 text-[9px] font-bold font-body animate-pulse">
                <LiveDot color="red" /> LIVE NOW
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Grid: Matches list on left/top, feeds carousel on bottom/right */}
      <div className="relative z-10 grid grid-cols-1 gap-7">
        
        {/* Match Schedule Widget */}
        <div className="space-y-4">
          <h3 className="font-display font-extrabold text-[12px] md:text-sm text-text-secondary uppercase tracking-widest flex items-center gap-2.5">
            <SoccerBallIcon className="w-4 h-4 md:w-5 md:h-5 text-accent-gold animate-spin-slow" />
            Interactive Match Schedule
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchesWithStatus.map((match) => {
              const isLive = match.status === 'live';
              const isCompleted = match.status === 'completed';
              
              return (
                <div
                  key={match.id}
                  onClick={() => handlePlayMatchStream(match)}
                  className={`relative p-4 md:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isLive 
                      ? 'bg-emerald-500/10 border-emerald-500/40 hover:bg-emerald-500/15 hover:border-emerald-500/60 shadow-[0_4px_12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20' 
                      : (isCompleted ? 'bg-bg-surface/30 border-border-subtle/40 opacity-70 hover:opacity-90' : 'bg-bg-surface/60 border-border-subtle/70 hover:bg-bg-elevated hover:border-border-subtle')
                  }`}
                >
                  {/* Match header */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-[9px] md:text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      {match.stage}
                    </span>
                    {isLive ? (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-bold uppercase tracking-wider animate-pulse border border-emerald-500/30">
                        LIVE NOW
                      </span>
                    ) : isCompleted ? (
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-text-muted text-[8px] font-bold uppercase tracking-wider border border-white/5">
                        COMPLETED
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-text-muted text-[8px] font-bold uppercase tracking-wider border border-white/5">
                        UPCOMING
                      </span>
                    )}
                  </div>

                  {/* Teams row */}
                  <div className="flex items-center justify-between gap-3 my-2">
                    {/* Team A */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <VectorFlag code={match.codeA} className="w-8 h-5.5 rounded shadow-sm border border-white/10" />
                      <span className="font-display font-bold text-xs md:text-sm text-text-primary truncate">
                        {match.teamA}
                      </span>
                    </div>

                    <span className="text-[10px] md:text-[11px] font-black text-text-muted shrink-0 uppercase tracking-widest px-2">
                      VS
                    </span>

                    {/* Team B */}
                    <div className="flex items-center gap-3 flex-1 justify-end min-w-0">
                      <span className="font-display font-bold text-xs md:text-sm text-text-primary truncate text-right">
                        {match.teamB}
                      </span>
                      <VectorFlag code={match.codeB} className="w-8 h-5.5 rounded shadow-sm border border-white/10" />
                    </div>
                  </div>

                  {/* Date and times */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[9px] md:text-[10px] text-text-secondary">
                      <span className="font-semibold text-accent-gold">BD Time:</span>
                      <span className="font-body text-right">{formatBDTime(match.time)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] md:text-[10px] text-text-muted">
                      <span>Your Time:</span>
                      <span className="font-body text-right">{formatLocalTime(match.time)} (Local)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Channels scroll container */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-display font-extrabold text-[12px] md:text-sm text-text-secondary uppercase tracking-widest">
              Live Broadcaster Feeds
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleScroll('left')}
                className="p-1 rounded bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary cursor-pointer active:scale-90"
              >
                <ChevronLeftIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="p-1 rounded bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary cursor-pointer active:scale-90"
              >
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto flex items-center gap-3 py-1 hide-scrollbar scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {fifaChannels.map((ch) => {
              const isActive = activeChannel?.id === ch.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    if (onSelectChannel) {
                      onSelectChannel(ch);
                    } else {
                      watchChannel(ch);
                    }
                  }}
                  className={`snap-start flex-shrink-0 w-[160px] p-3 bg-bg-surface/50 border rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-[104px] ${
                    isActive 
                      ? 'border-emerald-500 bg-bg-surface/90 shadow-[0_2px_8px_rgba(16,185,129,0.2)]' 
                      : 'border-border-subtle/50 hover:border-gold/45'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <VectorFlag code={ch.countryCode} className="w-5.5 h-3.5 rounded border border-white/5" />
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-text-secondary border border-white/5 uppercase">
                      {ch.fifaBadge}
                    </span>
                  </div>

                  <div className="font-display font-extrabold text-xs text-text-primary line-clamp-1 pr-1 truncate mt-2">
                    {ch.name}
                  </div>

                  <div className="flex items-center justify-between w-full mt-1">
                    <span className="text-[9px] text-text-secondary tracking-wide uppercase font-semibold">Feed Server</span>
                    {isActive && (
                      <span className="text-[8px] font-bold text-emerald-400 tracking-wider uppercase animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
