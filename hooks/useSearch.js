'use client';
import { useState, useMemo, useEffect } from 'react';

export function useSearch(channels) {
  const [query, setRawQuery]            = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [fifaOnly, setFifaOnly]         = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // null = all

  // Debounce search query by 200ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  const results = useMemo(() => {
    let filtered = channels;
    if (fifaOnly) filtered = filtered.filter(c => c.isFifaChannel);
    if (activeCategory) filtered = filtered.filter(c => c.category === activeCategory);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.group && c.group.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [channels, debouncedQuery, fifaOnly, activeCategory]);

  const grouped = useMemo(() => {
    return results.reduce((acc, ch) => {
      (acc[ch.category] = acc[ch.category] || []).push(ch);
      return acc;
    }, {});
  }, [results]);

  return {
    query,
    setQuery: setRawQuery,
    fifaOnly,
    setFifaOnly,
    activeCategory,
    setActiveCategory,
    results,
    grouped,
  };
}
