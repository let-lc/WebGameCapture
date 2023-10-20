import { GearIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
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
      <SheetContent side="left" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>{t('settings')}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          <SelectVideo />
          <SelectAudio />
          <SelectTheme />
          <SelectLanguage />
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Web Game Capture Logo" className="h-6" />
            <span className="bg-gradient-to-b from-[#1387b8] via-[#1387b8] to-[#111d2e] bg-clip-text text-xl font-bold text-transparent">
              Web Game Capture
            </span>
          </div>
          <p className="mt-2 text-sm">{t('description.p1')}</p>
          <p className="mt-2 text-sm">{t('description.p2')}</p>
          <a
            href="https://github.com/let-lc/WebGameCapture"
            rel="noopener noreferrer"
            className="mt-2 flex w-max items-center gap-x-2 hover:underline"
          >
            <GitHubLogoIcon className="h-4 w-4" />
            <span className="text-sm">{t('projectSourceCode')}</span>
          </a>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="space-y-1 text-xs">
            <p>{t('privacy.p0')}</p>
            <p>{t('privacy.p1')}</p>
            <p>{t('privacy.p2')}</p>
            <p>
              <a
                href={t('privacy.links.l1.link', {
                  defaultValue: 'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement',
                })}
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {t('privacy.links.l1.text')}
              </a>
            </p>
            <p>
              <a
                href={t('privacy.links.l2.link', {
                  defaultValue:
                    'https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection',
                })}
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {t('privacy.links.l2.text')}
              </a>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
