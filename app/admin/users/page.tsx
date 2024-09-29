"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from "@/lib/data"
import { Plus, Search } from "lucide-react"
import { deleteUser, getUsers } from "@/lib/actions"
import { UsersTable } from "@/components/users/users-table"
import StudentsConfiguration from "@/components/users/configuration"
import UserForm from "@/components/users/user-form"
import Link from "next/link"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editUserId, setEditUserId] = useState<number | null>(null)

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id)
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleEditUser = (id: number) => {
    setEditUserId(id)
    setShowForm(true)
  }

  const handleAddUser = () => {
    setEditUserId(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditUserId(null)
  }

  const handleUserSubmit = () => {
    // if (editUserId) {
    //   setUsers(users.map(user => user.id === editUserId ? updatedUser : user))
    // } else {
    //   setUsers([...users, updatedUser])
    // }
    handleCloseForm()
  }

  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Users</CardTitle>
            <Button size="sm" onClick={handleAddUser}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <UsersTable 
                users={filteredUsers} 
                onDeleteUser={handleDeleteUser} 
                onEditUser={handleEditUser}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <StudentsConfiguration />
        <Card>
          <CardHeader>
            <CardTitle>Need help?</CardTitle>
            <CardDescription className="text-wrap">
              Read our documentation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/help/users"}>
              <Button size="sm" variant="secondary">
                Find "Users"
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>{editUserId ? 'Edit User' : 'Add User'}</DialogTitle>
          </DialogHeader>
          <UserForm 
            action={editUserId ? editUserId.toString() : 'add'} 
            onClose={handleCloseForm}
            onSubmit={handleUserSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}