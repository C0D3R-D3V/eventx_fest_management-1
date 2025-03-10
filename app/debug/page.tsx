// A debug page to view all users in the system
import { getAllUsers } from "@/app/actions/auth"

export default async function DebugPage() {
  const users = await getAllUsers()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Debug: All Users</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[80vh]">{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}

