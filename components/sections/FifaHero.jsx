'use client';
import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { TrophyIcon, SoccerBallIcon, ChevronLeftIcon, ChevronRightIcon, VectorFlag } from '../ui/Icons';
import LiveDot from '../ui/LiveDot';
import LogoAvatar from '../ui/LogoAvatar';

export default function FifaHero() {
  const { channels, activeChannel, watchChannel } = useApp();
  const scrollContainerRef = useRef(null);

  // Filter and sort FIFA channels
  const fifaChannels = React.useMemo(() => {
    return channels
      .filter(ch => ch.isFifaChannel)
      .sort((a, b) => {
        if (a.fifaPriority !== b.fifaPriority) {
          return a.fifaPriority - b.fifaPriority;
        }
        return a.name.localeCompare(b.name);
      });
  }, [channels]);

  // Statistics calculation
  const stats = React.useMemo(() => {
    const total = fifaChannels.length;
    const bdCount = fifaChannels.filter(c => c.fifaPriority === 1).length;
    const intlCount = fifaChannels.filter(c => c.fifaPriority === 2).length;
    return { total, bdCount, intlCount };
  }, [fifaChannels]);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (fifaChannels.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden p-6 md:p-8 rounded-2xl border border-border-subtle bg-gradient-to-br from-fifa-green via-fifa-navy to-fifa-purple select-none mb-6">
      {/* Stadium Glow Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(34,197,94,0.12)_0%,transparent_65%)] animate-stadium-glow pointer-events-none" />

      {/* Top Gold Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Hero Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-gold font-display font-semibold tracking-wider text-xs uppercase">
            <TrophyIcon className="w-4 h-4 animate-bounce" />
            <span>FIFA World Cup 2026 • LIVE BROADCASTS</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-4xl text-text-primary mt-1 tracking-wide flex items-center gap-3">
            খেলা কই দেখবো? 
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent-red/20 text-accent-red border border-accent-red/30 text-xs font-bold font-body animate-pulse">
              <LiveDot color="red" /> LIVE NOW
            </span>
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-1 max-w-xl font-body">
            Browse live feeds, national broadcasts, and global rights holders from the tournament. Select any channel card below to stream immediately.
          </p>
        </div>
      </div>

      {/* Horizontally Scrollable Channel Strip */}
      <div className="relative z-10 w-full group">
        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-lg bg-bg-secondary/90 border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer transition-opacity z-20 opacity-0 group-hover:opacity-100"
          title="Scroll Left"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Channels Strip */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto flex items-center gap-4 py-2 scroll-smooth no-scrollbar scroll-snap-x"
        >
          {fifaChannels.map(ch => {
            const isActive = activeChannel?.id === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => watchChannel(ch)}
                className={`scroll-snap-align-start flex-shrink-0 w-[200px] p-3.5 bg-bg-secondary/70 border backdrop-blur-md rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-[124px] ${
                  isActive 
                    ? 'border-gold bg-bg-secondary/90' 
                    : 'border-border-subtle/80 hover:border-gold/50'
                }`}
              >
                {/* Top row: Flag + priority/badge */}
                <div className="flex items-center justify-between w-full">
                  <VectorFlag code={ch.countryCode} className="w-7 h-4.5 rounded-[4px]" />
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                    ch.fifaPriority === 1 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : (ch.fifaPriority === 2 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-bg-elevated text-text-secondary border border-border-subtle')
                  }`}>
                    {ch.fifaBadge}
                  </span>
                </div>

                {/* Middle row: Channel name */}
                <div className="font-display font-bold text-sm text-text-primary line-clamp-2 pr-1 leading-snug mt-2">
                  {ch.name}
                </div>

                {/* Bottom row: Play state or live indicator */}
                <div className="flex items-center justify-between w-full mt-1.5">
                  <div className="flex items-center gap-1.5">
                    <LiveDot />
                    <span className="text-[10px] text-text-secondary tracking-wide uppercase font-semibold">Live Feed</span>
                  </div>
                  {isActive && (
                    <span className="text-[9px] font-bold text-gold tracking-wider select-none uppercase animate-pulse">
                      Playing
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-lg bg-bg-secondary/90 border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer transition-opacity z-20 opacity-0 group-hover:opacity-100"
          title="Scroll Right"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Info bar at the bottom */}
      <div className="relative z-10 flex items-center justify-center md:justify-start gap-4 mt-6 pt-4 border-t border-border-subtle/30 text-[10px] md:text-xs text-text-secondary font-medium tracking-wide">
        <div className="flex items-center gap-1.5">
          <SoccerBallIcon className="w-4 h-4 text-gold animate-spin-slow" />
          <span>{stats.total} FIFA Channels</span>
        </div>
        <span className="text-border-subtle">|</span>
        <div>
          <span>{stats.bdCount} Official BD feeds</span>
        </div>
        <span className="text-border-subtle">|</span>
        <div>
          <span>{stats.intlCount} International broadcasters</span>
        </div>
      </div>

      {/* Bottom Gold Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
