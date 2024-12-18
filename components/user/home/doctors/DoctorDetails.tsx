"use client"
import React, { useState } from 'react'
import Availability from './Availability'
import { Appointment, DoctorDetail, DoctorProfile, DoctorProfileAvailability } from '@/types/types'
import { getDayName } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import PatientForm from './PatientForm'
import { User, UserRole } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

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
      {step === 0 ? (
        <>
          <div className="flex items-center justify-between uppercase tracking-widest">
            <button
              onClick={() => setIsActive("detail")}
              className={
                isActive === "detail"
                  ? "py-4 px-8 w-full bg-blue-600 text-white"
                  : "py-4 px-8 w-full bg-slate-50 text-slate-800"
              }
            >
              Service Details
            </button>
            <button
              onClick={() => setIsActive("availability")}
              className={
                isActive === "availability"
                  ? "py-4 px-8 w-full bg-blue-600 text-white"
                  : "py-4 px-8 w-full bg-slate-50 text-slate-800"
              }
            >
              Availability
            </button>
          </div>
          <div className="py-8 px-6">
            {isActive === "availability" ? (
              <div className="">
                <Availability
                  userId={user?.id}
                  doctor={doctor}
                  setStep={setStep}
                  date={date}
                  setDate={setDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              </div>
            ) : (
              <div className="">
                <Link
                  className="rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden"
                  href={`/service/${doctor.service.slug}`}
                >
                  <Image
                    src={doctor.service.imageUrl}
                    alt=""
                    width={1170}
                    height={848}
                    className="w-1/3 object-cover aspect-video"
                  />
                  <div className="flex flex-col w-2/3 py-4">
                    <h2>{doctor.service.title}</h2>
                    <p className="text-[0.6rem]"></p>
                  </div>
                </Link>
                <div className="flex flex-col w-2/3 py-4">
                  <h2>Services Offered</h2>
                  {doctor.servicesOffered.map((item, i) => (
                    <p key={i} className="text-[0.8rem]">{item}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <PatientForm
          appointment={appointment}
          user={user}
          setStep={setStep}
          step={step}
          selectedTime={selectedTime}
          date={date}
          id={doctor.id}
          charge={doctor.hourlyWage}
        />
      )}
    </div>
  );
}
