import { UserWithTasks as User } from "@/types"
import { Content } from "@/components/content"
import { Welcome } from "@/components/welcome"


import { getCurrentUser } from "@/lib/session"

export default async function Home() {

  const user = await getCurrentUser() as User;

  return (
    <div className="homepage">
      <Content signedInUser={user} />
    </div>
  )
}
