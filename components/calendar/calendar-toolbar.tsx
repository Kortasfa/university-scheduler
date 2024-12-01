'use client'

import { Search, Plus, Filter, CalendarIcon, RotateCcw, FolderOpen, Download, ZoomIn, ZoomOut, Lock, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CalendarSettingsDialog, CalendarSettings } from './calendar-settings'
import { useState } from 'react'

interface CalendarToolbarProps {
  onAddClass?: () => void
  onSearch?: (query: string) => void
  onSettingsChange: (settings: CalendarSettings) => void
  initialSettings: CalendarSettings | null
}

export function CalendarToolbar({ 
  onAddClass, 
  onSearch, 
  onSettingsChange,
  initialSettings 
}: CalendarToolbarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg bg-background mb-4">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                className="pl-8"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
            <Button onClick={onAddClass} className="gap-2">
              <Plus className="h-4 w-4" />
              Add class
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View calendar</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset view</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setSettingsOpen(true)}
            >
              Calendar settings
            </Button>
          </div>
        </TooltipProvider>
      </div>
      {initialSettings && (
        <CalendarSettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          onSave={(settings) => {
          onSettingsChange(settings)
          setSettingsOpen(false)
        }}
          initialSettings={initialSettings}
        />
      )}
    </>
  )
}

