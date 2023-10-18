import React, { useEffect, useRef } from 'react';

import Webcam from 'react-webcam';
import { useShallow } from 'zustand/react/shallow';

import { useDeviceStore } from '@/hooks/useDeviceStore';
import { useFullscreenStore } from '@/hooks/useFullscreenStore';
import { useVolumeStore } from '@/hooks/useVolumeStore';

const Video = () => {
  const ref = useRef<Webcam>(null);
  const toggleFullscreen = useFullscreenStore((s) => s.toggleFullscreen);
  const [volume, setVolume] = useVolumeStore(useShallow((s) => [s.volume, s.setVolume]));
  const [videoDeviceId, audioDeviceId] = useDeviceStore(useShallow((s) => [s.videoDeviceId, s.audioDeviceId]));

  useEffect(() => {
    if (ref?.current?.video) {
      ref.current.video.volume = volume / 100;
    }
  }, [volume]);

  return (
    <Webcam
      ref={ref}
      id="capture-output"
      className="h-screen w-screen"
      audio
      screenshotQuality={1}
      screenshotFormat="image/jpeg"
      videoConstraints={{ deviceId: videoDeviceId }}
      onDoubleClick={toggleFullscreen}
      audioConstraints={{
        deviceId: audioDeviceId,
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
      }}
    />
  );
};

export default Video;
