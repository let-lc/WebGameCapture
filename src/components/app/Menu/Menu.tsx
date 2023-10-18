import React, { useState } from 'react';

import { GearIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

import SelectAudio from './SelectAudio';
import SelectLanguage from './SelectLanguage';
import SelectTheme from './SelectTheme';
import SelectVideo from './SelectVideo';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Menu = () => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="group bg-background">
                <GearIcon className="h-5 w-5 group-hover:animate-spin" />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{t('settings')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>{t('settings')}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          <SelectVideo />
          <SelectAudio />
          <SelectTheme />
          <SelectLanguage />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
