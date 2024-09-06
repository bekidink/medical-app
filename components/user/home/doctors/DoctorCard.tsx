import { formatToday, getDayName } from '@/lib/utils'
import { DoctorProfile, DoctorProfileAvailability } from '@/types/types'
import { Stethoscope, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DoctorCard({isInPerson=false,doctor}:{isInPerson:boolean,doctor:DoctorProfile}) {
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
    
    
    const today:keyof DoctorProfileAvailability=getDayName()
    console.log(today)
    const times: string[] = Array.isArray(doctor.availability?.[today]) 
  ? doctor.availability?.[today] 
  : doctor.availability?.[today] ? [doctor.availability[today]] : [];
    const day=formatToday()
  return (
    <div  className='border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800 inline-flex flex-col px-3 py-6 rounded-md hover:border-gray-400 transition-all'>
        <Link href={`/doctor/${doctor.userId}`}>
        <h2 className='uppercase font-bold text-2xl tracking-widest'>{doctor.firstName},{doctor.lastName}</h2>
    <p>{doctor.city},{doctor.state},{doctor.country}</p>
    <div className="flex items-center gap-4 py-6">
        <div className="relative">
        <Image src={`${doctor.profilePicture}`} alt='doctor' width={243} height={207} className='w-24 h-24 rounded-full object-cover'/>
      {
        isInPerson && <p className='absolute bottom-0 right-2 bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full text-blue-700'>
        <Video className='w-6 h-6'/>
        </p>
      }

        </div>
     
    <div className="flex flex-col gap-2">
        <p className='flex items-center'> 
            <Stethoscope className='w-4 h-4 mr-2 flex-shrink-0' />
            <span>{doctor.operationMode}</span>
        </p>
        {times.length>0 && (
             <p className='bg-green-200 dark:bg-slate-900 py-3 px-6 uppercase'>
             Available Today
         </p>
        )}
       
    </div>
    </div>
        </Link>
    <div className="pt-8 border-t border-gray-400">
        <h3 className='flex gap-4 justify-between items-center '>
            <span className='text-gray-600 dark:text-gray-400'>{day}</span>
            <span>$3456 </span>
        </h3>
        <div className="py-3 grid grid-cols-3 gap-4">
            {times.slice(0,5).map((item:string,i:any)=>(
                <Link className='bg-blue-800 text-gray-50 py-2 px-3' key={i} href={'/doctor/slug'}>
                {item}
                </Link>
            ))}
            <Link className='bg-gray-800 text-white py-2 px-3 text-center' href={''}>More</Link>
        </div>
    </div>
    </div>
  )
}
