import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"


import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { useRouter } from "next/router"
import { Welcome } from "@/components/welcome"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {

  const user = await getCurrentUser()

  return (
    <div className="container ">
      <Header />
      <div className="content-container">
        {!user ? (
          <><Welcome /></>
        ) : (
          <div className="content">
            <Sidebar />
            {children}
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}
