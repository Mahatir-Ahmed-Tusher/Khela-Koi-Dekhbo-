'use client';
import React, { useRef, useEffect } from 'react';
import { SearchIcon, SoccerBallIcon, CloseIcon } from './Icons';

export default function SearchBar({ 
  query, 
  setQuery, 
  fifaOnly, 
  setFifaOnly, 
  activeSection, 
  setActiveSection 
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
      inputRef.current.blur();
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // If not in search section, navigate there automatically
    if (activeSection !== 'search') {
      setActiveSection('search');
    }
  };

  const handleFifaToggle = () => {
    setFifaOnly(prev => {
      const next = !prev;
      if (activeSection !== 'search') {
        setActiveSection('search');
      }
      return next;
    });
  };

  return (
    <div className="relative flex items-center w-full gap-2 select-none">
      {/* Search Input Container */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted">
          <SearchIcon className="w-4 h-4" />
        </span>
        
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search channels, categories... (Press '/' to focus)"
          className="w-full pl-9 pr-8 py-2 text-sm bg-bg-primary text-text-primary placeholder-text-muted border border-border-subtle rounded-lg focus:outline-none focus:border-text-secondary/40 transition-colors"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-primary cursor-pointer"
            title="Clear search"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* FIFA Filter Toggle Button */}
      <button
        onClick={handleFifaToggle}
        className={`flex items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
          fifaOnly 
            ? 'bg-gold/15 text-gold border-gold/40' 
            : 'bg-bg-primary text-text-secondary border-border-subtle hover:text-text-primary hover:bg-bg-elevated/40'
        }`}
        title="Toggle FIFA Channels Only"
      >
        <SoccerBallIcon className={`w-5 h-5 ${fifaOnly ? 'animate-spin-slow' : ''}`} />
      </button>
    </div>
  );
}
