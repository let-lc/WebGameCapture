import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { usePermission } from 'react-use';
import Webcam from 'react-webcam';
import { useShallow } from 'zustand/react/shallow';

import { useToast } from '@/components/ui/use-toast';
import { useDeviceStore } from '@/hooks/useDeviceStore';
import { useFullscreenStore } from '@/hooks/useFullscreenStore';
import { useVolumeStore } from '@/hooks/useVolumeStore';

const Video = () => {
  const ref = useRef<Webcam>(null);
  const toggleFullscreen = useFullscreenStore((s) => s.toggleFullscreen);
  const volume = useVolumeStore((s) => s.volume);
  const [videoDeviceId, audioDeviceId, setAudioDeviceId] = useDeviceStore(
    useShallow((s) => [s.videoDeviceId, s.audioDeviceId, s.setAudioDeviceId])
  );
  const { t } = useTranslation();
  const { toast } = useToast();
  const videoPermission = usePermission({ name: 'camera' });
  const audioPermission = usePermission({ name: 'microphone' });

  useEffect(() => {
    if (videoDeviceId === 'disable-video') {
      setAudioDeviceId('disable-audio');
    }
  }, [setAudioDeviceId, videoDeviceId]);

  useEffect(() => {
    if (ref?.current?.video) {
      ref.current.video.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    let description;

    if (videoPermission === 'denied' && audioPermission === 'denied') {
      description = t('warning.both');
    } else if (videoPermission === 'denied') {
      description = t('warning.camera');
    } else if (audioPermission === 'denied') {
      description = t('warning.microphone');
    }

    if (description) {
      toast({ variant: 'destructive', description });
    }
  }, [toast, t, videoPermission, audioPermission]);

  if (videoDeviceId === 'disable-video') {
    return null;
  }

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
        deviceId: audioDeviceId === 'disable-audio' ? undefined : audioDeviceId,
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
      }}
    />
  );
};

export default Video;
