'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DAYS, GROUPS, Schedule } from "@/mock/shedule-table"
import React, { useState } from "react"
import { PeriodTime } from "./calendar-settings"

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

interface CalendarProps {   
  scheduleData: Schedule
  selectedClass: ClassData | null
  onCellClick: (group: string | null, time: string | null, day: string | null) => void
  calendarSettings: PeriodTime[]
}
  
export function CalendarTable({ scheduleData, selectedClass, onCellClick, calendarSettings }: CalendarProps) {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  return (
    <div className="flex space-x-4">
      <div className="flex-1 overflow-auto">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table containerClassname="h-fit max-h-[calc(100vh-13rem)] overflow-y-auto relative">
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
                calendarSettings.map((time, timeIndex) => (
                  <TableRow
                    key={`${group}-${time.startTime}-${time.endTime}`}
                    onMouseEnter={() => setHoveredGroup(group)}
                    onMouseLeave={() => setHoveredGroup(null)}
                  >
                    {timeIndex === 0 && (
                      <TableCell
                        rowSpan={calendarSettings.length}
                        className={`align-middle text-center font-medium border-r transition-colors duration-200 
                          ${hoveredGroup === group ? 'bg-muted' : ''}`}
                      >
                        {group}
                      </TableCell>
                    )}
                    <TableCell className="text-center whitespace-nowrap border-r">{time.startTime}-{time.endTime}</TableCell>
                    {DAYS.map((day, dayIndex) => {
                      const classData = scheduleData[group]?.[time.startTime]?.[day]
                      const isSelected = selectedClass?.group === group &&
                        selectedClass?.time === time.startTime &&
                        selectedClass?.day === day
                      return (
                        <TableCell
                          key={`${group}-${time}-${day}`}
                          className={`h-20 cursor-pointer transition-all duration-300 ease-in-out
                            ${isSelected ? 'ring-4 ring-primary ring-opacity-50 scale-105 z-10' : ''}
                            ${dayIndex !== DAYS.length - 1 ? 'border-r' : ''}
                          `}
                          onClick={() => onCellClick(group, time.startTime, day)}
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
                ))
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

