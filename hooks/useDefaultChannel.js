'use client';

export function useDefaultChannel(allChannels) {
  if (!allChannels || allChannels.length === 0) return null;

  // 1. Try localStorage last watched stream
  if (typeof window !== 'undefined') {
    const lastId = localStorage.getItem('kk_lastWatched');
    if (lastId) {
      const found = allChannels.find(c => c.id === lastId);
      if (found) return found;
    }
  }

  // 2. Try first prioritized World Cup channel that actually exists in data
  const fifaChannels = allChannels.filter(c => c.isFifaChannel && c.fifaPriority && c.fifaPriority !== 99);
  if (fifaChannels.length > 0) {
    // Sort by fifaPriority ascending (smaller number is higher priority)
    const sorted = [...fifaChannels].sort((a, b) => a.fifaPriority - b.fifaPriority);
    return sorted[0];
  }

  // 3. Try first channel with live flag (or just the first sports channel)
  const sports = allChannels.find(c => c.category === 'Sports' || c.isFifaChannel);
  if (sports) return sports;

  // 4. Absolute fallback — first channel in list
  return allChannels[0] ?? null;
}
