/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useLocation } from './hooks/useLocation';
import MapContainer from './components/MapContainer';
import Speedometer from './components/Speedometer';
import WeatherWidget from './components/WeatherWidget';
import MediaOverlay from './components/MediaOverlay';
import QuickControls from './components/QuickControls';
import BluetoothSettings from './components/BluetoothSettings';
import { Battery, Satellite, Signal, Clock, AlertCircle, Bluetooth } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const { location, error } = useLocation();
  const [time, setTime] = useState(new Date());
  const [bluetoothOpen, setBluetoothOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white font-sans select-none overflow-hidden">
      
      {/* System Bar */}
      <header className="h-12 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950 z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-zinc-400" />
            <span className="text-sm font-bold tracking-widest text-white">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">78°F / CLEAR</span>
        </div>

        <div className="flex items-center space-x-6">
          <Bluetooth 
            size={16} 
            className="text-accent-blue cursor-pointer hover:scale-110 transition-transform" 
            onClick={() => setBluetoothOpen(true)}
          />
          <div className="flex items-center space-x-1">
            <div className="w-1 h-3 bg-accent-green"></div>
            <div className="w-1 h-3 bg-accent-green"></div>
            <div className="w-1 h-3 bg-accent-green"></div>
            <div className="w-1 h-3 bg-zinc-700"></div>
            <span className="text-[10px] ml-1 uppercase font-bold text-zinc-400">LTE</span>
          </div>
          <div className="flex items-center space-x-2 border border-zinc-700 px-2 py-0.5 rounded">
            <span className="text-[10px] font-bold text-zinc-200">84%</span>
            <div className="w-4 h-2 bg-accent-green rounded-sm"></div>
            <Battery size={12} className="text-zinc-500" />
          </div>
        </div>
      </header>

      {/* Main Interface Grid */}
      <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        
        {/* Navigation / Map Block */}
        <section className="col-span-8 relative bg-zinc-900 border-r border-zinc-800 overflow-hidden">
          <MapContainer location={location} />
          
          {/* Directions Overlay (Simplified integration of previous error check if any) */}
          {error && (
            <div className="absolute bottom-6 left-6 right-6 bg-red-950/80 backdrop-blur-md border border-red-900 p-4 rounded-lg flex items-center gap-3 text-red-500 z-10">
              <AlertCircle size={20} />
              <div className="text-[10px] font-bold leading-tight uppercase">
                SYSTEM ERROR: {error}
              </div>
            </div>
          )}
        </section>

        {/* Telemetry & Media Sidebar */}
        <aside className="col-span-4 flex flex-col bg-zinc-950">
          
          {/* Speedometer Section */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 border-b border-zinc-800">
            <Speedometer speed={location?.speed || null} />
          </div>

          {/* Media Info / Mini Player Section */}
          <div className="h-64 flex flex-col justify-center bg-zinc-900/30">
            <MediaOverlay />
          </div>

          {/* Weather / Stats Section */}
          <div className="p-8 border-t border-zinc-800 mt-auto">
            <WeatherWidget />
          </div>
        </aside>
      </main>

      {/* Navigation Bar (Large Glove-Friendly Buttons) */}
      <nav className="h-24 bg-black border-t border-zinc-800 grid grid-cols-5 divide-x divide-zinc-800">
        <QuickControls onOpenBluetooth={() => setBluetoothOpen(true)} />
      </nav>

      <AnimatePresence>
        {bluetoothOpen && (
          <BluetoothSettings onClose={() => setBluetoothOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

