import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Trash2 } from 'lucide-react'

interface ClassInfoDialogProps {
  classData: any | null
  onClose: () => void
  onUpdate: (updatedClass: any) => void
  onDelete: (classToDelete: any) => void
}

export function ClassInfoDialog({
  classData,
  onClose,
  onUpdate,
  onDelete
}: ClassInfoDialogProps) {
  const [editedClass, setEditedClass] = useState<any | null>(null)

  useEffect(() => {
    setEditedClass(classData)
  }, [classData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedClass) {
      setEditedClass({ ...editedClass, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedClass) {
      onUpdate(editedClass)
      onClose()
    }
  }

  const handleDelete = () => {
    if (editedClass) {
      onDelete(editedClass)
      onClose()
    }
  }

  return (
    <Dialog open={!!classData} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {classData?.subject ? 'Edit Class' : 'Add New Class'}
          </DialogTitle>
        </DialogHeader>
        {editedClass && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={editedClass.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                name="teacher"
                value={editedClass.teacher}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group">Group</Label>
              <Input
                id="group"
                name="group"
                value={editedClass.group}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={editedClass.time}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Input
                id="day"
                name="day"
                value={editedClass.day}
                readOnly
                className="bg-muted"
              />
            </div>
          </form>
        )}
        <DialogFooter className="flex sm:justify-between">
          <div className="flex w-full gap-2">
            <Button type="submit" className="flex-1" onClick={handleSubmit}>
              {classData?.subject ? 'Update Class' : 'Add Class'}
            </Button>
            {classData?.subject && (
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}