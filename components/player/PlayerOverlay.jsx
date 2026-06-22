'use client';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CopyIcon, CheckIcon, VectorFlag } from '../ui/Icons';
import Badge from '../ui/Badge';

export default function PlayerOverlay({ channel, visible }) {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!channel) return null;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(channel.url);
    setCopied(true);
    showToast('📋 Stream URL copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`absolute bottom-16 left-4 max-w-[280px] md:max-w-[340px] p-3 bg-bg-secondary/90 border border-border-subtle backdrop-blur-md transition-all duration-300 rounded-xl z-10 flex gap-3 select-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      {/* Mini country indicator flag if applicable */}
      {channel.countryCode && (
        <div className="flex-shrink-0 flex items-center justify-center">
          <VectorFlag code={channel.countryCode} className="w-8 h-5 rounded-[4px]" />
        </div>
      )}

      {/* Info labels */}
      <div className="flex-1 overflow-hidden">
        <h4 className="font-display font-bold text-sm md:text-base text-text-primary leading-tight truncate" title={channel.name}>
          {channel.name}
        </h4>
        
        <div className="flex items-center gap-2 mt-1">
          <Badge text={channel.category} className="text-[9px]" />
          {channel.fifaBadge && (
            <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-gold/10 text-gold border border-gold/20 font-bold select-none truncate">
              {channel.fifaBadge}
            </span>
          )}
        </div>
      </div>

      {/* Quick Copy Stream button */}
      <button
        onClick={handleCopy}
        className="action-btn flex-shrink-0 self-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated/80 border border-transparent hover:border-border-subtle/50 transition-all cursor-pointer"
        title="Copy stream url"
      >
        {copied ? <CheckIcon className="w-4 h-4 text-live-green" /> : <CopyIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}
