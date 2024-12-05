"use client"

import { deleteResourceAction, getGroupsAction } from "../actions"
import { ResourcePage } from "@/components/resources-management/page"
import { GroupForm } from "@/components/resources-management/groups/form"
import { GROUP_COLUMNS } from "@/styles/constants"

export default function GroupsPage() {
  return (
    <ResourcePage
      resourceName="Groups"
      fetchResources={getGroupsAction}
      deleteResource={(id) => deleteResourceAction(id, "group")}
      ResourceForm={GroupForm}
      columns={GROUP_COLUMNS}
      helpUrl="/help/groups"
    />
  )
}
