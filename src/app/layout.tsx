import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '@/styles/main.scss';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wordle Clone',
  description:
    'This is a clone of the popular word game - Wordle - built with Next.js, TypeScript, Redux Toolkit, Material UI, and Sass.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
