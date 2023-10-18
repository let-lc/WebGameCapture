import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface VolumeState {
  volume: number;
  setVolume: (volume: number) => void;
}

export const useVolumeStore = create<VolumeState>()(
  devtools(
    persist(
      (set) => ({
        volume: 100,
        setVolume: (volume) => set({ volume }),
      }),
      {
        name: 'volume',
      }
    )
  )
);
