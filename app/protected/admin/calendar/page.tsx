'use client'

import { ClassInfoPanel } from "@/components/calendar/class-info-panel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DAYS, GROUPS, SCHEDULE_DATA, TIMES } from "@/mock/shedule-table"
import React, { useState } from "react"

interface ClassData {
  subject: string
  teacher: string
  group: string
  time: string
  day: string
}

const getSubjectColor = (subject: string): string => {
  const hash = subject.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  const hue = Math.abs(hash % 360)
  return `hsl(${hue}, 75%, var(--subject-bg-lightness, 95%))`
}

export default function CalendarPage() {
  const [scheduleData, setScheduleData] = useState(SCHEDULE_DATA)
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)

  const handleCellClick = (group: string, time: string, day: string) => {
    const classData = scheduleData[group]?.[time]?.[day] || { subject: '', teacher: '' }
    setSelectedClass({ ...classData, group, time, day })
  }

  const handleClassUpdate = (updatedClass: ClassData) => {
    setScheduleData(prevData => {
      const newData = { ...prevData }
      if (!newData[updatedClass.group]) newData[updatedClass.group] = {}
      if (!newData[updatedClass.group][updatedClass.time]) newData[updatedClass.group][updatedClass.time] = {}
      newData[updatedClass.group][updatedClass.time][updatedClass.day] = {
        subject: updatedClass.subject,
        teacher: updatedClass.teacher
      }
      return newData
    })
    setSelectedClass(null)
  }

  const handleClassDelete = (classToDelete: ClassData) => {
    setScheduleData(prevData => {
      const newData = { ...prevData }
      if (newData[classToDelete.group]?.[classToDelete.time]?.[classToDelete.day]) {
        delete newData[classToDelete.group][classToDelete.time][classToDelete.day]
      }
      return newData
    })
    setSelectedClass(null)
  }

  return (
    <div className="flex space-x-4">
      <div className="flex-1 overflow-auto">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table containerClassname="h-fit max-h-[calc(100vh-8rem)] overflow-y-auto relative">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-20 text-left font-medium border-r">Classes</TableHead>
                <TableHead className="w-32 text-left font-medium border-r">Time</TableHead>
                {DAYS.map((day, index) => (
                  <TableHead key={day} className={`w-40 text-left font-medium ${index !== DAYS.length - 1 ? 'border-r' : ''}`}>
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {GROUPS.map((group) => (
                <React.Fragment key={group}>
                  {TIMES.map((time, timeIndex) => (
                    <TableRow key={`${group}-${time}`} className="hover:bg-background">
                      {timeIndex === 0 && (
                        <TableCell rowSpan={TIMES.length} className="align-middle text-center font-medium border-r">
                          {group}
                        </TableCell>
                      )}
                      <TableCell className="text-center whitespace-nowrap border-r">{time}</TableCell>
                      {DAYS.map((day, dayIndex) => {
                        const classData = scheduleData[group]?.[time]?.[day]
                        const isSelected = selectedClass?.group === group &&
                          selectedClass?.time === time &&
                          selectedClass?.day === day
                        return (
                          <TableCell
                            key={`${group}-${time}-${day}`}
                            className={`h-20 cursor-pointer transition-all duration-300 ease-in-out
                              ${isSelected ? 'ring-4 ring-primary ring-opacity-50 scale-105 z-10' : ''}
                              ${dayIndex !== DAYS.length - 1 ? 'border-r' : ''}
                            `}
                            onClick={() => handleCellClick(group, time, day)}
                          >
                            {classData ? (
                              <div
                                className="p-2 rounded h-full flex flex-col justify-center items-center text-center transition-transform duration-300 ease-in-out hover:scale-105"
                                style={{ backgroundColor: getSubjectColor(classData.subject) }}
                              >
                                <div className="font-medium text-lg">{classData.subject}</div>
                                <div className="text-sm text-muted-foreground">{classData.teacher}</div>
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center text-muted-foreground transition-opacity duration-300 ease-in-out opacity-50 hover:opacity-100">
                                Click to add
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <ClassInfoPanel
        classData={selectedClass}
        onClose={() => setSelectedClass(null)}
        onUpdate={handleClassUpdate}
        onDelete={handleClassDelete}
      />
    </div>
  )
}

