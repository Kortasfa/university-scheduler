"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from 'lucide-react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ResourceFormDialog } from "./form-dialog"
import { HelpSidebar } from "./help-sidebar"
import { useToast } from "@/hooks/use-toast"
import { ResourceTable } from "./table"
import { ResourceTableSkeleton } from "./table-skeleton"

interface ResourcePageProps<T> {
  resourceName: string
  fetchResources: () => Promise<{ error?: boolean; resources?: T[]; message?: string }>
  deleteResource: (id: string) => Promise<{ error?: boolean; resources?: T[]; message?: string }>
  ResourceForm: React.ComponentType<{ action: string; onClose: () => void; onSubmit: () => void }>
  columns: { header: string; accessorKey: keyof T }[]
  helpUrl: string
}

export function ResourcePage<T extends { id: string; name: string }>({
  resourceName,
  fetchResources,
  deleteResource,
  ResourceForm,
  columns,
  helpUrl
}: ResourcePageProps<T>) {
  const [resources, setResources] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchResources()
      if (result.error) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive"
        })
      } else if (result.resources) {
        setResources(result.resources)
      }
      setLoading(false)
    }
    fetchData()
  }, [fetchResources, toast])

  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editResourceId, setEditResourceId] = useState<string | null>(null)

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteResource = async (id: string) => {
    await deleteResource(id)
    setResources(resources.filter((resource) => resource.id !== id))
  }

  const handleEditResource = (id: string) => {
    setEditResourceId(id)
    setShowForm(true)
  }

  const handleAddResource = () => {
    setEditResourceId(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditResourceId(null)
  }

  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">{resourceName}</CardTitle>
            <Button size="sm" onClick={handleAddResource}>
              <Plus className="h-4 w-4 mr-2" />
              Add {resourceName.slice(0, -1)}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Search ${resourceName.toLowerCase()}...`}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="rounded-md border">
                {loading ? (
                  <ResourceTableSkeleton columns={columns} />
                ) : (
                  <ResourceTable
                    resources={filteredResources}
                    onDeleteResource={handleDeleteResource}
                    onEditResource={handleEditResource}
                    columns={columns}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <HelpSidebar url={helpUrl} title={`Find ${resourceName}`} />
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[825px]">
          <ResourceFormDialog
            resourceName={resourceName}
            ResourceForm={ResourceForm}
            editResourceId={editResourceId}
            onClose={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

