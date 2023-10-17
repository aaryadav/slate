import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { Provider } from "@/lib/provider"

const hubot = localFont({
  src: './fonts/Hubot-Sans.woff2',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'slate',
  description: 'A shared todo list',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={hubot.className}>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
