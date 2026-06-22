'use client';
import React, { useRef } from 'react';

const CATEGORIES = [
  { id: 'home', label: 'Home', section: 'home', category: null },
  { id: 'sports', label: 'Sports', section: 'category', category: 'Sports' },
  { id: 'bangladesh', label: 'Bangladesh', section: 'category', category: 'Bangladesh' },
  { id: 'entertainment', label: 'Entertainment', section: 'category', category: 'Indian Entertainment' },
  { id: 'movies', label: 'Movies', section: 'category', category: 'Movies' },
  { id: 'news', label: 'News', section: 'category', category: 'India News' }
];

export default function CategoryTabBar({
  activeSection,
  activeCategory,
  onSelectTab
}) {
  const containerRef = useRef(null);

  return (
    <div
      className="w-full bg-bg-void/95 backdrop-blur-md border-b border-border-subtle/50 px-4 py-3 sticky top-[44px] z-30"
    >
      <div
        ref={containerRef}
        className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar whitespace-nowrap scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((tab) => {
          // Check if active
          const isActive = 
            (tab.section === 'home' && activeSection === 'home') ||
            (tab.section === 'category' && activeSection === 'category' && activeCategory === tab.category);

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.section, tab.category)}
              className={`px-4 py-1.5 rounded-full font-body text-xs font-semibold transition-all duration-200 cursor-pointer border flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-accent-blue text-white border-accent-blue font-bold shadow-[0_2px_12px_rgba(26,111,255,0.45)] scale-[1.03]' 
                  : 'bg-bg-surface border-border-subtle/70 text-text-secondary hover:text-text-primary hover:border-text-secondary/20'
              }`}
            >
              {tab.id === 'sports' && (
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-accent-live'} animate-pulse`} />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
