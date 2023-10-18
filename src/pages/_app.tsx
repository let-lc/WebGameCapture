import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import Background from '@/components/app/Background';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import '@/i18n';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const WebGameCapture = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className={cn('min-h-screen', inter.className)}>
        <Component {...pageProps} />
        <Toaster />
      </main>
      <Background />
    </ThemeProvider>
  );
};

export default WebGameCapture;
