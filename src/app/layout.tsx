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
    'Clone of the well-known word game called Wordle. This version has been developed using Next.js, Redux Toolkit, Material UI, and Sass.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
