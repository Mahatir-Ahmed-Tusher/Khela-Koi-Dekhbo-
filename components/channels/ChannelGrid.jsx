'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import ChannelCard from './ChannelCard';
import { TVIcon } from '../ui/Icons';

export default function ChannelGrid({ channels, title }) {
  const { viewMode } = useApp();

  if (!channels || channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-bg-secondary border border-border-subtle text-center text-text-secondary select-none">
        <TVIcon className="w-10 h-10 mb-2 text-text-muted" />
        <p className="font-medium text-sm">No channels found</p>
        <p className="text-xs text-text-muted mt-1">Try refining your search query or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wider">
          {title}
        </h3>
      )}

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {channels.map(channel => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-w-3xl">
          {channels.map(channel => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
}
