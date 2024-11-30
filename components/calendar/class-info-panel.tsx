import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Trash2 } from 'lucide-react';

interface ClassData {
  subject: string;
  teacher: string;
  group: string;
  time: string;
  day: string;
}

interface ClassInfoPanelProps {
  classData: ClassData | null;
  onClose: () => void;
  onUpdate: (updatedClass: ClassData) => void;
  onDelete: (classToDelete: ClassData) => void;
}

export function ClassInfoPanel({ classData, onClose, onUpdate, onDelete }: ClassInfoPanelProps) {
  const [editedClass, setEditedClass] = useState<ClassData | null>(null);

  useEffect(() => {
    setEditedClass(classData);
  }, [classData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedClass) {
      setEditedClass({ ...editedClass, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedClass) {
      onUpdate(editedClass);
    }
  };

  const handleDelete = () => {
    if (editedClass) {
      onDelete(editedClass);
    }
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 overflow-auto transition-all duration-300 ease-in-out ${
        classData ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <Card className="h-full border-l rounded-none">
        <CardHeader className="sticky top-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              {classData?.subject ? 'Edit Class' : 'Add New Class'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editedClass && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-lg font-medium">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={editedClass.subject}
                  onChange={handleInputChange}
                  required
                  className="text-lg py-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher" className="text-lg font-medium">Teacher</Label>
                <Input
                  id="teacher"
                  name="teacher"
                  value={editedClass.teacher}
                  onChange={handleInputChange}
                  required
                  className="text-lg py-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group" className="text-lg font-medium">Group</Label>
                <Input
                  id="group"
                  name="group"
                  value={editedClass.group}
                  readOnly
                  className="text-lg py-2 bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-lg font-medium">Time</Label>
                <Input
                  id="time"
                  name="time"
                  value={editedClass.time}
                  readOnly
                  className="text-lg py-2 bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="day" className="text-lg font-medium">Day</Label>
                <Input
                  id="day"
                  name="day"
                  value={editedClass.day}
                  readOnly
                  className="text-lg py-2 bg-input"
                />
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full mr-2" onClick={handleSubmit}>
            {classData?.subject ? 'Update Class' : 'Add Class'}
          </Button>
          {classData?.subject && (
            <Button variant="destructive" className="w-full ml-2" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

