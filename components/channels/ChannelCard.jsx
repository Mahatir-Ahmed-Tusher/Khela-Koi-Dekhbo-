'use client';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import LiveBadge from '../common/LiveBadge';
import LogoAvatar from '../ui/LogoAvatar';

export default function ChannelCard({ channel, variant = 'desktop', onSelect }) {
  const { activeChannel, watchChannel } = useApp();
  const [imgError, setImgError] = useState(false);

  const isActive = activeChannel?.id === channel.id;

  const handlePlay = () => {
    if (onSelect) {
      onSelect(channel);
    } else {
      watchChannel(channel);
    }
    
    if (variant === 'mobile') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ----------------------------------------------------
  // MOBILE VARIANT
  // ----------------------------------------------------
  if (variant === 'mobile' || variant === 'mobile-inline') {
    const isInline = variant === 'mobile-inline';
    
    return (
      <div 
        onClick={handlePlay}
        className={`flex flex-col gap-1.5 p-2.5 bg-bg-surface rounded-md select-none cursor-pointer transition-all ${
          isInline ? 'w-[125px] flex-shrink-0' : 'w-full'
        } ${
          isActive 
            ? 'border border-accent-gold shadow-gold' 
            : 'border border-transparent'
        }`}
      >
        {/* Top Row: Logo & Live Badge */}
        <div className="flex items-center justify-between w-full">
          <div className="w-9 h-9 rounded-md overflow-hidden bg-bg-elevated flex items-center justify-center shrink-0 border border-border-subtle/50">
            {channel.logo && !imgError ? (
              <img
                src={channel.logo}
                alt={channel.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
              />
            ) : (
              <LogoAvatar name={channel.name} className="w-full h-full text-xs rounded-none" />
            )}
          </div>
          <LiveBadge />
        </div>

        {/* Middle Row: Title */}
        <p className="font-body text-[11px] font-semibold text-text-primary line-clamp-1 truncate mt-0.5" title={channel.name}>
          {channel.name}
        </p>

        {/* Bottom Row: Category */}
        <span className="font-display text-[9px] text-text-muted tracking-wide uppercase truncate">
          {channel.fifaBadge || channel.category}
        </span>
      </div>
    );
  }

  // ----------------------------------------------------
  // DESKTOP VARIANT
  // ----------------------------------------------------
  return (
    <div 
      onClick={handlePlay}
      className={`w-[160px] flex-shrink-0 flex flex-col gap-2.5 p-3.5 bg-bg-surface rounded-lg select-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card group border ${
        isActive ? 'border-accent-gold shadow-gold' : 'border-transparent'
      }`}
    >
      {/* Top Row: Logo Box & Live Badge */}
      <div className="flex items-start justify-between w-full">
        <div className={`w-[52px] h-[52px] rounded-md overflow-hidden bg-bg-elevated flex items-center justify-center transition-all ${
          isActive 
            ? 'border-1.5 border-accent-gold' 
            : 'border border-border-subtle/50 group-hover:border-accent-gold/50'
        }`}>
          {channel.logo && !imgError ? (
            <img
              src={channel.logo}
              alt={channel.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-2"
              loading="lazy"
            />
          ) : (
            <LogoAvatar name={channel.name} className="w-full h-full text-[13px] rounded-none" />
          )}
        </div>
        <LiveBadge />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 mt-1">
        <h4 className="font-body text-[13px] font-semibold text-text-primary line-clamp-2 leading-tight min-h-[32px]" title={channel.name}>
          {channel.name}
        </h4>
        <span className="font-display text-[11px] font-medium text-text-muted tracking-wide uppercase truncate">
          {channel.fifaBadge || channel.category}
        </span>
      </div>
    </div>
  );
}
