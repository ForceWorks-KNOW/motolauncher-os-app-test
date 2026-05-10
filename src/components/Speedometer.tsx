/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface SpeedometerProps {
  speed: number | null;
}

export default function Speedometer({ speed }: SpeedometerProps) {
  // Convert m/s to km/h
  const kmh = speed ? Math.round(speed * 3.6) : 0;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-zinc-500 text-xs tracking-[0.3em] font-bold uppercase mb-2">Current Speed</span>
      <div className="flex items-baseline">
        <motion.span 
          className="text-[110px] font-black leading-none tracking-tighter text-white"
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        >
          {kmh.toString().padStart(1, '0')}
        </motion.span>
        <span className="text-2xl text-zinc-400 ml-2 font-bold uppercase">km/h</span>
      </div>
      <div className="mt-8 flex space-x-8">
        <div className="text-center">
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-1">Heading</p>
          <p className="text-xl font-bold text-white tracking-tight">NW 312°</p>
        </div>
        <div className="text-center">
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-1">Altitude</p>
          <p className="text-xl font-bold text-white tracking-tight">420 FT</p>
        </div>
      </div>
    </div>
  );
}
