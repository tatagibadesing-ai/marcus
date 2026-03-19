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
      <body className="font-[family-name:var(--font-figtree)] antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
