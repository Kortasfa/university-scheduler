'use client'

import { CalendarTable } from "@/components/calendar/calendar-table"
import { CalendarToolbar } from "@/components/calendar/calendar-toolbar"
import { ClassInfoDialog } from "@/components/calendar/class-info-panel"
import React, { useState } from "react"
import { useActivities, useCalendarSettings, useGroups } from "./hooks"

export default function CalendarPage() {
  const { periodTime, handleSettingsChange } = useCalendarSettings()
  const { groups } = useGroups()
  const { activities } = useActivities()
  const [selectedClass, setSelectedClass] = useState<any>(null)

  const handleCellClick = (group: string | null, time: string | null, day: string | null) => {
    console.log(group, time, day)
  }

  const handleClassUpdate = (updatedClass: any) => {
    console.log(updatedClass)
  }

  const handleClassDelete = (classToDelete: any) => {
    console.log(classToDelete)
  }

  return (
    <div className="flex flex-col">
      <CalendarToolbar
        onAddClass={() => setSelectedClass({ 
          subject: '', 
          teacher: '', 
          group: groups[0], 
          time: periodTime?.[0]?.startTime || '', 
        })}
        onSettingsChange={handleSettingsChange}
        initialSettings={periodTime}
      />
      {periodTime && (
        <CalendarTable
          activities={activities}
          groups={groups}
          selectedClass={selectedClass}
          onCellClick={handleCellClick}
          periodTime={periodTime}
        />
      )}
      <ClassInfoDialog
        classData={selectedClass}
        onClose={() => handleCellClick(null, null, null)}
        onUpdate={handleClassUpdate}
        onDelete={handleClassDelete}
      />
    </div>
  )
}

