import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface FullscreenState {
  isFullscreen: boolean;
  toggleFullscreen: VoidFunction;
}

export const useFullscreenStore = create<FullscreenState>()(
  devtools((set) => ({
    isFullscreen: false,
    toggleFullscreen: () => {
      if (typeof document === 'undefined') {
        return;
      }

      if (document.fullscreenElement) {
        document.exitFullscreen();
        set({ isFullscreen: false });
      } else {
        document.documentElement.requestFullscreen();
        set({ isFullscreen: true });
      }
    },
  }))
);
