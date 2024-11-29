import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DAYS, GROUPS, TIMES, SCHEDULE_DATA } from "@/mock/shedule-table";
import React from "react";

export default function CalendarPage() {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Card>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left font-medium">Classes</th>
                <th className="border p-2 text-left font-medium">Time</th>
                {DAYS.map((day) => (
                  <th key={day} className="border p-2 text-left font-medium">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((group) => (
                <React.Fragment key={group}>
                  {TIMES.map((time, timeIndex) => (
                    <tr key={`${group}-${time}`}>
                      {timeIndex === 0 && (
                        <td rowSpan={TIMES.length} className="border p-2 align-middle text-center font-medium w-20">
                          {group}
                        </td>
                      )}
                      <td className="border p-2 text-center whitespace-nowrap w-32">{time}</td>
                      {DAYS.map((day) => {
                        const classData = SCHEDULE_DATA[group]?.[time]?.[day]
                        return (
                          <td key={`${group}-${time}-${day}`} className="border p-2 w-40 h-20">
                            {classData && (
                              <div className={cn("p-2 rounded h-full flex flex-col justify-center items-center text-center", classData.color)}>
                                <div className="font-medium text-lg">{classData.subject}</div>
                                <div className="text-sm text-gray-600">{classData.teacher}</div>
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}