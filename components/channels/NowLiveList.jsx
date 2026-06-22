'use client';
import React, { useState } from 'react';
import LiveBadge from '../common/LiveBadge';
import LogoAvatar from '../ui/LogoAvatar';

export default function NowLiveList({
  channels = [],
  activeChannel,
  onSelect
}) {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  // Limit to 10 live channels
  const liveChannels = channels.slice(0, 10);

  if (liveChannels.length === 0) return null;

  return (
    <div className="flex flex-col w-full select-none">
      {/* Title */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle/50 mb-2">
        <h4 className="font-display text-[12px] font-bold tracking-wider text-text-secondary uppercase">
          Now Live
        </h4>
        <LiveBadge />
      </div>

      {/* List Container */}
      <div className="flex flex-col gap-1 overflow-y-auto max-h-[400px] hide-scrollbar">
        {liveChannels.map((channel) => {
          const isActive = activeChannel && activeChannel.id === channel.id;
          const hasError = imgErrors[channel.id];

          return (
            <div
              key={channel.id}
              onClick={() => onSelect(channel)}
              className={`flex items-center gap-3 w-full p-2.5 rounded-lg cursor-pointer transition-all ${
                isActive 
                  ? 'bg-bg-hover text-accent-gold border border-accent-gold/20' 
                  : 'hover:bg-bg-hover/60 border border-transparent text-text-primary'
              }`}
            >
              {/* Small Logo Box (32px) */}
              <div className="w-8 h-8 rounded-md overflow-hidden bg-bg-elevated flex items-center justify-center shrink-0 border border-border-subtle/40">
                {channel.logo && !hasError ? (
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    onError={() => handleImgError(channel.id)}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <LogoAvatar name={channel.name} className="w-full h-full text-[10px] rounded-none" />
                )}
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <span className="font-body text-[13px] font-medium block truncate">
                  {channel.name}
                </span>
                <span className="font-display text-[10px] text-text-muted uppercase tracking-wider block">
                  {channel.fifaBadge || channel.category}
                </span>
              </div>

              {/* Live Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-accent-live animate-pulse shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
