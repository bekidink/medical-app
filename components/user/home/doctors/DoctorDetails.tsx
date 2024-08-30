"use client"
import React, { useState } from 'react'
import Availability from './Availability'
import { Appointment, DoctorDetail, DoctorProfile, DoctorProfileAvailability } from '@/types/types'
import { getDayName } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import PatientForm from './PatientForm'
import { User, UserRole } from '@prisma/client'

export default function DoctorDetails({doctor,user,appointment}:{doctor:DoctorDetail,user: any,appointment:Appointment | null | undefined}) {
    const[isActive,setIsActive]=useState('availability')
    const today:keyof DoctorProfileAvailability=getDayName()
    console.log(user)
    const times: string[] = Array.isArray(doctor.availability?.[today]) 
  ? doctor.availability?.[today] 
  : doctor.availability?.[today] ? [doctor.availability[today]] : [];
  const [step,setStep]=useState(0)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedTime,setSelectedTime]=useState("")
  return (
    <div>
      {step===0?(
        <>
         <div className="flex items-center justify-between uppercase tracking-widest">
        <button onClick={()=>setIsActive('detail')} className={isActive==="detail"?'py-4 px-8 w-full bg-blue-600 text-white':'py-4 px-8 w-full bg-slate-50 text-slate-800'}>
            Service Details

        </button>
        <button onClick={()=>setIsActive('availability')} className={isActive==="availability"?'py-4 px-8 w-full bg-blue-600 text-white':'py-4 px-8 w-full bg-slate-50 text-slate-800'}>
            Availability

        </button>
      </div>
      <div className="py-8 px-6">
        {isActive==="availability"?(
 <div className="">
    <Availability userId={user?.id} doctor={doctor} setStep={setStep} date={date} setDate={setDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>
 </div>
        ):(
<div className="">Service Detaials</div>
        )}
       
        
      </div>
        </>
      ):(
<PatientForm appointment={appointment} user={user} setStep={setStep} step={step} selectedTime={selectedTime} date={date} id={doctor.id} charge={doctor.hourlyWage}/>
      )}
     
    </div>
  )
}
