import { useState } from 'react';

import dynamic from 'next/dynamic';

import { useDebounce } from 'react-use';

const Menu = dynamic(() => import('@/components/app/Menu'), { loading: () => null });
const ScreenshotButton = dynamic(() => import('@/components/app/ScreenshotButton'), { loading: () => null });
const FullscreenButton = dynamic(() => import('@/components/app/FullscreenButton'), { loading: () => null });
const PiPButton = dynamic(() => import('@/components/app/PictureInPictureButton'), { loading: () => null });
const VolumeControl = dynamic(() => import('@/components/app/VolumeControl'), { loading: () => null, ssr: false });
const Video = dynamic(() => import('@/components/app/Video'), { loading: () => null });

const HomePage = () => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  useDebounce(
    () => {
      setShowLeft(false);
      setShowRight(false);
    },
    2000,
    [showLeft, showRight]
  );

  return (
    <div>
      <Video />
      <div onMouseOver={() => setShowLeft(true)} className="peer fixed inset-y-0 left-0 w-16" />
      <div
        className="fixed inset-y-0 left-0 flex -translate-x-full flex-col justify-center gap-2 p-4 opacity-0 transition-all duration-300 hover:translate-x-0 hover:opacity-100 data-[show=true]:translate-x-0 data-[show=true]:opacity-100"
        data-show={String(showLeft)}
      >
        <Menu />
        <FullscreenButton />
        <PiPButton />
        <ScreenshotButton />
      </div>
      <div onMouseOver={() => setShowRight(true)} className="peer fixed inset-y-0 right-0 w-16" />
      <div
        className="fixed inset-y-0 right-0 flex translate-x-full flex-col justify-center gap-2 p-4 opacity-0 transition-all duration-300 hover:translate-x-0 hover:opacity-100 data-[show=true]:translate-x-0 data-[show=true]:opacity-100"
        data-show={String(showRight)}
      >
        <VolumeControl />
      </div>
    </div>
  );
};

export default HomePage;
