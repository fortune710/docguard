import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import './globals.css'
import PWALoader from './pwa-loader'
import QueryParamProvider from './query-param-provider'
import TanstackQueryProvider from './query-provider'

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter' 
})

export const metadata: Metadata = {
  title: 'DocGuard',
  description: 'Your personal documents, in one click!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <QueryParamProvider>
      <TanstackQueryProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
          <Toaster/>
          <PWALoader/>
        </html>
      </TanstackQueryProvider>
    </QueryParamProvider>
  )
}
