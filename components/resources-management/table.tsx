import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from 'lucide-react'

interface ResourceTableProps<T> {
  resources: T[]
  onDeleteResource: (id: string) => void
  onEditResource: (id: string) => void
  columns: { header: string; accessorKey: keyof T, style?: string }[]
}

export function ResourceTable<T extends { id: string }>({
  resources,
  onDeleteResource,
  onEditResource,
  columns
}: ResourceTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id}>
            {columns.map((column) => (
              <TableCell key={`${resource.id}-${column.accessorKey}`} className={column.style}>
                {resource[column.accessorKey] as string}
              </TableCell>
            ))}
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEditResource(resource.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDeleteResource(resource.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

