"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { groups, streams, years } from "@/lib/data"
import { Combobox } from "../../ui/combobox"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"

export default function StudentsConfiguration() {
    const [selectedStream, setSelectedStream] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedGroup, setSelectedGroup] = useState("")
  
    const streamOptions = streams.map(stream => ({ value: stream.value, label: stream.label }))
    const yearOptions = years.map(year => ({ value: year.toString(), label: `Year ${year}` }))
    const groupOptions = selectedStream
      ? (groups[selectedStream as keyof typeof groups] || []).map(group => ({ value: group, label: group }))
      : []
  
    return (
      <div className="w-[280px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">View configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
           <Tabs defaultValue="student">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
            <Combobox
              options={streamOptions}
              value={selectedStream}
              onChange={(value) => {
                setSelectedStream(value)
                setSelectedYear("")
                setSelectedGroup("")
              }}
              placeholder="Select stream..."
            />
            <Combobox
              options={yearOptions}
              value={selectedYear}
              onChange={(value) => {
                setSelectedYear(value)
                setSelectedGroup("")
              }}
              placeholder="Select year..."
              disabled={!selectedStream}
            />
            <Combobox
              options={groupOptions}
              value={selectedGroup}
              onChange={setSelectedGroup}
              placeholder="Select group..."
              disabled={!selectedYear}
            />
          </CardContent>
        </Card>
      </div>
    )
}