import UpdateAppointment from '@/components/dashboard/appointments/UpdateAppointment'
import { Button } from '@/components/ui/button'
import { formatDate, getData } from '@/lib/utils'
import { Appointment } from '@/types/types'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
  const appointment:Appointment=await ( await getData(`appointments/${id}`)).data
  console.log(appointment.fullName)
  const formattedDate=formatDate(appointment.appointmentDate)
  return (
    <div>
    <div className="flex items-center justify-between px-4 py-4 border-b">
      <div className="">
      <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-gray-50">
      {appointment.fullName}
    </h2>
    <div className="flex gap-2 divide-x-2 divide-gray-900 dark:divide-gray-50">
      <p>{appointment.gender}</p>
      <p>{appointment.phoneNumber}</p>
    </div>
      </div>
      <div className="">
      <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      {formattedDate}
    </h2>
    <div className="flex items-center font-semibold">
      <Calendar className='w-4 h-4 mr-2'/>
      <span>{appointment.appointmentTime}</span>
    </div>
      </div>
    </div>
    <div className="py-4 gap-2">
    <div className="flex divide-x-2 px-4 py-3 divide-gray-900 dark:divide-gray-50 border-b">
<p className="px-3 text-sm font-semibold">Appointment Status</p>
<Button>
    {appointment.status===true?"Approved":"Pending"}
</Button>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-900 dark:divide-gray-50 border-b">
<p className="px-3 text-sm font-semibold">Reason</p>
<p className="px-3">{appointment.reason}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-900 dark:divide-gray-50 border-b">
<p className="px-3 text-sm font-semibold">Date of Birth</p>
<p className="px-3">{formatDate(appointment.dob)}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-900 dark:divide-gray-50 border-b">
<p className="px-3 text-sm font-semibold">Email</p>
<p className="px-3">{appointment.email}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-900 dark:divide-gray-50 border-b">
<p className="px-3 text-sm font-semibold">Location</p>
<p className="px-3">{appointment.address}</p>
      </div>
      <div className="flex divide-x-2 px-4 py-3 divide-gray-900 dark:divide-gray-50 border-b">
<p className="px-3 text-sm font-semibold">Medical Documents</p>
<div className="grid grid-cols-4">
  {appointment.medicdoc.map((item,i)=>(
    <Button key={i} variant={'outline'} asChild>
      <Link target='_blank' href={item} download>{`Doc ${i+1}`}</Link>

    </Button>
  ))}
</div>
      </div>
      {/* <UpdateAppointment appointment={appointment}/> */}
    </div>
    </div>
  )
}
