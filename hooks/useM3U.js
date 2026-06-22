'use client';
import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { parseM3U } from '../utils/m3uParser';

export function useM3U() {
  const { setChannels, setIsLoading, watchChannel, activeChannel } = useApp();

  useEffect(() => {
    async function loadPlaylists() {
      try {
        setIsLoading(true);
        // Fetch both M3Us in parallel
        const [fifaRes, picksRes] = await Promise.all([
          fetch('/IPTV-Flow-World-Cup.m3u').then(r => {
            if (!r.ok) throw new Error('Failed to load FIFA playlist');
            return r.text();
          }),
          fetch('/mahmud-picks.m3u').then(r => {
            if (!r.ok) throw new Error('Failed to load picks playlist');
            return r.text();
          })
        ]);

        const fifaChannels = parseM3U(fifaRes, 'fifa');
        const picksChannels = parseM3U(picksRes, 'picks');

        // Merge channels: FIFA channels first, then other channels
        const allChannels = [...fifaChannels, ...picksChannels];
        setChannels(allChannels);


      } catch (err) {
        console.error('Error fetching or parsing playlists:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlaylists();
  }, []);
}
