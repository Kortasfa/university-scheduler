"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { PeriodTime } from "@/components/calendar/calendar-settings"
import { getActivitiesAction, getCalendarSettings, getGroupsAction, insertCalendarSettings } from "./actions"
import { ActivityData, GroupData } from "@/components/calendar/calendar-table"
import { getStartOfWeek } from "@/components/calendar/utils"

export function useCalendarSettings() {
  const { toast } = useToast()
  const [periodTime, setCalendarSettings] = useState<PeriodTime[] | null>(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getCalendarSettings()
        if (settings) {
          setCalendarSettings(settings.periods)
        } else if (isFirstLoad) {
          setCalendarSettings([])
          toast({
            title: "No calendar settings found",
            description: "Please configure your calendar settings to get started."
          })
        }
      } catch (error) {
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

  const handleSettingsChange = async (newSettings: PeriodTime[]) => {
    try {
      await insertCalendarSettings(newSettings)
      setCalendarSettings(newSettings)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update calendar settings",
        variant: "destructive"
      })
      const settings = await getCalendarSettings()
      setCalendarSettings(settings.periods)
    }
  }

  return { periodTime, handleSettingsChange }
}

export function useGroups() {
  const { toast } = useToast()
  const [groups, setGroups] = useState<GroupData[]>([])
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const groupsData = await getGroupsAction()
        if (groupsData.error) {
          toast({
            title: "Error",
            description: groupsData.message,
            variant: "destructive"
          })
        } else {
          setGroups(groupsData.resources ?? [])
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load groups",
          variant: "destructive"
        })
      } finally {
        setIsFirstLoad(false)
      }
    }
    loadGroups()
  }, [isFirstLoad])

  return { groups }
} 

export function useActivities() {
  const { toast } = useToast()
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const activitiesData = await getActivitiesAction(getStartOfWeek())
        if (activitiesData.error) {
          toast({
            title: "Error",
            description: activitiesData.message,
            variant: "destructive"
          })
        } else {
          setActivities(activitiesData.resources ?? [])
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load activities",
          variant: "destructive"
        })
      } finally {
        setIsFirstLoad(false)
      }
    }
    loadActivities()
  }, [isFirstLoad])

  return { activities }
}
