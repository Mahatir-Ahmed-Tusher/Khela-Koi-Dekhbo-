'use client';
import React from 'react';
import { Search, MoreVertical } from 'lucide-react';

export default function MobileHeader({ onSearchToggle, onSettingsToggle }) {
  return (
    <header className="md:hidden sticky top-0 z-40 flex items-center justify-between w-full h-[44px] px-4 bg-bg-surface border-b border-border-subtle select-none">
      {/* Brand name & logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/logo.png" 
          alt="Khela Koi Dekhbo? logo" 
          className="h-6.5 w-auto object-contain brightness-100 opacity-95 select-none"
        />
        <span className="font-display font-black text-[14px] tracking-wide text-text-primary uppercase">
          Khela Koi Dekhbo?
        </span>
      </div>

      {/* Header controls (lucide icons) */}
      <div className="flex items-center gap-4">
        <button
          onClick={onSearchToggle}
          className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer transition-colors active:scale-95"
          aria-label="Toggle search"
        >
          <Search size={18} />
        </button>

        <button
          onClick={onSettingsToggle}
          className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer transition-colors active:scale-95"
          aria-label="More options"
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </header>
  );
}
