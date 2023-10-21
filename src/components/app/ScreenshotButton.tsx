import { CameraIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useKey } from 'react-use';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ScreenshotButton = () => {
  const { t } = useTranslation();

  const handleScreenshot = () => {
    if (typeof document === 'undefined') {
      return;
    }

    const video = document.getElementById('capture-output') as HTMLVideoElement;

    if (video) {
      // create canvas
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // capture video screenshot
      let context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // create download link
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${dayjs().format("YYYY-MM-DD-HH-mm-ss-SSS")}.png`;
      link.click();
    }
  };

  useKey(' ', handleScreenshot);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="group bg-background" onClick={handleScreenshot}>
            <CameraIcon className="h-4 w-4 transition-transform group-hover:animate-accordion-up" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t('screenshot')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScreenshotButton;
