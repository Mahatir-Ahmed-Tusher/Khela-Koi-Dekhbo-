'use client';
import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, getCategoryIcon } from '../ui/Icons';
import ChannelCard from '../channels/ChannelCard';

export default function CategoryRow({ categoryName, channels, onSeeAll }) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (!channels || channels.length === 0) return null;

  // Limit display to maximum 8 channels
  const displayedChannels = channels.slice(0, 8);

  return (
    <section className="space-y-3 select-none mb-6 group relative">
      {/* Row Header */}
      <div className="flex items-center justify-between border-b border-border-subtle/30 pb-2">
        <div className="flex items-center gap-2">
          {getCategoryIcon(categoryName, 'w-5 h-5 text-text-secondary')}
          <h3 className="font-display font-bold text-base md:text-lg text-text-primary tracking-wide uppercase">
            {categoryName}
          </h3>
          <span className="text-[10px] md:text-xs text-text-muted px-2 py-0.5 rounded-md bg-bg-secondary border border-border-subtle/50">
            {channels.length}
          </span>
        </div>
        
        {channels.length > 8 && (
          <button
            onClick={() => onSeeAll(categoryName)}
            className="text-xs font-semibold text-accent-blue hover:text-accent-blue/80 hover:underline cursor-pointer flex items-center gap-0.5"
          >
            See All <ChevronRightIcon className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Row Strip */}
      <div className="relative">
        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-lg bg-bg-secondary/95 border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer transition-opacity z-20 opacity-0 group-hover:opacity-100"
          title="Scroll Left"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Scroll Strip Content */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto flex items-center gap-4 py-2 scroll-smooth no-scrollbar scroll-snap-x"
        >
          {displayedChannels.map(channel => (
            <div key={channel.id} className="scroll-snap-align-start flex-shrink-0">
              <ChannelCard channel={channel} viewMode="grid" />
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-lg bg-bg-secondary/95 border border-border-subtle text-text-secondary hover:text-text-primary flex items-center justify-center cursor-pointer transition-opacity z-20 opacity-0 group-hover:opacity-100"
          title="Scroll Right"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
