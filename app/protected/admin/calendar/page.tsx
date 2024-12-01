'use client'

import { CalendarSettings } from "@/components/calendar/calendar-settings"
import { CalendarTable } from "@/components/calendar/calendar-table"
import { CalendarToolbar } from "@/components/calendar/calendar-toolbar"
import { ClassInfoDialog } from "@/components/calendar/class-info-panel"
import { DAYS, GROUPS, Schedule, SCHEDULE_DATA, TIMES } from "@/mock/shedule-table"
import React, { useEffect, useState } from "react"
import { getCalendarSettings, insertCalendarSettings } from "./actions"
import { useToast } from "@/hooks/use-toast"

interface ClassData {
  subject: string
  teacher: string
  group: string
  time: string
  day: string
}

export default function CalendarPage() {
  const { toast } = useToast()
  const [scheduleData, setScheduleData] = useState(SCHEDULE_DATA)
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
  const [calendarSettings, setCalendarSettings] = useState<CalendarSettings | null>(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getCalendarSettings()
        if (settings) {
          setCalendarSettings({
            periods: settings.periods.map(p => ({
              startTime: p.start_time,
              endTime: p.end_time
            })),
          })
        } else if (isFirstLoad) {
          setCalendarSettings({
            periods: [],
          })
          toast({
            title: "No calendar settings found",
            description: "Please configure your calendar settings to get started."
          })
        }
      } catch (error) {
        console.error("Failed to load calendar settings:", error)
        toast({
          title: "Error",
          description: "Failed to load calendar settings",
          variant: "destructive"
        })
      } finally {
        setIsFirstLoad(false)
      }
    }
    loadSettings()
  }, [isFirstLoad])

  const handleCellClick = (group: string | null, time: string | null, day: string | null) => {
    if (!group || !time || !day) {
      setSelectedClass(null)
      return
    }
    const classData = scheduleData[group]?.[time]?.[day] || { subject: null, teacher: null }
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

  const handleSettingsChange = async (newSettings: CalendarSettings) => {
    try {
      await insertCalendarSettings(
        newSettings.periods
      )
      setCalendarSettings(newSettings)
    } catch (error) {
      console.error("Failed to update calendar settings:", error)
      toast({
        title: "Error",
        description: "Failed to update calendar settings",
        variant: "destructive"
      })
      const settings = await getCalendarSettings()
      if (settings) {
        setCalendarSettings({
          periods: settings.periods.map(p => ({
            startTime: p.start_time,
            endTime: p.end_time
          })),
        })
      }
    }
  }

  return (
    <div className="flex flex-col">
      <CalendarToolbar
        onAddClass={() => setSelectedClass({ subject: '', teacher: '', group: GROUPS[0], time: TIMES[0], day: DAYS[0] })}
        onSearch={(query) => {
          if (!query) {
            setScheduleData(SCHEDULE_DATA);
            return;
          }

          const lowercaseQuery = query.toLowerCase();
          setScheduleData(
            Object.keys(SCHEDULE_DATA).reduce((acc: Schedule, group: string) => {
              acc[group] = {};

              // Copy over matching time slots
              Object.entries(SCHEDULE_DATA[group]).forEach(([time, timeSlots]) => {
                acc[group][time] = {};

                // Copy over matching classes
                Object.entries(timeSlots).forEach(([day, classData]) => {
                  if (
                    group.toLowerCase().includes(lowercaseQuery) ||
                    classData.subject.toLowerCase().includes(lowercaseQuery) ||
                    classData.teacher.toLowerCase().includes(lowercaseQuery)
                  ) {
                    acc[group][time][day] = classData;
                  }
                });
              });

              // Remove empty time slots
              if (Object.keys(acc[group]).length === 0) {
                delete acc[group];
              }

              return acc;
            }, {})
          );
        }}
        onSettingsChange={handleSettingsChange}
        initialSettings={calendarSettings}
      />
      <CalendarTable
        scheduleData={scheduleData}
        selectedClass={selectedClass}
        onCellClick={handleCellClick}
      />
      <ClassInfoDialog
        classData={selectedClass}
        onClose={() => handleCellClick(null, null, null)}
        onUpdate={handleClassUpdate}
        onDelete={handleClassDelete}
      />
    </div>
  )
}

