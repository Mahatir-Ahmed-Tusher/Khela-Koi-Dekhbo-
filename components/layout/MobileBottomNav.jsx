'use client';
import React from 'react';
import { HomeIcon, SearchIcon, StarIcon, TVIcon } from '../ui/Icons';
import { useApp } from '../../context/AppContext';

export default function MobileBottomNav({ activeSection, setActiveSection, setMobileMenuOpen }) {
  const { favorites } = useApp();

  const navTabs = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
    { id: 'search', label: 'Search', icon: <SearchIcon className="w-5 h-5" /> },
    { id: 'favorites', label: 'Favorites', icon: <StarIcon className="w-5 h-5" />, badge: favorites.length }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-bg-secondary/95 backdrop-blur-md border-t border-border-subtle flex items-center justify-around z-40 select-none pb-safe">
      {navTabs.map(tab => {
        const isActive = activeSection === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSection(tab.id);
              setMobileMenuOpen(false);
            }}
            className={`relative flex flex-col items-center justify-center w-16 h-full gap-1 cursor-pointer transition-all ${isActive ? 'text-gold' : 'text-text-secondary hover:text-text-primary'}`}
          >
            {tab.icon}
            <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="absolute top-2 right-3 min-w-4 h-4 px-1 rounded-md bg-accent-red text-white text-[9px] font-bold flex items-center justify-center border border-bg-secondary select-none">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
      
      {/* Categories Toggle Tab */}
      <button
        onClick={() => setMobileMenuOpen(prev => !prev)}
        className="flex flex-col items-center justify-center w-16 h-full gap-1 cursor-pointer text-text-secondary hover:text-text-primary"
      >
        <TVIcon className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wide">Categories</span>
      </button>
    </nav>
  );
}
