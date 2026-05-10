/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Map as MapIcon, Phone, ShieldAlert, Settings, X, Music } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function QuickControls({ onOpenBluetooth }: { onOpenBluetooth: () => void }) {
  const [sosActive, setSosActive] = useState(false);

  const controls = [
    { icon: Home, label: 'Home', active: false },
    { icon: MapIcon, label: 'Maps', active: true },
    { icon: Music, label: 'Media', active: false },
    { icon: Phone, label: 'Phone', active: false, onClick: onOpenBluetooth },
    { icon: Settings, label: 'System', active: false, onClick: onOpenBluetooth },
  ];

  return (
    <>
      {controls.map((item, idx) => (
        <button 
          key={idx}
          onClick={item.onClick}
          className={`flex flex-col items-center justify-center hover:bg-zinc-900 transition-colors group relative ${item.active ? 'bg-zinc-900' : ''}`}
        >
          <item.icon size={32} className={`mb-1 ${item.active ? 'text-blue-500' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${item.active ? 'text-blue-500' : 'text-zinc-500'}`}>
            {item.label}
          </span>
          {item.active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>}
        </button>
      ))}

      <button 
        onClick={() => setSosActive(true)}
        className="absolute bottom-28 right-6 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-all z-[60] active:scale-90 border-4 border-black"
      >
        <ShieldAlert size={32} />
      </button>

      <AnimatePresence>
        {sosActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-8 text-white uppercase tracking-tighter"
          >
            <div className="absolute inset-0 bg-red-600/10 animate-pulse pointer-events-none"></div>
            <ShieldAlert size={120} className="mb-8 text-red-600 animate-bounce" />
            <h1 className="text-6xl font-black mb-4">EMERGENCY SOS</h1>
            <p className="text-xl font-bold mb-12 text-center max-w-2xl text-zinc-400 tracking-widest">
              Broadcasting location to emergency contacts
            </p>
            
            <button 
              onClick={() => setSosActive(false)}
              className="flex items-center gap-4 bg-white text-black px-12 py-6 rounded-none font-bold text-2xl hover:bg-zinc-200 transition-all"
            >
              <X size={32} /> Cancel Emergency
            </button>

            <div className="mt-12 text-sm font-bold border-2 border-red-900 px-6 py-3 text-red-500 tracking-[0.3em]">
              Dispatching in 5s...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

