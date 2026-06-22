'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [channels, setChannels]         = useState([]);       // all parsed channels
  const [activeChannel, setActiveChannel] = useState(null);   // currently playing
  const [favorites, setFavorites]       = useState([]);       // array of channel IDs
  const [recentlyWatched, setRecentlyWatched] = useState([]); // array of channel IDs (max 10)
  const [isLoading, setIsLoading]       = useState(true);
  const [viewMode, setViewMode]         = useState('grid');   // 'grid' | 'list'
  const [toast, setToast]               = useState(null);     // { message, type } toast notification

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavs    = JSON.parse(localStorage.getItem('kkd_favorites')    || '[]');
    const savedRecents = JSON.parse(localStorage.getItem('kkd_recent')       || '[]');
    const savedView    = localStorage.getItem('kkd_viewmode') || 'grid';
    setFavorites(savedFavs);
    setRecentlyWatched(savedRecents);
    setViewMode(savedView);
  }, []);

  const watchChannel = (channel) => {
    setActiveChannel(channel);
    if (!channel) return;
    // Add to recently watched (deduplicated, max 10)
    setRecentlyWatched(prev => {
      const updated = [channel.id, ...prev.filter(id => id !== channel.id)].slice(0, 10);
      localStorage.setItem('kkd_recent', JSON.stringify(updated));
      return updated;
    });
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Auto-clear toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const toggleFavorite = (channelId) => {
    setFavorites(prev => {
      const isFav = prev.includes(channelId);
      const updated = isFav
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId];
      localStorage.setItem('kkd_favorites', JSON.stringify(updated));
      showToast(isFav ? 'Removed from Favorites' : 'Added to Favorites', isFav ? 'error' : 'success');
      return updated;
    });
  };

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('kkd_viewmode', mode);
  };

  return (
    <AppContext.Provider value={{
      channels, setChannels,
      activeChannel, watchChannel,
      favorites, toggleFavorite,
      recentlyWatched, setRecentlyWatched,
      isLoading, setIsLoading,
      viewMode, setViewMode: handleSetViewMode,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
