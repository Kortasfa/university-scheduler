'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useState } from "react"
import { PeriodTime } from "./calendar-settings"
import { getCurrentWeekDays, getSubjectColor } from "./utils"

export interface GroupData {
  name: string
  id: string
}

export interface ActivityData {
  id: string
  name: string
  date: Date,
  period_id: number
  group_id: string
}

interface CalendarProps {   
  activities: ActivityData[]
  selectedClass: any | null
  onCellClick: (group: string | null, time: string | null, day: string | null) => void
  periodTime: PeriodTime[]
  groups: GroupData[]
}
  
export function CalendarTable({
  selectedClass,
  onCellClick,
  periodTime,
  groups,
  activities
}: CalendarProps) {
  const days = getCurrentWeekDays()
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  return (
    <div className="flex space-x-4">
      <div className="flex-1 overflow-auto">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table containerClassname="h-fit max-h-[calc(100vh-13rem)] overflow-y-auto relative">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-12 text-left font-medium border-r">Classes</TableHead>
                <TableHead className="w-32 text-left font-medium border-r">Time</TableHead>
                {days.map((day, index) => (
                  <TableHead key={day.date.toString()} className={`w-40 text-left font-medium ${index !== days.length - 1 ? 'border-r' : ''}`}>
                    {`${day.weekday} ${day.date.toLocaleDateString(navigator.language, {day: 'numeric', month: 'short' })}`}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                periodTime.map((time, timeIndex) => (
                  <TableRow
                    key={`${group.id}-${time.startTime}-${time.endTime}`}
                    onMouseEnter={() => setHoveredGroup(group.id)}
                    onMouseLeave={() => setHoveredGroup(null)}
                  >
                    {timeIndex === 0 && (
                      <TableCell
                        rowSpan={periodTime.length}
                        className={`p-0 align-middle text-center font-medium border-r transition-colors duration-200 
                          ${hoveredGroup === group.id ? 'bg-muted' : ''}`}
                      >
                        <div className="flex items-center justify-center h-full">
                          <span className="block transform rotate-180 [writing-mode:vertical-lr] whitespace-nowrap">
                            {group.name}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    <TableCell className="text-center whitespace-nowrap border-r">{time.startTime}-{time.endTime}</TableCell>
                    {days.map((day, dayIndex) => {
                      const activity = activities.find(a => 
                        a.group_id === group.id && 
                        a.period_id === time.periodOrder && 
                        a.date.toISOString().split('T')[0] === day.date.toISOString().split('T')[0]
                      );
                      
                      const isSelected = selectedClass?.group === group &&
                        selectedClass?.time === time.startTime &&
                        selectedClass?.day === day.weekday;

                      return (
                        <TableCell
                          key={`${group.id}-${time.startTime}-${day.date}`}
                          className={`h-20 cursor-pointer transition-all duration-300 ease-in-out
                            ${isSelected ? 'ring-4 ring-primary ring-opacity-50 scale-105 z-10' : ''}
                            ${dayIndex !== days.length - 1 ? 'border-r' : ''}
                          `}
                          onClick={() => onCellClick(group.id, time.startTime, day.weekday)}
                        >
                          {activity ? (
                            <div
                              className={styles.activityContent}
                              style={{ backgroundColor: getSubjectColor(activity.name) }}
                            >
                              <div className={styles.activityName}>{activity.name}</div>
                            </div>
                          ) : (
                            <div className={styles.emptyCell}>
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

const styles = {
  activityContent: `p-2 rounded h-full flex flex-col justify-center items-center 
  text-center transition-transform duration-300 ease-in-out hover:scale-105 bg-primary/10`,
  activityName: "font-medium text-lg",
  emptyCell: `h-full flex items-center justify-center text-muted-foreground transition-opacity 
  duration-300 ease-in-out opacity-50 hover:opacity-100`
}
