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
        videoDeviceId: 'disable-video',
        setVideoDeviceId: (videoDeviceId) => set({ videoDeviceId }),
        audioDeviceId: 'disable-audio',
        setAudioDeviceId: (audioDeviceId) => set({ audioDeviceId }),
      }),
      {
        name: 'input-devices',
      }
    )
  )
);
