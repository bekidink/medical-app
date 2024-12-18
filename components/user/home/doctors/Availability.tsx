"use client"
 
import * as React from "react"
 
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import { getDayOfWeek } from "@/lib/utils"
import { DoctorDetail, DoctorProfile } from "@/types/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DollarSign, MoveRight } from "lucide-react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Availability({userId,doctor,setStep,date,setDate,setSelectedTime,selectedTime}:{userId:string | undefined,doctor:DoctorDetail,setStep:any,date:any,setDate:any,setSelectedTime:any,selectedTime:any}) {
    
  
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
   
    const dayOfWeek = date ? getDayOfWeek(date) : 'monday';
//   const times = doctor.availability[dayOfWeek] || [];
  const times: string[] = Array.isArray(doctor.availability?.[dayOfWeek]) 
  ? doctor.availability?.[dayOfWeek] 
  : doctor.availability?.[dayOfWeek] ? [doctor.availability[dayOfWeek]] : [];
  const router=useRouter()
  function handleAppointment(){
    if(userId){
        if(selectedTime){
            setStep((cur:number)=>cur+1)
        }else{
            toast.error("select time")
        }
    }else{
        router.push("/login")
    }
  }
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
<span className="text-blue-900 text-sm">You have selected</span>

<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold -tracking-tight first:mt-0 " >{formattedDate}</h2>
<div className="py-3 grid grid-cols-3 gap-4">
            {times.map((item:string,i:any)=>(
                <Button onClick={()=>setSelectedTime(item)} className='bg-blue-800 text-gray-50 py-2 px-3' key={i} variant={selectedTime===item?"ghost":"outline"}>
                {item}
                </Button>
            ))}
            <Link className='bg-gray-800 text-white py-2 px-3 text-center' href={''}>More</Link>
        </div>
        
            <Button onClick={handleAppointment} variant={"outline"}>
            Book Doctor (
                <DollarSign className="w-4 h-4"/>
                {doctor.hourlyWage}
            )
<MoveRight className="w-4 h-4"/>
        </Button>
       
        
        </div>
      </div>
    </div>
  )
}
