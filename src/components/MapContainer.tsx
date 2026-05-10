/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MAP_STYLES } from '../constants';
import { Location } from '../hooks/useLocation';
import { Navigation } from 'lucide-react';

const API_KEY =
  (process.env.GOOGLE_MAPS_PLATFORM_KEY as string) ||
  ((import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY as string) ||
  ((globalThis as any).GOOGLE_MAPS_PLATFORM_KEY as string) ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.length > 10;

interface MapContainerProps {
  location: Location | null;
}

export default function MapContainer({ location }: MapContainerProps) {
  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-zinc-950 border-2 border-zinc-900 p-8 text-center scrollbar-hide overflow-y-auto">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-700">
          <Navigation size={40} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Maps Setup Required</h2>
        <p className="text-zinc-500 font-bold text-xs max-w-sm mb-8 uppercase tracking-widest leading-relaxed">
          Provide your GOOGLE_MAPS_PLATFORM_KEY in the secrets menu & ensure "Maps JavaScript API" is enabled.
        </p>
        <div className="text-left text-[10px] font-bold uppercase tracking-widest space-y-3 bg-black p-6 border border-zinc-800 rounded w-full max-w-md">
          <p className="text-white flex items-center gap-2">
            <span className="text-blue-500">1.</span> Get a key: 
            <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noreferrer" className="text-blue-400 underline">Cloud Console</a>
          </p>
          <p className="text-zinc-400">2. Enable "Maps JavaScript API" for your project.</p>
          <p className="text-zinc-400">3. Open Settings (⚙️) → Secrets.</p>
          <p className="text-zinc-400">4. Add <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name.</p>
          <p className="text-zinc-400">5. Paste your key & the app will rebuild.</p>
        </div>
      </div>
    );
  }

  const center = location ? { lat: location.lat, lng: location.lng } : { lat: 37.7749, lng: -122.4194 };

  return (
    <div className="h-full w-full relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={center}
          center={center}
          defaultZoom={15}
          mapId="moto_dashboard"
          options={{
            styles: MAP_STYLES,
            disableDefaultUI: true,
            zoomControl: false,
            gestureHandling: 'greedy',
          }}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          className="h-full w-full"
        >
          {location && (
            <AdvancedMarker position={{ lat: location.lat, lng: location.lng }}>
              <Pin background="#2563eb" borderColor="#ffffff" glyphColor="#ffffff" />
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>
      
      {/* Directions Overlay */}
      <div className="absolute top-6 left-6 w-80 bg-black/80 backdrop-blur-md border border-zinc-700 p-5 rounded-lg shadow-2xl z-10">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full shadow-lg">
            <Navigation className="text-white rotate-45" size={24} fill="white" />
          </div>
          <div>
            <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">Next Turn: 0.4 mi</p>
            <h2 className="text-2xl font-bold text-white tracking-tight">HWY 101 North</h2>
          </div>
        </div>
      </div>

      {/* Map Center Marker / User Toggle */}
      <div className="absolute bottom-12 right-12 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10 active:scale-90 transition-transform cursor-pointer">
         <Navigation className="text-white" size={32} fill="white" />
      </div>

      {/* Lat/Lng overlay */}
      <div className="absolute bottom-4 left-6 bg-black/60 px-3 py-1.5 border border-zinc-800 rounded font-bold text-[10px] text-zinc-500 uppercase tracking-widest backdrop-blur-sm">
        LAT: {location?.lat.toFixed(6) || '---'} | LNG: {location?.lng.toFixed(6) || '---'}
      </div>
    </div>
  );
}
