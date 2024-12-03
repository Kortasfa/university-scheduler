import { DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ResourceFormDialogProps {
  resourceName: string
  ResourceForm: React.ComponentType<{ action: string; onClose: () => void; onSubmit: () => void }>
  editResourceId: string | null
  onClose: () => void
}

export function ResourceFormDialog({
  resourceName,
  ResourceForm,
  editResourceId,
  onClose
}: ResourceFormDialogProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{editResourceId ? `Edit ${resourceName.slice(0, -1)}` : `Add ${resourceName.slice(0, -1)}`}</DialogTitle>
      </DialogHeader>
      <ResourceForm
        action={editResourceId ? editResourceId.toString() : 'add'}
        onClose={onClose}
        onSubmit={onClose}
      />
    </>
  )
}

