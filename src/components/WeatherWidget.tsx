/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

export default function WeatherWidget() {
  // Mock weather data
  const weather = {
    temp: 24,
    condition: 'SUNNY',
    wind: 12,
    location: 'CLEAR'
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-1">Condition</p>
          <div className="text-xl font-bold text-white tracking-tight">{weather.condition}</div>
        </div>
        <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center border border-zinc-700">
          <Sun className="text-zinc-400" size={24} />
        </div>
      </div>
      
      <div className="flex items-center space-x-8">
        <div>
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-1">Temperature</p>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-white">{weather.temp}</span>
            <span className="text-lg text-zinc-500 ml-1">°C</span>
          </div>
        </div>
        <div>
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mb-1">Wind Speed</p>
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-white">{weather.wind}</span>
            <span className="text-sm text-zinc-500 ml-1">KPH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
