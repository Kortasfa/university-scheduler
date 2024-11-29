'use client'

import { ClassInfoPanel } from "@/components/calendar/class-info-panel";
import { Card } from "@/components/ui/card";
import { DAYS, GROUPS, TIMES, SCHEDULE_DATA } from "@/mock/shedule-table";
import React, { useState } from "react";

interface ClassData {
  subject: string;
  teacher: string;
  group: string;
  time: string;
  day: string;
}

const getSubjectColor = (subject: string): string => {
  const hash = subject.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 75%, var(--subject-bg-lightness, 95%))`;
}

export default function CalendarPage() {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Card className="relative">
          <div className="overflow-auto max-h-[calc(100vh-8rem)]">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-background">
                  <th className="border p-2 text-left font-medium bg-background">Classes</th>
                  <th className="border p-2 text-left font-medium bg-background">Time</th>
                  {DAYS.map((day) => (
                    <th key={day} className="border p-2 text-left font-medium bg-background">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GROUPS.map((group) => (
                  <React.Fragment key={group}>
                    {TIMES.map((time, timeIndex) => (
                      <tr key={`${group}-${time}`}>
                        {timeIndex === 0 && (
                          <td rowSpan={TIMES.length} className="border p-2 align-middle text-center font-medium w-20">
                            {group}
                          </td>
                        )}
                        <td className="border p-2 text-center whitespace-nowrap w-32">{time}</td>
                        {DAYS.map((day) => {
                          const classData = SCHEDULE_DATA[group]?.[time]?.[day]
                          return (
                            <td key={`${group}-${time}-${day}`} className="border p-2 w-40 h-20">
                              {classData && (
                                <div
                                  className="p-2 rounded h-full flex flex-col justify-center items-center text-center cursor-pointer"
                                  style={{ backgroundColor: getSubjectColor(classData.subject) }}
                                  onClick={() => setSelectedClass({ ...classData, group, time, day })}
                                >
                                  <div className="font-medium text-lg">{classData.subject}</div>
                                  <div className="text-sm text-gray-600">{classData.teacher}</div>
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <ClassInfoPanel classData={selectedClass} onClose={() => setSelectedClass(null)} />
      </div>
    </div>
  )
}

