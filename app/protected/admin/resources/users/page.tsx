"use client"

import { deleteResourceAction, getUsersAction } from "../actions"
import { ResourcePage } from "@/components/resources-management/page"
import { UserForm } from "@/components/resources-management/users/form"
import { USER_COLUMNS } from "@/styles/constants"

export default function UsersPage() {
  return (
    <ResourcePage
      resourceName="Users"
      fetchResources={getUsersAction}
      deleteResource={(id) => deleteResourceAction(id, "user")}
      ResourceForm={UserForm}
      columns={USER_COLUMNS}
      helpUrl="/help/users"
    />
  )
}
