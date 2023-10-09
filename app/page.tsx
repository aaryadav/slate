import { Content } from "@/components/content"
import { Welcome } from "@/components/welcome"

import { getCurrentUser } from "@/lib/session"

export default async function Home() {

  const user = await getCurrentUser()

  if (!user) {
    return (
      <>
        <Welcome />
      </>
    )
  }

  return (
    <div className="homepage">
      <Content signedInUser={user} />
    </div>
  )
}
