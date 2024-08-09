"use client"
 
import * as React from "react"
 
import { Calendar } from "@/components/ui/calendar"

export default function Availability() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div>
        <h2 className="font-bold py-4">Select a Date and Time</h2>
      <div className="grid grid-cols-2">
        <div className="sm:col-span-1 col-span-full">
        <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
        </div>
        <div className="sm:col-span-1 col-span-full">

        </div>
      </div>
    </div>
  )
}
