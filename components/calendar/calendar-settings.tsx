'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DatePicker } from "@/components/ui/date-picker"
interface CalendarSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (settings: CalendarSettings) => void
  initialSettings: CalendarSettings
}

export interface PeriodTime {
  startTime: string
  endTime: string
}

export interface CalendarSettings {
  periods: PeriodTime[],
  from: Date,
  to: Date,
}

// Add form schema
const FormSchema = z.object({
  from: z.date(),
  to: z.date(),
  periods: z.array(z.object({
    startTime: z.string(),
    endTime: z.string(),
  })).min(1, "At least one period is required"),
})

export function CalendarSettingsDialog({
  open,
  onOpenChange,
  onSave,
  initialSettings
}: CalendarSettingsProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: initialSettings.from,
      to: initialSettings.to,
      periods: initialSettings.periods,
    },
  })

  const addPeriod = () => {
    const currentPeriods = form.getValues("periods")
    form.setValue("periods", [...currentPeriods, { startTime: "08:00", endTime: "08:45" }])
  }

  const removePeriod = (index: number) => {
    const currentPeriods = form.getValues("periods")
    if (currentPeriods.length <= 1) return
    form.setValue("periods", currentPeriods.filter((_, i) => i !== index))
  }

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onSave({
      from: data.from,
      to: data.to,
      periods: data.periods,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-max">
        <DialogHeader>
          <DialogTitle>Calendar Settings</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <FormControl>
                          <DatePicker date={field.value} setDate={(date) => field.onChange(date)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <DatePicker date={field.value} setDate={(date) => field.onChange(date)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="max-h-[440px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 
                scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pr-2 space-y-4"
                style={{
                  scrollbarGutter: 'stable',
                  scrollbarWidth: 'thin',
                }}>
                {form.watch("periods").map((_, index) => (
                  <div key={index} className="grid grid-cols-[auto,1fr,1fr,auto] items-center gap-4 bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                      {index + 1}
                    </div>
                    <FormField
                      control={form.control}
                      name={`periods.${index}.startTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`periods.${index}.endTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="self-end"
                      onClick={() => removePeriod(index)}
                      disabled={form.watch("periods").length <= 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center sm:justify-between">
              <Button onClick={addPeriod} type="button" variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Period
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 