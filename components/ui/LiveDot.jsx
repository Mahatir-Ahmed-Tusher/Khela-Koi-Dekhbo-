'use client';
import React from 'react';

export default function LiveDot({ color = 'green', className = '' }) {
  const dotColorClass = color === 'red' ? 'bg-accent-red' : 'bg-live-green';
  
  return (
    <span className={`relative flex h-2.5 w-2.5 flex-shrink-0 ${className}`}>
      <span className={`animate-live-pulse absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColorClass}`}></span>
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColorClass}`}></span>
    </span>
  );
}
