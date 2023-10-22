import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import { useDebounce, useMouse } from 'react-use';

import { useVolumeStore } from '@/hooks/useVolumeStore';

const Menu = dynamic(() => import('@/components/app/Menu'), { loading: () => null });
const ScreenshotButton = dynamic(() => import('@/components/app/ScreenshotButton'), { loading: () => null });
const FullscreenButton = dynamic(() => import('@/components/app/FullscreenButton'), { loading: () => null });
const PiPButton = dynamic(() => import('@/components/app/PictureInPictureButton'), { loading: () => null });
const VolumeControl = dynamic(() => import('@/components/app/VolumeControl'), { loading: () => null });
const Video = dynamic(() => import('@/components/app/Video'), { loading: () => null });

const HomePage = () => {
  const ref = useRef(null);
  const { docX, docY } = useMouse(ref);
  const volume = useVolumeStore((s) => s.volume);
  const [showUI, setShowUI] = useState(true);

  useDebounce(
    () => {
      setShowUI(false);
    },
    2000,
    [docX, docY, volume]
  );

  useEffect(() => {
    if (!showUI) {
      setShowUI(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docX, docY, volume]);

  return (
    <div ref={ref}>
      <Video />
      <div
        className="fixed inset-y-0 left-0 flex -translate-x-full flex-col justify-center gap-2 p-4 opacity-0 transition-all duration-300 data-[show=true]:translate-x-0 data-[show=true]:opacity-100"
        data-show={String(showUI)}
      >
        <Menu />
        <FullscreenButton />
        <PiPButton />
        <ScreenshotButton />
      </div>
      <div
        className="fixed inset-y-0 right-0 flex translate-x-full flex-col justify-center gap-2 p-4 opacity-0 transition-all duration-300 data-[show=true]:translate-x-0 data-[show=true]:opacity-100"
        data-show={String(showUI)}
      >
        <VolumeControl />
      </div>
    </div>
  );
};

export default HomePage;
