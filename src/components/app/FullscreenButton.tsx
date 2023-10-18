import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFullscreenStore } from '@/hooks/useFullscreenStore';

const FullscreenButton = () => {
  const { t } = useTranslation();
  const [isFullScreen, toggleFullscreen] = useFullscreenStore(useShallow((s) => [s.isFullscreen, s.toggleFullscreen]));

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="group bg-background" onClick={toggleFullscreen}>
            {isFullScreen ? (
              <ExitFullScreenIcon className="h-5 w-5 transition-transform group-hover:scale-75" />
            ) : (
              <EnterFullScreenIcon className="h-5 w-5 transition-transform group-hover:scale-125" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{t('fullscreen')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FullscreenButton;
