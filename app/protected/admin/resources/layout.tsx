import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function ResourcesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Tabs defaultValue="users">
      <TabsList>
        <TabsTrigger value="users" asChild>
          <Link href="/protected/admin/resources/users">Users</Link>
        </TabsTrigger>
        <TabsTrigger value="groups" asChild>
          <Link href="/protected/admin/resources/groups">Groups</Link>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}
