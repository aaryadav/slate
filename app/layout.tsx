import './globals.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'

import localFont from 'next/font/local'

import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Provider } from "@/lib/provider"

export const spacemono = Space_Mono({
  weight: ['400', '700'],
  variable: '--font-space-mono',
  subsets: ['latin'],
  display: 'swap',
})

const hubot = localFont({
  src: './fonts/Hubot-Sans.woff2',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'slate',
  description: 'A shared todo list',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions as any);
  return (
    <html lang="en">
      <body className={hubot.className}>
        <Provider session={session}>
          <div className="container ">
            <Header />
            <div className="content-container">
              <div className="content">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  )
}
