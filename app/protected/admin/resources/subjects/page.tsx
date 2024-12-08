"use client"

import { deleteResourceAction } from "../actions"
import { ResourcePage } from "@/components/resources-management/page"
import { SubjectForm } from "@/components/resources-management/subjects/form"
import { SUBJECT_COLUMNS } from "@/styles/constants"
import { getSubjectsAction } from "./actions"

export default function SubjectsPage() {
  return (
    <ResourcePage
      resourceName="Subjects"
      fetchResources={getSubjectsAction}
      deleteResource={(id) => deleteResourceAction(id, "subject")}
      ResourceForm={SubjectForm}
      columns={SUBJECT_COLUMNS}
      helpUrl="/help/subjects"
    />
  )
}
