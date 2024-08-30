import { Button } from '@/components/ui/button'
import DoctorDetails from '@/components/user/home/doctors/DoctorDetails'
import FixedBookButton from '@/components/user/shared/FixedBookButton'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { Appointment, DoctorDetail, DoctorProfile } from '@/types/types'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
  const doctor:DoctorDetail= await getData(`doctor/${id}`)
  const session =await getServerSession(authOptions)
  const user=session?.user
  
  const appointment:Appointment= await(await getData(`appointments/patients/${id}`)).data
  return (
    <>
    {
      doctor?(<div className='bg-blue-50 dark:bg-slate-800 py-50 min-h-screen'>
        <div className="bg-white dark:bg-slate-950 mx-auto shadow-2xl max-w-4xl border border-gray-200 dark:border-slate-600 rounded-md">
  <div className="py-6 px-8">
    <div className="flex items-center justify-between">
    <div className="">
    <div className="flex flex-col">
        <h2 className='uppercase font-bold text-2xl tracking-widest'>{doctor.firstName},{doctor.lastName}</h2>
        <p className='text-gray-500 text-xs uppercase'>{doctor.sepeciality.title}</p>
    </div>
    <div className="py-3">
    <p>{doctor.operationMode}</p>
    <p>{doctor.city},{doctor.state},{doctor.country}</p>
    </div>
    </div>
    <Image src={`${doctor.profilePicture}`} alt='doctor' width={243} height={207} className='w-36 h-36 rounded-full object-cover'/>
    </div>

  </div>
  <div className="">
  <DoctorDetails appointment={appointment} doctor={doctor} user={user}/>
  </div>
        </div>
      <FixedBookButton/>
    </div>):(
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        No Doctor Found
    </h2>
      </div>
    )
    }
    </>
  )
}
