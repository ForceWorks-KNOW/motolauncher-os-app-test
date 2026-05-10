/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bluetooth, X, RefreshCw, Smartphone, Headphones, Speaker, AlertCircle } from 'lucide-react';
import { useBluetooth, BluetoothDevice } from '../hooks/useBluetooth';
import { motion, AnimatePresence } from 'motion/react';

interface BluetoothSettingsProps {
  onClose: () => void;
}

export default function BluetoothSettings({ onClose }: BluetoothSettingsProps) {
  const { devices, isScanning, error, scan, toggleConnect } = useBluetooth();

  const getIcon = (type: BluetoothDevice['type']) => {
    switch (type) {
      case 'helmet': return <Headphones size={24} />;
      case 'phone': return <Smartphone size={24} />;
      case 'speaker': return <Speaker size={24} />;
      default: return <Bluetooth size={24} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[80] bg-black flex flex-col p-8 font-sans"
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-accent-blue rounded-full">
            <Bluetooth size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Connectivity</h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">BT Audio & Call Management</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-4 hover:bg-zinc-900 transition-colors border-2 border-zinc-800"
        >
          <X size={32} />
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-950/20 border border-red-900 text-red-500 flex items-center gap-3">
          <AlertCircle size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Paired Devices */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em]">Device History</h2>
            <button 
              onClick={scan}
              className={`flex items-center gap-2 text-accent-blue font-bold text-xs uppercase tracking-widest ${isScanning ? 'animate-pulse' : ''}`}
            >
              <RefreshCw size={14} className={isScanning ? 'animate-spin' : ''} />
              {isScanning ? 'Searching...' : 'Scan New'}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {devices.map(device => (
              <button 
                key={device.id}
                onClick={() => toggleConnect(device.id)}
                className={`w-full flex items-center justify-between p-6 border-2 transition-all active:scale-[0.98] ${
                  device.connected 
                    ? 'border-accent-blue bg-accent-blue/10' 
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={device.connected ? 'text-accent-blue' : 'text-zinc-600'}>
                    {getIcon(device.type)}
                  </div>
                  <div className="text-left">
                    <div className="font-bold uppercase tracking-tight text-lg">{device.name}</div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${device.connected ? 'text-accent-blue' : 'text-zinc-500'}`}>
                      {device.connected ? 'Connected' : 'Disconnected'}
                    </div>
                  </div>
                </div>
                {device.connected && (
                  <div className="w-3 h-3 bg-accent-blue rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Tips / Status */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-white font-bold uppercase tracking-tight text-xl mb-4">Helmet Pairing</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Ensure your communicator is in <span className="text-white font-bold">Pairing Mode</span>. This usually involves holding the phone button for 5 seconds until lights flash red/blue.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-500">
                <div className="w-1.5 h-1.5 bg-accent-blue rounded-full"></div>
                <span className="text-[10px] uppercase font-bold tracking-widest">Auto-connect enabled</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-500">
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></div>
                <span className="text-[10px] uppercase font-bold tracking-widest">A2DP Audio Stream Active</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-8 border-t border-zinc-800 flex items-center justify-between">
            <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter">
              BT Address: 4A:FC:02:88:11:09
            </div>
            <div className="px-3 py-1 bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
              v1.4.2
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
