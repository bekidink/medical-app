import { Button } from '@/components/ui/button'
import DoctorDetails from '@/components/user/home/doctors/DoctorDetails'
import FixedBookButton from '@/components/user/shared/FixedBookButton'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className='bg-blue-50 py-50 min-h-screen'>
        <div className="bg-white mx-auto shadow-2xl max-w-4xl border border-gray-200 rounded-md">
  <div className="py-6 px-8">
    <div className="flex items-center justify-between">
    <div className="">
    <div className="flex flex-col">
        <h2 className='uppercase font-bold text-2xl tracking-widest'>Vijal Patel,john</h2>
        <p className='text-gray-500 text-xs uppercase'>Adult Health</p>
    </div>
    <div className="py-3">
    <p>In-person doctor visit</p>
    <p>In-person doctor visit</p>
    </div>
    </div>
    <Image src={'/doctor.jfif'} alt='doctor' width={243} height={207} className='w-36 h-36 rounded-full object-cover'/>
    </div>

  </div>
  <div className="">
  <DoctorDetails/>
  </div>
        </div>
      <FixedBookButton/>
    </div>
  )
}
