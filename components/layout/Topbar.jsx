'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { MenuIcon, CloseIcon } from '../ui/Icons';
import SearchBar from '../ui/SearchBar';

export default function Topbar({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  searchQuery, 
  setSearchQuery, 
  fifaOnly, 
  setFifaOnly, 
  activeSection,
  setActiveSection
}) {
  const { activeChannel } = useApp();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between w-full h-16 px-4 bg-bg-secondary/95 backdrop-blur-md border-b border-border-subtle select-none">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
        
        {/* Mobile branding */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center border border-gold/30">
            <span className="text-bg-primary font-display font-extrabold text-sm select-none">K</span>
          </div>
          <span onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }} className="font-display font-bold text-base tracking-wider text-text-primary cursor-pointer uppercase">
            Khela Koi Dekhbo?
          </span>
        </div>

        {/* Desktop Active Channel Info */}
        <div className="hidden md:flex items-center gap-2 text-xs text-text-muted">
          <span>Active:</span>
          {activeChannel ? (
            <span className="font-semibold text-text-secondary px-2 py-0.5 rounded-md bg-bg-elevated border border-border-subtle max-w-[180px] truncate">
              {activeChannel.name}
            </span>
          ) : (
            <span className="font-semibold text-text-muted">No channel selected</span>
          )}
        </div>
      </div>

      {/* Global Search Bar (Topbar Middle/Right) */}
      <div className="w-full max-w-sm md:max-w-md ml-4">
        <SearchBar 
          query={searchQuery} 
          setQuery={setSearchQuery} 
          fifaOnly={fifaOnly} 
          setFifaOnly={setFifaOnly} 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
    </header>
  );
}
