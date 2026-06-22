'use client';
import React, { useRef } from 'react';

export default function ServerSelector({
  channels,
  activeChannel,
  onSelect
}) {
  const containerRef = useRef(null);

  // Filter channels to only show FIFA channels (those with valid priority and badge)
  const fifaServers = channels
    .filter(c => c.isFifaChannel && c.fifaBadge && c.fifaPriority !== 99)
    // Sort them by priority
    .sort((a, b) => a.fifaPriority - b.fifaPriority);

  if (fifaServers.length === 0) return null;

  return (
    <div 
      id="server-selector-container"
      className="flex items-center w-full px-4 py-2.5 bg-bg-surface select-none transition-all"
    >
      <span className="font-display text-[10px] font-bold tracking-widest uppercase text-accent-gold mr-3 shrink-0">
        FIFA 2026
      </span>
      <div 
        ref={containerRef}
        className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {fifaServers.map((server) => {
          const isActive = activeChannel && activeChannel.id === server.id;
          
          return (
            <button
              key={server.id}
              onClick={() => onSelect(server)}
              className={`px-3.5 py-1.5 rounded-full font-body text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive 
                  ? 'bg-emerald-500 text-white font-bold shadow-[0_2px_8px_rgba(16,185,129,0.4)]'
                  : 'bg-bg-elevated border border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-secondary/30'
              }`}
            >
              {server.fifaBadge}
            </button>
          );
        })}
      </div>
    </div>
  );
}
