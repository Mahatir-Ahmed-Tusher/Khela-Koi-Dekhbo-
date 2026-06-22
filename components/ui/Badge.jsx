'use client';
import React from 'react';

const CATEGORY_COLORS = {
  'FIFA World Cup 2026': 'bg-gold/10 text-gold border-gold/20',
  'FIFA Special':        'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Sports':              'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Bangladesh':          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Indian Entertainment':'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Movies':              'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Music':               'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Kids':                'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'India News':          'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'Religious':           'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Business':            'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'General':             'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'Lifestyle':           'bg-lime-500/10 text-lime-400 border-lime-500/20',
  'Documentary':         'bg-stone-500/10 text-stone-400 border-stone-500/20',
  'Comedy':              'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Legislative':         'bg-slate-400/10 text-slate-300 border-slate-400/20',
};

export default function Badge({ text, className = '' }) {
  const colorClass = CATEGORY_COLORS[text] || 'bg-bg-elevated text-text-secondary border-border-subtle';
  
  return (
    <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${colorClass} ${className} select-none`}>
      {text}
    </span>
  );
}
