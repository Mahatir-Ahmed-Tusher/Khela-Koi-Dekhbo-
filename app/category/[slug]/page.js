'use client';
import React, { use, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useM3U } from '../../../hooks/useM3U';
import { useSearch } from '../../../hooks/useSearch';
import Sidebar from '../../../components/layout/Sidebar';
import Topbar from '../../../components/layout/Topbar';
import MobileBottomNav from '../../../components/layout/MobileBottomNav';
import VideoPlayer from '../../../components/player/VideoPlayer';
import ChannelGrid from '../../../components/channels/ChannelGrid';
import { getCategoryIcon } from '../../../components/ui/Icons';
import Link from 'next/link';

function slugToCategory(slug) {
  const decoded = decodeURIComponent(slug);
  const map = {
    'fifa-world-cup-2026': 'FIFA World Cup 2026',
    'fifa-special': 'FIFA Special',
    'sports': 'Sports',
    'bangladesh': 'Bangladesh',
    'indian-entertainment': 'Indian Entertainment',
    'movies': 'Movies',
    'music': 'Music',
    'kids': 'Kids',
    'india-news': 'India News',
    'religious': 'Religious',
    'business': 'Business',
    'general': 'General',
    'lifestyle': 'Lifestyle',
    'documentary': 'Documentary',
    'comedy': 'Comedy',
    'legislative': 'Legislative',
  };
  return map[decoded.toLowerCase()] || decoded;
}

export default function CategoryPage({ params }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const categoryName = slugToCategory(slug);

  // Initialize playlist fetching
  useM3U();

  const { 
    channels, 
    isLoading, 
    activeChannel,
    viewMode,
    setViewMode,
    toast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('category');

  // Search & Filter state hooks (needed by Topbar search)
  const { 
    query, 
    setQuery, 
    fifaOnly, 
    setFifaOnly, 
    results 
  } = useSearch(channels);

  const filteredChannels = React.useMemo(() => {
    return channels.filter(c => c.category.toLowerCase() === categoryName.toLowerCase());
  }, [channels, categoryName]);

  return (
    <div className="flex w-full min-h-screen bg-bg-primary text-text-primary font-body">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeSection="category"
        setActiveSection={setActiveSection}
        activeCategory={categoryName}
        setActiveCategory={() => {}}
      />

      {/* Main Content & Video Panel Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        <Topbar 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          searchQuery={query}
          setSearchQuery={setQuery}
          fifaOnly={fifaOnly}
          setFifaOnly={setFifaOnly}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="flex-1 flex flex-col xl:flex-row min-w-0 overflow-y-auto">
          {/* Main Browse Panel */}
          <main className="flex-1 p-4 md:p-6 min-w-0 overflow-y-auto max-w-full">
            {isLoading ? (
              <div className="space-y-4 animate-pulse select-none">
                <div className="h-6 w-32 bg-bg-secondary rounded-md" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(col => (
                    <div key={col} className="w-[160px] h-[190px] bg-bg-card border border-border-subtle rounded-xl flex-shrink-0" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(categoryName, 'w-5 h-5 text-text-secondary')}
                      <h2 className="font-display font-bold text-xl text-text-primary uppercase tracking-wide">
                        {categoryName}
                      </h2>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      Showing all {filteredChannels.length} channels in this category
                    </p>
                  </div>

                  <Link
                    href="/"
                    className="text-xs font-semibold text-accent-blue hover:underline cursor-pointer"
                  >
                    ← Back to Home
                  </Link>
                </div>

                <ChannelGrid channels={filteredChannels} />
              </div>
            )}
          </main>

          {/* Right Video Player Panel */}
          <div className="w-full xl:w-[400px] 2xl:w-[460px] xl:border-l border-border-subtle bg-bg-secondary/40 p-4 md:p-6 flex flex-col justify-start xl:sticky xl:top-0 h-auto xl:h-[calc(100vh-64px)] overflow-y-auto">
            <div className="sticky top-0 z-20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-text-primary tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-live-green animate-pulse"></span>
                  Live Player Frame
                </span>
              </div>

              <VideoPlayer channelsList={filteredChannels} />

              {activeChannel ? (
                <div className="p-4 bg-bg-card border border-border-subtle rounded-xl select-none space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="overflow-hidden">
                      <h3 className="font-display font-bold text-base text-text-primary truncate">
                        {activeChannel.name}
                      </h3>
                      <p className="text-[11px] text-text-secondary mt-0.5 truncate">
                        {activeChannel.group}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-text-muted break-all font-mono p-2 bg-bg-primary rounded-lg border border-border-subtle/50 select-text">
                    {activeChannel.url}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-bg-card border border-border-subtle rounded-xl text-text-muted">
                  <p className="text-sm font-medium">Select a channel card to view stream info</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Tab bar */}
      <MobileBottomNav 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Custom Toast Notifications System */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-bg-secondary text-text-primary text-xs font-semibold tracking-wide border border-border-subtle/80 backdrop-blur-md rounded-xl select-none flex items-center gap-2 z-50">
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
