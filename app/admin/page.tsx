import { redirect } from "next/navigation"
import { getSession, logoutUser, getAllUsers } from "@/app/actions/auth"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddAdminForm } from "@/components/add-admin-form"

export default async function AdminPage() {
  const session = await getSession()

  // Check if user is logged in and is an admin
  if (!session || !session.isAdmin) {
    redirect("/admin/users")
  }

  const users = await getAllUsers()

  // Debug users in the admin page
  console.log("All users:", users)
  console.log(
    "Regular users:",
    users.filter((user) => !user.isAdmin),
  )
  console.log(
    "Admin users:",
    users.filter((user) => user.isAdmin),
  )

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <form action={logoutUser}>
          <Button type="submit" variant="outline">
            Logout
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>College/University</TableHead>
                    <TableHead>Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    .filter((user) => !user.isAdmin)
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phoneNumber}</TableCell>
                        <TableCell>{user.college}</TableCell>
                        <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  {users.filter((user) => !user.isAdmin).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No users registered yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <AddAdminForm />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Added Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users
                .filter((user) => user.isAdmin)
                .map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.fullName}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.createdAt.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              {users.filter((user) => user.isAdmin).length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No admin users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

