import React from 'react';

import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const PictureInPictureButton = () => {
  const { t } = useTranslation();

  const handlePipToggle = () => {
    if (typeof document === 'undefined') {
      return;
    }

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      (document.getElementById('capture-output') as HTMLVideoElement)?.requestPictureInPicture();
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="group bg-background" onClick={handlePipToggle}>
            <ExternalLinkIcon className="h-4 w-4 -scale-y-100 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t('pictureInPicture')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PictureInPictureButton;
