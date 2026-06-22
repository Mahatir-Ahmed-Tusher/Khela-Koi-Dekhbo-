'use client';
import React from 'react';
import { Home, Search, Star, Settings } from 'lucide-react';

export default function BottomNav({
  activeSection,
  setActiveSection,
  onSearchToggle,
  onSettingsToggle
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => setActiveSection('home') },
    { id: 'search', label: 'Search', icon: Search, action: onSearchToggle },
    { id: 'favorites', label: 'Favorites', icon: Star, action: () => setActiveSection('favorites') },
    { id: 'settings', label: 'Settings', icon: Settings, action: onSettingsToggle }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[56px] bg-bg-surface border-t border-border-subtle flex items-center justify-around z-40 select-none pb-safe">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={item.action}
            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 cursor-pointer"
          >
            <div className={`flex flex-col items-center justify-center transition-colors ${isActive ? 'text-accent-gold' : 'text-text-muted hover:text-text-secondary'}`}>
              <Icon size={20} />
              <span className="text-[9px] font-medium tracking-wider uppercase font-body mt-1">
                {item.label}
              </span>
              {isActive && (
                <span className="w-[3px] h-[3px] rounded-full bg-accent-gold mt-1 animate-pulse" />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
