import { ScheduleTable } from "@/components/schedule-table";
import { ScheduleMaker } from "@/components/schedule/schedule-maker";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarPage() {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Card>
          <ScheduleTable />
        </Card>
      </div>
    </div>
  )
}