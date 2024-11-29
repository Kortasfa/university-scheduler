import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react';

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
}

export function ClassInfoPanel({ classData, onClose }: ClassInfoPanelProps) {
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 overflow-auto transition-transform duration-250 ease-in-out ${
        classData ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <Card className="h-full border-l rounded-none">
        <CardHeader className="sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <CardTitle>Class Information</CardTitle>
            <X className="cursor-pointer" onClick={onClose} />
          </div>
        </CardHeader>
        <CardContent>
          {classData && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Subject</h3>
                <p>{classData.subject}</p>
              </div>
              <div>
                <h3 className="font-semibold">Teacher</h3>
                <p>{classData.teacher}</p>
              </div>
              <div>
                <h3 className="font-semibold">Group</h3>
                <p>{classData.group}</p>
              </div>
              <div>
                <h3 className="font-semibold">Time</h3>
                <p>{classData.time}</p>
              </div>
              <div>
                <h3 className="font-semibold">Day</h3>
                <p>{classData.day}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
