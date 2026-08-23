import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WindowManagerProvider } from '@/contexts/WindowManagerContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shouraya Sharma · Portfolio',
  description:
    'Personal portfolio of Shouraya Sharma · developer, builder, and tech enthusiast. Explore projects, experience, and skills in an interactive macOS-style interface.',
  keywords: ['Shouraya Sharma', 'portfolio', 'developer', 'Next.js', 'TypeScript'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Shouraya Sharma · Portfolio',
    description: 'Interactive macOS-style personal portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.variable}>
        <ThemeProvider>
          <WindowManagerProvider>{children}</WindowManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
