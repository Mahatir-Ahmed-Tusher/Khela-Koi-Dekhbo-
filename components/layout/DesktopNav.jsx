'use client';
import React from 'react';
import { Search, Settings } from 'lucide-react';

export default function DesktopNav({
  activeSection,
  setActiveSection,
  activeCategory,
  setActiveCategory,
  onSearchToggle,
  onSettingsToggle
}) {
  const navLinks = [
    { label: 'Home', section: 'home', category: null },
    { label: 'Sports', section: 'category', category: 'Sports' },
    { label: 'Bangladesh', section: 'category', category: 'Bangladesh' },
    { label: 'Movies', section: 'category', category: 'Movies' },
    { label: 'News', section: 'category', category: 'India News' }
  ];

  return (
    <header className="hidden md:flex sticky top-0 z-50 items-center justify-between w-full h-16 px-8 bg-void/92 backdrop-blur-md border-b border-border-subtle select-none">
      {/* Brand logo & name (No Bengali, English typography on left of logo) */}
      <div 
        onClick={() => {
          setActiveSection('home');
          setActiveCategory(null);
        }}
        className="flex items-center gap-3.5 cursor-pointer active:scale-95 transition-transform"
      >
        <img 
          src="/logo.png" 
          alt="Khela Koi Dekhbo? logo" 
          className="h-8 w-auto object-contain select-none"
        />
        <span className="font-display font-black text-lg tracking-wider text-text-primary uppercase">
          Khela Koi Dekhbo?
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = 
            (link.section === 'home' && activeSection === 'home') ||
            (link.section === 'category' && activeSection === 'category' && activeCategory === link.category);
          
          return (
            <button
              key={link.label}
              onClick={() => {
                setActiveSection(link.section);
                setActiveCategory(link.category);
              }}
              className={`relative py-5 font-body text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gold" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={onSearchToggle}
          className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        <button
          onClick={onSettingsToggle}
          className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
