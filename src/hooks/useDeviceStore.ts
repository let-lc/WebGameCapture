import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface VideoState {
  videoDeviceId: string;
  setVideoDeviceId: (videoDeviceId: string) => void;
  audioDeviceId: string;
  setAudioDeviceId: (audioDeviceId: string) => void;
}

export const useDeviceStore = create<VideoState>()(
  devtools(
    persist(
      (set) => ({
        videoDeviceId: '',
        setVideoDeviceId: (videoDeviceId) => set({ videoDeviceId }),
        audioDeviceId: '',
        setAudioDeviceId: (audioDeviceId) => set({ audioDeviceId }),
      }),
      {
        name: 'input-devices',
      }
    )
  )
);
