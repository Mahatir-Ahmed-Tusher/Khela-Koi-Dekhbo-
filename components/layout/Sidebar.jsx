'use client';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HomeIcon, 
  SearchIcon, 
  StarIcon, 
  getCategoryIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '../ui/Icons';

const CATEGORY_ORDER = [
  'FIFA World Cup 2026',
  'FIFA Special',
  'Sports',
  'Bangladesh',
  'Indian Entertainment',
  'Movies',
  'India News',
  'Music',
  'Kids',
  'Religious',
  'Business',
  'General',
  'Lifestyle',
  'Documentary',
  'Comedy',
  'Legislative'
];

export default function Sidebar({ activeSection, setActiveSection, activeCategory, setActiveCategory }) {
  const { channels, favorites } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Compute category counts
  const categoryCounts = React.useMemo(() => {
    return channels.reduce((acc, ch) => {
      acc[ch.category] = (acc[ch.category] || 0) + 1;
      return acc;
    }, {});
  }, [channels]);

  const handleNavClick = (section, category = null) => {
    setActiveSection(section);
    setActiveCategory(category);
    
    // On mobile, top navbar handles close state, sidebar is desktop-only anyway
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
    { id: 'search', label: 'Search', icon: <SearchIcon className="w-5 h-5" /> },
    { id: 'favorites', label: 'Favorites', icon: <StarIcon className="w-5 h-5" />, count: favorites.length }
  ];

  return (
    <aside className={`hidden md:flex flex-col h-screen sticky top-0 bg-bg-secondary border-r border-border-subtle transition-all duration-300 z-30 select-none ${isCollapsed ? 'w-[72px]' : 'w-[220px]'}`}>
      {/* Header / Brand Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border-subtle">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center border border-gold/30">
              <span className="text-bg-primary font-display font-extrabold text-sm select-none">KKD</span>
            </div>
            <span className="font-display font-extrabold text-[15px] tracking-wide text-text-primary uppercase">Khela Koi Dekhbo?</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center border border-gold/30">
            <span className="text-bg-primary font-display font-extrabold text-sm select-none">K</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {/* Core Sections */}
        <div className="space-y-1">
          {navItems.map(item => {
            const isActive = activeSection === item.id && !activeCategory;
            const isFifa = item.id === 'fifa';
            const accentBorder = isActive 
              ? (isFifa ? 'border-l-[3px] border-gold bg-bg-elevated text-gold' : 'border-l-[3px] border-accent-blue bg-bg-elevated text-text-primary') 
              : 'border-l-[3px] border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40';

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-r-md transition-all cursor-pointer ${accentBorder}`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
                {!isCollapsed && item.count !== undefined && item.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 font-bold rounded-md bg-bg-elevated border border-border-subtle ${isActive ? 'text-text-primary border-text-secondary/20' : 'text-text-secondary'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Categories List */}
        <div>
          {!isCollapsed && (
            <div className="px-3 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Categories
            </div>
          )}
          <div className="space-y-1">
            {CATEGORY_ORDER.map(cat => {
              const count = categoryCounts[cat] || 0;
              if (count === 0) return null; // Hide categories with 0 channels

              const isActive = activeSection === 'category' && activeCategory === cat;
              const isFifa = cat.includes('FIFA');
              
              const accentBorder = isActive 
                ? (isFifa ? 'border-l-[3px] border-gold bg-bg-elevated text-gold font-semibold' : 'border-l-[3px] border-accent-blue bg-bg-elevated text-text-primary font-semibold')
                : 'border-l-[3px] border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40';

              return (
                <button
                  key={cat}
                  onClick={() => handleNavClick('category', cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-r-md transition-all cursor-pointer ${accentBorder}`}
                  title={cat}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {getCategoryIcon(cat, 'w-5 h-5 flex-shrink-0')}
                    {!isCollapsed && <span className="truncate text-left">{cat.replace('FIFA World Cup 2026', 'World Cup 26')}</span>}
                  </div>
                  {!isCollapsed && (
                    <span className={`text-[10px] px-1.5 py-0.5 font-bold rounded-md bg-bg-elevated border border-border-subtle ${isActive ? 'text-text-primary border-text-secondary/20' : 'text-text-secondary'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border-subtle text-[10px] text-text-muted select-none text-center">
          <p>© 2026 Khela Koi Dekhbo</p>
          <p className="mt-0.5">TV-Grade IPTV Player</p>
        </div>
      )}
    </aside>
  );
}
