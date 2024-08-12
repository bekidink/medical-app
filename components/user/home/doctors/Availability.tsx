"use client"
 
import * as React from "react"
 
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"

export default function Availability() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const formattedDate=`${date?.toString().split(" ").slice(0,4).join(" ")}- GMT${date?.toString().split("GMT")[1].split(" ")[0]}`
    const timeStamps=[
        {
            time:"2:30",
            period:"am"
        },
        {
            time:"4:30",
            period:"am"
        },
        {
            time:"6:30",
            period:"am"
        },
        {
            time:"8:30",
            period:"am"
        },
        {
            time:"10:30",
            period:"am"
        }, {
            time:"6:30",
            period:"am"
        },
        {
            time:"8:30",
            period:"am"
        },
        {
            time:"10:30",
            period:"am"
        }
    ]
    return (
    <div>
        <h2 className="font-bold py-4">Select a Date and Time</h2>
      <div className="grid grid-cols-2 gap-4 lg:gap-0">
        <div className="sm:col-span-1 col-span-full">
        <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
        </div>
        <div className="sm:col-span-1 col-span-full">
<h2 className="pb-4 text-blue-700 text-center py-3 px-4 border border-blue-500" >{formattedDate}</h2>
<div className="py-3 grid grid-cols-3 gap-4">
            {timeStamps.slice(0,5).map((item,i)=>(
                <Link className='bg-blue-800 text-gray-50 py-2 px-3' key={i} href={'/doctor/slug'}>
                {item.time}{item.period}
                </Link>
            ))}
            <Link className='bg-gray-800 text-white py-2 px-3 text-center' href={''}>More</Link>
        </div>
        </div>
      </div>
    </div>
  )
}
