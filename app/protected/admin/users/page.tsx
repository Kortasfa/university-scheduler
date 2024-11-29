"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search } from 'lucide-react'
import { deleteUser } from "@/lib/actions"
import { UsersTable, UserTableView } from "@/components/users/users-table"
import { UsersTableSkeleton } from "@/components/users/users-table-skeleton"
import StudentsConfiguration from "@/components/users/configuration"
import UserForm from "@/components/users/user-form"
import Link from "next/link"
import { useUsers } from "@/hooks/use-users"

export default function UsersPage() {
  const { users, setUsers, loading } = useUsers()
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editUserId, setEditUserId] = useState<number | null>(null)

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div className="rounded-md border">
                {loading ? (
                  <UsersTableSkeleton />
                ) : (
                  <UsersTable
                    users={filteredUsers}
                    onDeleteUser={handleDeleteUser}
                    onEditUser={handleEditUser}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Sidebar />
      <UserFormDialog
        open={showForm}
        onOpenChange={setShowForm}
        editUserId={editUserId}
        onClose={handleCloseForm}
      />
    </div>
  )
}

function Sidebar() {
  return (
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
  )
}

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editUserId: number | null
  onClose: () => void
}

function UserFormDialog({ open, onOpenChange, editUserId, onClose }: UserFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>{editUserId ? 'Edit User' : 'Add User'}</DialogTitle>
        </DialogHeader>
        <UserForm
          action={editUserId ? editUserId.toString() : 'add'}
          onClose={onClose}
          onSubmit={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

