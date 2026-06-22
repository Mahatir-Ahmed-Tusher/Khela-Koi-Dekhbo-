'use client';
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import ServerSelector from '../channels/ServerSelector';

const BACKGROUND_IMAGES = [
  '/fifa-26.webp',
  '/sports-1.jpeg',
  '/fifa-26-mobile.jpg'
];

export default function MobileHero({ channels, activeChannel, onSelectChannel }) {
  const [bgIndex, setBgIndex] = useState(0);

  // Background image rotation logic (6s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleStartWatchingDefault = () => {
    if (!channels || channels.length === 0) return;
    // T Sports or TSN
    const tsn1 = channels.find(c => c.name.toLowerCase().includes('tsn 1'));
    const tsports = channels.find(c => c.name.toLowerCase().includes('t sports'));
    const defaultCh = tsn1 || tsports || channels[0];
    if (defaultCh) {
      onSelectChannel(defaultCh);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-bg-surface flex flex-col justify-end p-5 pt-8 min-h-[220px] select-none border-b border-border-subtle/50">
      {/* Background Image Carousel */}
      {BACKGROUND_IMAGES.map((img, index) => (
        <div
          key={img}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === bgIndex ? 0.35 : 0,
            zIndex: 1,
            filter: 'brightness(0.6) contrast(1.1)'
          }}
        />
      ))}

      {/* Linear & Radial Overlay for smooth blending into void background */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.4) 65%, transparent 100%)',
        }}
      />
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(8,8,16,0.8) 100%)'
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 space-y-3.5 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-live animate-ping" />
            <span className="font-display text-[9px] font-extrabold tracking-widest text-accent-live uppercase">
              LIVE FIFA WORLD CUP
            </span>
          </div>

          <button
            onClick={handleStartWatchingDefault}
            className="flex items-center gap-1 px-3 py-1 bg-accent-gold text-bg-void text-[9px] font-bold tracking-wider rounded-lg uppercase font-display active:scale-95 transition-all shadow-gold cursor-pointer"
          >
            <Play size={8} fill="currentColor" />
            Quick Watch
          </button>
        </div>
        
        <div className="space-y-1">
          <h2 className="font-display font-black text-2xl leading-none uppercase text-text-primary tracking-wide">
            Khela Koi Dekhbo?
          </h2>
          <p className="text-[11px] text-text-secondary font-body max-w-[280px]">
            Stream World Cup & live sports in HD. Tap below to launch servers instantly.
          </p>
        </div>

        {/* Server Selector inside hero */}
        <div className="w-full pt-1">
          <ServerSelector
            channels={channels}
            activeChannel={activeChannel}
            onSelect={onSelectChannel}
          />
        </div>
      </div>
    </div>
  );
}
