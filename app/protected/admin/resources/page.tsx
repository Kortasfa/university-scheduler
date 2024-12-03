"use client"

import { deleteResourceAction, getGroupsAction, getUsersAction } from "./actions"
import { ResourcePage } from "@/components/resources-management/page"
import { UserForm } from "@/components/resources-management/users/form"
import { GroupForm } from "@/components/resources-management/groups/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { GROUP_COLUMNS } from "@/styles/constants"
import { USER_COLUMNS } from "@/styles/constants"

export default function ResourcesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'users'

  useEffect(() => {
    if (!searchParams.get('tab')) {
      router.replace('/protected/admin/resources?tab=users')
    }
  }, [searchParams, router])


  return (
    <div className="space-y-4">
      <Tabs 
        value={tab} 
        onValueChange={(value) => router.push(`/protected/admin/resources?tab=${value}`)}
      >
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <ResourcePage
            resourceName="Users"
            fetchResources={getUsersAction}
            deleteResource={(id) => deleteResourceAction(id, "user")}
            ResourceForm={UserForm}
            columns={USER_COLUMNS}
            helpUrl="/help/users"
          />
        </TabsContent>
        <TabsContent value="groups">
          <ResourcePage
            resourceName="Groups"
            fetchResources={getGroupsAction}
            deleteResource={(id) => deleteResourceAction(id, "group")}
            ResourceForm={GroupForm}
            columns={GROUP_COLUMNS}
            helpUrl="/help/groups"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}



