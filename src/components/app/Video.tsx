import React, { useEffect, useRef, useState } from 'react';

import { SymbolIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { usePermission } from 'react-use';
import Webcam from 'react-webcam';
import { useShallow } from 'zustand/react/shallow';

import { useToast } from '@/components/ui/use-toast';
import { useDeviceStore } from '@/hooks/useDeviceStore';
import { useFullscreenStore } from '@/hooks/useFullscreenStore';
import { useVolumeStore } from '@/hooks/useVolumeStore';
import { cn } from '@/lib/utils';

const Video = () => {
  const ref = useRef<Webcam>(null);
  const [loading, setLoading] = useState(false);
  const toggleFullscreen = useFullscreenStore((s) => s.toggleFullscreen);
  const volume = useVolumeStore((s) => s.volume);
  const [videoDeviceId, audioDeviceId, setAudioDeviceId] = useDeviceStore(
    useShallow((s) => [s.videoDeviceId, s.audioDeviceId, s.setAudioDeviceId])
  );
  const { t } = useTranslation();
  const { toast } = useToast();
  const videoPermission = usePermission({ name: 'camera' });
  const audioPermission = usePermission({ name: 'microphone' });

  // Disable audio when video is disabled.
  useEffect(() => {
    if (videoDeviceId === 'disable-video') {
      setAudioDeviceId('disable-audio');
    }
  }, [setAudioDeviceId, videoDeviceId]);

  // Enable loading state when device changed.
  useEffect(() => {
    setLoading(true);
  }, [videoDeviceId, audioDeviceId]);

  // Update video volume.
  useEffect(() => {
    if (ref?.current?.video) {
      ref.current.video.volume = volume / 100;
    }
  }, [volume]);

  // Permission check.
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

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div>
      <div className={cn('pointer-events-none fixed inset-0 items-center justify-center', loading ? 'flex' : 'hidden')}>
        <div className="flex aspect-square h-16 w-16 items-center justify-center rounded bg-foreground/25">
          <SymbolIcon className="h-12 w-12 animate-spin text-foreground" />
        </div>
      </div>
      <Webcam
        ref={ref}
        id="capture-output"
        className={cn('h-screen w-screen', videoDeviceId === 'disable-video' ? 'hidden' : 'block')}
        audio={videoDeviceId === 'disable-video' || audioDeviceId === 'disable-audio'}
        screenshotQuality={1}
        screenshotFormat="image/jpeg"
        videoConstraints={{ deviceId: videoDeviceId }}
        onDoubleClick={toggleFullscreen}
        hidden={loading}
        onUserMedia={handleLoadingComplete}
        onUserMediaError={handleLoadingComplete}
        audioConstraints={{
          deviceId: audioDeviceId === 'disable-audio' ? undefined : audioDeviceId,
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        }}
      />
    </div>
  );
};

export default Video;
