import type { Metadata } from 'next'
import { Figtree, Sora } from 'next/font/google'
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Combo PRF - Sistema Completo de Estudos',
  description: 'Os materiais de estudos com sistema completo para PRF que já formou a base da preparação de quem saiu do zero e foi aprovado.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);` }} />
        <link rel="preload" href="https://scripts.converteai.net/33a2c9eb-c966-45b1-8b36-227d94140e0e/players/69c473bb5341b955f71d2407/v4/player.js" as="script" />
        <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
        <link rel="preload" href="https://cdn.converteai.net/33a2c9eb-c966-45b1-8b36-227d94140e0e/69c4731c449496c3a0b3f553/main.m3u8" as="fetch" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />
      </head>
      <body className="font-[family-name:var(--font-figtree)] antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
