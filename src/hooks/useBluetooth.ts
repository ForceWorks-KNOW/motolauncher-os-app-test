/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';

export interface BluetoothDevice {
  id: string;
  name: string;
  connected: boolean;
  type: 'helmet' | 'speaker' | 'phone' | 'generic';
}

export function useBluetooth() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([
    { id: '1', name: 'Cardo Packtalk Edge', connected: false, type: 'helmet' },
    { id: '2', name: 'Sena 50S', connected: false, type: 'helmet' },
    { id: '3', name: 'Pixel 8 Pro', connected: true, type: 'phone' },
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = useCallback(async () => {
    setIsScanning(true);
    setError(null);
    try {
      // @ts-ignore
      if (navigator.bluetooth) {
        // This is a simplified simulation since actual device discovery 
        // requires specific service UUIDs and user gestures.
        // In a real device, we would call navigator.bluetooth.requestDevice()
        setTimeout(() => {
          setIsScanning(false);
        }, 3000);
      } else {
        throw new Error('Bluetooth not supported on this browser');
      }
    } catch (err: any) {
      setError(err.message);
      setIsScanning(false);
    }
  }, []);

  const toggleConnect = useCallback((id: string) => {
    setDevices(prev => prev.map(d => 
      d.id === id ? { ...d, connected: !d.connected } : d
    ));
  }, []);

  return { devices, isScanning, error, scan, toggleConnect };
}
