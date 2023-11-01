import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BrightnessState {
  brightness: number;
  setBrightness: (brightness: number) => void;
}

export const useBrightnessStore = create<BrightnessState>()(
  devtools(
    persist(
      (set) => ({
        brightness: 1,
        setBrightness: (brightness) => set({ brightness }),
      }),
      {
        name: 'brightness',
      }
    )
  )
);
