'use client';
import React from 'react';

const HUES = [
  'from-pink-600 to-rose-700',       // 0
  'from-purple-600 to-indigo-700',   // 1
  'from-blue-600 to-cyan-700',       // 2
  'from-teal-600 to-emerald-700',    // 3
  'from-green-600 to-lime-700',      // 4
  'from-yellow-600 to-amber-700',    // 5
  'from-orange-600 to-red-700',      // 6
  'from-fuchsia-600 to-purple-700',  // 7
  'from-indigo-600 to-blue-700',     // 8
  'from-violet-600 to-fuchsia-700',  // 9
  'from-emerald-600 to-teal-700',    // 10
  'from-cyan-600 to-sky-700',        // 11
];

export default function LogoAvatar({ name, className = 'w-12 h-12 text-sm' }) {
  const cleanName = name || '??';
  
  // Calculate initials
  const initials = cleanName
    .replace(/[^a-zA-Z0-9 ]/g, '') // remove special chars
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || cleanName.slice(0, 2).toUpperCase();

  // Compute a deterministic gradient
  const code = cleanName.charCodeAt(0) || 0;
  const gradientClass = HUES[code % HUES.length];

  // Determine rounding class
  const hasRounded = className.includes('rounded-') || className.includes('rounded ');
  const roundedClass = hasRounded ? '' : 'rounded-xl';

  return (
    <div className={`${className} ${roundedClass} flex items-center justify-center font-display font-bold text-white bg-gradient-to-br ${gradientClass} select-none flex-shrink-0 border border-border-subtle/50`}>
      {initials}
    </div>
  );
}
