import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface ResourceTableSkeletonProps<T> {
  columns: { header: string; accessorKey: keyof T }[]
}

export function ResourceTableSkeleton<T>({ columns }: ResourceTableSkeletonProps<T>) {
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
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={`${index}-${column.accessorKey}`}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
            <TableCell>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

