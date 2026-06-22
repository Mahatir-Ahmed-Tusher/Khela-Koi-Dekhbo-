'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useM3U } from '../hooks/useM3U';
import { useDefaultChannel } from '../hooks/useDefaultChannel';

// Layout & Navigation
import MobileHeader from '../components/layout/MobileHeader';
import DesktopNav from '../components/layout/DesktopNav';
import BottomNav from '../components/layout/BottomNav';

// Components
import VideoPlayer from '../components/player/VideoPlayer';
import ServerSelector from '../components/channels/ServerSelector';
import CategoryTabBar from '../components/channels/CategoryTabBar';
import ChannelCard from '../components/channels/ChannelCard';
import CategoryStrip from '../components/sections/CategoryStrip';
import HeroBanner from '../components/sections/HeroBanner';
import MobileHero from '../components/sections/MobileHero';
import NowLiveList from '../components/channels/NowLiveList';
import FifaWorldCupWidget from '../components/sections/FifaWorldCupWidget';

export default function Home() {
  useM3U();
  const { channels, activeChannel, watchChannel, isLoading, favorites } = useApp();

  const [activeSection, setActiveSection] = useState('home'); // 'home' | 'category' | 'favorites'
  const [activeCategory, setActiveCategory] = useState(null);

  // Responsive state to prevent double mounting of player frames
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mobile navigation tabs & state
  const [mobileTab, setMobileTab] = useState('LIVE');
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Detect window width client-side
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-resolve default channel
  const defaultChannel = useDefaultChannel(channels);
  useEffect(() => {
    if (!isMobile && channels.length > 0 && !activeChannel && defaultChannel) {
      watchChannel(defaultChannel);
    }
  }, [channels, activeChannel, defaultChannel, watchChannel, isMobile]);

  // Search filter logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return channels;
    const query = searchQuery.toLowerCase();
    return channels.filter(c => 
      c.name.toLowerCase().includes(query) || 
      (c.category && c.category.toLowerCase().includes(query)) ||
      (c.group && c.group.toLowerCase().includes(query))
    );
  }, [channels, searchQuery]);

  // Map favorites list
  const favoriteChannels = useMemo(() => {
    return favorites
      .map(id => channels.find(c => c.id === id))
      .filter(Boolean);
  }, [favorites, channels]);

  // Mobile active tab channels
  const mobileFilteredChannels = useMemo(() => {
    if (mobileTab === 'LIVE' || mobileTab === 'SPORTS') {
      const filtered = channels.filter(c => c.category === 'FIFA World Cup 2026' || c.category === 'Sports');
      return [...filtered].sort((a, b) => {
        const pA = a.fifaPriority ?? 999;
        const pB = b.fifaPriority ?? 999;
        return pA - pB;
      });
    }
    if (mobileTab === 'BD') {
      return channels.filter(c => c.category === 'Bangladesh');
    }
    if (mobileTab === 'MOVIES') {
      return channels.filter(c => c.category === 'Movies');
    }
    if (mobileTab === 'NEWS') {
      return channels.filter(c => c.category === 'India News');
    }
    return channels; // ALL
  }, [channels, mobileTab]);

  // Desktop active live channels sorted by priority
  const desktopLiveChannels = useMemo(() => {
    const filtered = channels.filter(c => c.category === 'FIFA World Cup 2026' || c.category === 'Sports');
    return [...filtered].sort((a, b) => {
      const pA = a.fifaPriority ?? 999;
      const pB = b.fifaPriority ?? 999;
      return pA - pB;
    });
  }, [channels]);

  const handleSeeAllCategory = (title) => {
    setActiveSection('category');
    if (title === 'LIVE SPORTS') {
      setActiveCategory('Sports');
    } else if (title === 'BANGLADESH') {
      setActiveCategory('Bangladesh');
    } else if (title === 'ENTERTAINMENT') {
      setActiveCategory('Indian Entertainment');
    } else if (title === 'MOVIES') {
      setActiveCategory('Movies');
    } else {
      setActiveCategory(title);
    }
  };

  const handleSelectChannel = (ch) => {
    watchChannel(ch);
    localStorage.setItem('kk_lastWatched', ch.id);
  };

  // If loading or server/client mismatch rendering loading screen
  if (!mounted || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-void select-none gap-4">
        <div className="w-12 h-12 border-2 border-accent-gold border-t-transparent animate-spin rounded-full" />
        <p className="font-display font-bold text-sm tracking-wider uppercase text-text-secondary">
          Loading Channels...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-void text-text-primary">
      
      {/* ====================================================
          1. MOBILE VIEW (isMobile matches)
          ==================================================== */}
      {isMobile ? (
        <div className="flex flex-col min-h-screen pb-[56px] relative">
          <MobileHeader 
            onSearchToggle={() => setSearchOpen(true)}
            onSettingsToggle={() => setSettingsOpen(true)}
          />

          {/* Sticky Category Pill Selector */}
          <CategoryTabBar 
            activeSection={activeSection}
            activeCategory={activeCategory}
            onSelectTab={(sec, cat) => {
              setActiveSection(sec);
              setActiveCategory(cat);
            }}
          />
          
          {/* Mobile Hero Banner - Slideshow and selector (only when no active channel) */}
          {!activeChannel && (
            <MobileHero 
              channels={channels}
              activeChannel={activeChannel}
              onSelectChannel={handleSelectChannel}
            />
          )}

          {/* Inline Video Player (if channel is chosen) - scrollable, not sticky, full width */}
          {activeChannel && (
            <div className="w-full border-b border-border-subtle bg-black shadow-lg">
              <VideoPlayer 
                channel={activeChannel} 
                channelsList={mobileFilteredChannels}
                onClose={() => watchChannel(null)}
                className="w-full" 
              />
            </div>
          )}

          {/* Server Selector directly below the player (if channel is chosen) */}
          {activeChannel && (
            <div className="mb-2">
              <ServerSelector 
                channels={channels}
                activeChannel={activeChannel}
                onSelect={handleSelectChannel}
              />
            </div>
          )}

          {/* Mobile Main Feed / Details */}
          <main className="flex-1 p-4 bg-bg-void">
            {activeSection === 'home' && (
              <div className="space-y-6">
                {/* FIFA World Cup Hub Widget (with schedule & times) */}
                <FifaWorldCupWidget onSelectChannel={handleSelectChannel} />

                <CategoryStrip 
                  title="LIVE SPORTS"
                  channels={channels.filter(c => c.category === 'FIFA World Cup 2026' || c.category === 'Sports')}
                  onSeeAll={handleSeeAllCategory}
                  onSelectChannel={handleSelectChannel}
                  cardVariant="mobile-inline"
                />

                <CategoryStrip 
                  title="BANGLADESH"
                  channels={channels.filter(c => c.category === 'Bangladesh')}
                  onSeeAll={handleSeeAllCategory}
                  onSelectChannel={handleSelectChannel}
                  cardVariant="mobile-inline"
                />

                <CategoryStrip 
                  title="ENTERTAINMENT"
                  channels={channels.filter(c => c.category === 'Indian Entertainment' || c.category === 'General')}
                  onSeeAll={handleSeeAllCategory}
                  onSelectChannel={handleSelectChannel}
                  cardVariant="mobile-inline"
                />

                <CategoryStrip 
                  title="MOVIES"
                  channels={channels.filter(c => c.category === 'Movies')}
                  onSeeAll={handleSeeAllCategory}
                  onSelectChannel={handleSelectChannel}
                  cardVariant="mobile-inline"
                />
              </div>
            )}

            {activeSection === 'category' && activeCategory && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border-subtle/50 pb-2">
                  <h3 className="font-display font-bold text-base text-text-primary uppercase tracking-wide">
                    {activeCategory === 'Sports' ? 'LIVE SPORTS' :
                     activeCategory === 'Indian Entertainment' ? 'ENTERTAINMENT' :
                     activeCategory}
                  </h3>
                  <button
                    onClick={() => setActiveSection('home')}
                    className="text-xs text-accent-gold hover:underline cursor-pointer"
                  >
                    &larr; Back
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {channels.filter(c => {
                    if (activeCategory === 'Sports') {
                      return c.category === 'Sports' || c.category === 'FIFA World Cup 2026';
                    }
                    if (activeCategory === 'Indian Entertainment') {
                      return c.category === 'Indian Entertainment' || c.category === 'General';
                    }
                    return c.category === activeCategory;
                  }).map(c => (
                    <ChannelCard key={c.id} channel={c} variant="mobile" onSelect={handleSelectChannel} />
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'favorites' && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base text-text-primary uppercase tracking-wide">
                  Favorites
                </h3>
                {favoriteChannels.length === 0 ? (
                  <p className="text-xs text-text-muted font-body">No favorites added yet.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {favoriteChannels.map(c => (
                      <ChannelCard 
                        key={c.id} 
                        channel={c} 
                        variant="mobile" 
                        onSelect={handleSelectChannel} 
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* Fixed Bottom Navigation */}
          <BottomNav 
            activeSection={activeSection}
            setActiveSection={(sec) => {
              setActiveSection(sec);
              if (sec === 'search') setSearchOpen(true);
            }}
            onSearchToggle={() => setSearchOpen(true)}
            onSettingsToggle={() => setSettingsOpen(true)}
          />
        </div>
      ) : (
        /* ====================================================
            2. DESKTOP VIEW
            ==================================================== */
        <div className="flex flex-col min-h-screen bg-bg-void relative">
          <DesktopNav 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onSearchToggle={() => setDesktopSearchOpen(!desktopSearchOpen)}
            onSettingsToggle={() => setSettingsOpen(true)}
          />

          <div className="flex-1 flex max-w-7xl mx-auto w-full px-8 py-8 gap-8">
            {/* Left Panel Browse Section */}
            <main className="w-[55%] flex flex-col min-w-0">
              {activeSection === 'home' && (
                <>
                  <HeroBanner 
                    channels={channels}
                    activeChannel={activeChannel}
                    onSelectChannel={handleSelectChannel}
                  />

                  {/* FIFA World Cup Hub Widget (with schedule & times) */}
                  <FifaWorldCupWidget onSelectChannel={handleSelectChannel} />

                  {/* Category Strips */}
                  {favoriteChannels.length > 0 && (
                    <CategoryStrip 
                      title="Your Favorites"
                      channels={favoriteChannels}
                      onSeeAll={() => setActiveSection('favorites')}
                      onSelectChannel={handleSelectChannel}
                    />
                  )}

                  <CategoryStrip 
                    title="LIVE SPORTS"
                    channels={channels.filter(c => c.category === 'FIFA World Cup 2026' || c.category === 'Sports')}
                    onSeeAll={handleSeeAllCategory}
                    onSelectChannel={handleSelectChannel}
                  />

                  <CategoryStrip 
                    title="BANGLADESH"
                    channels={channels.filter(c => c.category === 'Bangladesh')}
                    onSeeAll={handleSeeAllCategory}
                    onSelectChannel={handleSelectChannel}
                  />

                  <CategoryStrip 
                    title="ENTERTAINMENT"
                    channels={channels.filter(c => c.category === 'Indian Entertainment' || c.category === 'General')}
                    onSeeAll={handleSeeAllCategory}
                    onSelectChannel={handleSelectChannel}
                  />

                  <CategoryStrip 
                    title="MOVIES"
                    channels={channels.filter(c => c.category === 'Movies')}
                    onSeeAll={handleSeeAllCategory}
                    onSelectChannel={handleSelectChannel}
                  />
                </>
              )}

              {activeSection === 'category' && activeCategory && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border-subtle/50 pb-2">
                    <h2 className="font-display font-bold text-2xl text-text-primary uppercase tracking-wide">
                      {activeCategory === 'Sports' ? 'LIVE SPORTS' :
                       activeCategory === 'Indian Entertainment' ? 'ENTERTAINMENT' :
                       activeCategory}
                    </h2>
                    <button
                      onClick={() => setActiveSection('home')}
                      className="text-xs text-accent-gold hover:underline cursor-pointer"
                    >
                      &larr; Back to Home
                    </button>
                  </div>
                  <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                    {channels.filter(c => {
                      if (activeCategory === 'Sports') {
                        return c.category === 'Sports' || c.category === 'FIFA World Cup 2026';
                      }
                      if (activeCategory === 'Indian Entertainment') {
                        return c.category === 'Indian Entertainment' || c.category === 'General';
                      }
                      return c.category === activeCategory;
                    }).map(c => (
                      <ChannelCard key={c.id} channel={c} variant="desktop" onSelect={handleSelectChannel} />
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'favorites' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border-subtle/50 pb-2">
                    <h2 className="font-display font-bold text-2xl text-text-primary uppercase tracking-wide">
                      Your Favorites
                    </h2>
                    <button
                      onClick={() => setActiveSection('home')}
                      className="text-xs text-accent-gold hover:underline cursor-pointer"
                    >
                      &larr; Back to Home
                    </button>
                  </div>
                  {favoriteChannels.length === 0 ? (
                    <p className="text-sm text-text-muted py-4 font-body">No favorites added yet.</p>
                  ) : (
                    <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                      {favoriteChannels.map(c => (
                        <ChannelCard key={c.id} channel={c} variant="desktop" onSelect={handleSelectChannel} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </main>

            {/* Right Panel Sticky Rail */}
            <aside className="w-[45%] shrink-0 sticky top-24 self-start flex flex-col gap-6">
              <div className="bg-bg-surface border border-border-subtle/50 rounded-2xl p-4 space-y-4">
                <VideoPlayer 
                  channel={activeChannel} 
                  channelsList={channels} 
                  onClose={() => watchChannel(null)}
                  className="rounded-xl border border-border-subtle/50" 
                />
                
                {activeChannel && (
                  <div className="px-1 py-0.5">
                    <h3 className="font-body text-[14px] font-semibold text-text-primary truncate" title={activeChannel.name}>
                      {activeChannel.name}
                    </h3>
                    <span className="font-display text-[11px] text-text-muted uppercase tracking-wider block mt-0.5">
                      {activeChannel.fifaBadge || activeChannel.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Now Live feeds */}
              <div className="bg-bg-surface border border-border-subtle/50 rounded-2xl p-4">
                <NowLiveList 
                  channels={desktopLiveChannels} 
                  activeChannel={activeChannel}
                  onSelect={handleSelectChannel}
                />
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* ====================================================
          3. SHARED OVERLAYS & DIALOGS
          ==================================================== */}

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-bg-void/98 backdrop-blur-md z-50 flex flex-col p-4 animate-in fade-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle/50">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none text-sm font-body"
              autoFocus
            />
            <button 
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="text-xs text-text-secondary hover:text-text-primary px-2 font-body cursor-pointer shrink-0"
            >
              Close
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto mt-4 hide-scrollbar">
            {searchResults.length === 0 ? (
              <p className="text-center text-xs text-text-muted mt-8 font-body">No matching channels found</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 pb-8">
                {searchResults.map((c) => (
                  <ChannelCard 
                    key={c.id} 
                    channel={c} 
                    variant="mobile" 
                    onSelect={(ch) => { 
                      handleSelectChannel(ch); 
                      setSearchOpen(false); 
                    }} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Search Dropdown */}
      {desktopSearchOpen && (
        <div className="absolute right-24 top-16 w-80 bg-bg-surface border border-border-subtle/80 rounded-xl shadow-card z-50 p-4 select-none">
          <input
            type="text"
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-elevated text-text-primary placeholder:text-text-muted border border-border-subtle rounded-lg px-3 py-2 text-xs font-body focus:outline-none focus:border-accent-gold"
            autoFocus
          />
          <div className="mt-3 max-h-60 overflow-y-auto flex flex-col gap-1.5 hide-scrollbar">
            {searchResults.slice(0, 15).map((c) => (
              <div
                key={c.id}
                onClick={() => { 
                  handleSelectChannel(c); 
                  setDesktopSearchOpen(false); 
                }}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-bg-hover cursor-pointer"
              >
                <div className="w-7 h-7 rounded bg-bg-elevated flex items-center justify-center shrink-0 border border-border-subtle/40 overflow-hidden">
                  {c.logo ? (
                    <img src={c.logo} className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="text-[9px] font-bold">{c.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-xs text-text-primary truncate font-body">{c.name}</span>
              </div>
            ))}
            {searchResults.length === 0 && (
              <p className="text-center text-[11px] text-text-muted py-2 font-body">No channels found</p>
            )}
          </div>
        </div>
      )}

      {/* Settings Dialog */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bg-surface border border-border-subtle rounded-2xl w-full max-w-sm p-6 shadow-card select-none space-y-4">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-text-primary">
              Settings & Info
            </h3>
            <div className="space-y-3 font-body text-xs text-text-secondary">
              <p>IPTV Flow World Cup: Loaded</p>
              <p>Mahmud Picks Playlist: Loaded</p>
              <p>Total Channels: {channels.length}</p>
              <p>FIFA Priority System: Active (TSN & Caze Preferred)</p>
            </div>
            <div className="pt-4 border-t border-border-subtle/50 flex flex-col gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem('kk_lastWatched');
                  localStorage.removeItem('kkd_favorites');
                  localStorage.removeItem('kkd_recent');
                  window.location.reload();
                }}
                className="w-full py-2 bg-accent-live/10 hover:bg-accent-live/20 text-accent-live border border-accent-live/20 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Reset Application Data
              </button>
              <button
                onClick={() => setSettingsOpen(false)}
                className="w-full py-2 bg-bg-elevated hover:bg-bg-hover text-text-primary border border-border-subtle rounded-lg text-xs font-semibold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
