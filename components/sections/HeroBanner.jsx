'use client';
import React, { useState, useEffect } from 'react';
import ServerSelector from '../channels/ServerSelector';

const BACKGROUND_IMAGES = [
  '/fifa-26.webp',
  '/sports-1.jpeg',
  '/fifa-26-mobile.jpg'
];

export default function HeroBanner({
  channels,
  activeChannel,
  onSelectChannel
}) {
  const [bgIndex, setBgIndex] = useState(0);

  // Background image rotation logic (6s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[380px] md:h-[420px] rounded-2xl overflow-hidden mb-8 select-none">
      {/* Background Image Carousel */}
      {BACKGROUND_IMAGES.map((img, index) => (
        <div
          key={img}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === bgIndex ? 0.35 : 0,
            zIndex: 1
          }}
        />
      ))}

      {/* Dark Overlay for Text Readability */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(8,8,16,0.92) 0%, rgba(8,8,16,0.6) 60%, rgba(8,8,16,0.3) 100%)'
        }}
      />

      <div className="relative z-[3] flex flex-col justify-center h-full w-full px-8 md:px-12 max-w-[55%] gap-1.5">
        <span className="font-display text-[13px] font-bold tracking-wider text-accent-live uppercase">
          FIFA WORLD CUP 2026
        </span>
        <h1 className="font-display font-black text-[46px] md:text-[52px] leading-[0.9] text-text-primary uppercase tracking-wide">
          WATCH NOW
        </h1>
        <p className="font-body text-[14px] md:text-[15px] text-text-secondary">
          Stream World Cup & live sports in HD. Tap below to launch servers instantly.
        </p>

        {/* Server Selector inside hero */}
        <div className="mt-4 w-full">
          <ServerSelector
            channels={channels}
            activeChannel={activeChannel}
            onSelect={onSelectChannel}
          />
        </div>
      </div>
    </section>
  );
}
