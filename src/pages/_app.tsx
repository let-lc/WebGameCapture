import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

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
      <Head>
        <title>Web Game Capture</title>
        <meta name="description" content="This website is for playing your game console via video capture device without installing any game capture softwares." />
      </Head>
      <main className={cn('min-h-screen', inter.className)}>
        <Component {...pageProps} />
        <Toaster />
      </main>
      <Background />
    </ThemeProvider>
  );
};

export default WebGameCapture;
