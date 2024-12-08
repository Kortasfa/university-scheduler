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

interface CalendarSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (settings: PeriodTime[]) => void
  initialSettings: PeriodTime[]
}

export interface PeriodTime {
  periodOrder: number,
  startTime: string
  endTime: string
}

const FormSchema = z.object({
  periods: z.array(z.object({
    periodOrder: z.number(),
    startTime: z.string(),
    endTime: z.string(),
  }))
  .min(1, "At least one period is required")
  .refine((periods) => {
    const validTimes = periods.every(period => 
      period.startTime < period.endTime
    );
    if (!validTimes) return false;

    for (let i = 1; i < periods.length; i++) {
      if (periods[i].startTime < periods[i-1].endTime) {
        return false;
      }
    }
    return true;
  }, "Periods must be sequential and end times must be after start times")
});

export function CalendarSettingsDialog({
  open,
  onOpenChange,
  onSave,
  initialSettings
}: CalendarSettingsProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      periods: initialSettings,
    },
  })

  const addPeriod = () => {
    const currentPeriods = form.getValues("periods");
    const lastPeriod = currentPeriods[currentPeriods.length - 1];
    const newStartTime = lastPeriod.endTime;
    const [hours, minutes] = newStartTime.split(':').map(Number);
    const endDate = new Date(2000, 0, 1, hours, minutes + 45);
    const newEndTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;

    form.setValue("periods", [...currentPeriods, { 
      periodOrder: currentPeriods.length + 1,
      startTime: newStartTime, 
      endTime: newEndTime 
    }]);
  }

  const removePeriod = (index: number) => {
    const currentPeriods = form.getValues("periods")
    if (currentPeriods.length <= 1) return
    form.setValue("periods", currentPeriods.filter((_, i) => i !== index))
  }

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    onSave(data.periods)
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