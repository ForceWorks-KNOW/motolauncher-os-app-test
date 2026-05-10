/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, SkipBack, SkipForward, Music } from 'lucide-react';

export default function MediaOverlay() {
  return (
    <div className="flex flex-col p-8 h-full justify-center">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700 shadow-lg">
          <Music className="text-accent-blue" size={28} />
        </div>
        <div className="overflow-hidden">
          <h3 className="font-bold truncate text-white uppercase tracking-tight">Thunderstruck</h3>
          <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase">AC/DC — The Razors Edge</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4">
        <button className="p-2 text-zinc-500 hover:text-white transition-colors active:scale-90">
          <SkipBack size={32} />
        </button>
        <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all">
          <Play size={36} className="text-black ml-1" fill="currentColor" />
        </button>
        <button className="p-2 text-zinc-500 hover:text-white transition-colors active:scale-90">
          <SkipForward size={32} />
        </button>
      </div>
    </div>
  );
}
