'use client';
import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import ChannelCard from '../channels/ChannelCard';

export default function CategoryStrip({
  title,
  channels = [],
  onSeeAll,
  onSelectChannel,
  cardVariant = 'desktop'
}) {
  const scrollRef = useRef(null);

  if (!channels || channels.length === 0) return null;

  return (
    <section className="mb-8 select-none">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-border-subtle/50 pb-2 mb-4">
        <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wide">
          {title}
        </h3>
        <button
          onClick={() => onSeeAll && onSeeAll(title)}
          className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer font-body"
        >
          See All <ChevronRight size={14} />
        </button>
      </div>

      {/* Horizontal Scroll Row */}
      <div className="relative w-full">
        <div 
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto hide-scrollbar py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              variant={cardVariant}
              onSelect={onSelectChannel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
