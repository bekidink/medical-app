import UpdateAppointment from '@/components/dashboard/appointments/UpdateAppointment'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { cn, formatAppointment, formatDate, getData, timeAgo } from '@/lib/utils'
import { Appointment } from '@/types/types'
import { Calendar, Check, History, Map } from 'lucide-react'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
    const session =await getServerSession(authOptions)
    const user=session?.user
    let appointments:Appointment[]= []
    if(user){
      appointments=  await(await getData(`appointments/patients/detail/${id}`)).data
    }
    //   const uniqueUserAppointments = Array.from(
    //       new Map(appointments.map(item => [item.userId, item])).values()
    //     );
    // const count=uniqueUserAppointments.length
    console.log(appointments)
//   const formattedDate=formatDate(appointment.appointmentDate)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 px-3'>
    {
        appointments.map((item,i)=>{
            const time=timeAgo(new Date(item.createdAt))
            const date = new Date(item.appointmentDate);
            return(
                <Link key={i} href={ `/dashboard/doctor/patients/detail/${item.id}`} className={cn('border mb-2 border-gray-300 shadow-sm text-xs  py-4 px-3 inline-block w-full rounded-md dark:text-slate-100 gap-4',)}>
                <div className="flex py-2 items-center justify-between">
                    <h2 className='capitalize'>{item.fullName}</h2>
                    <div className="flex items-center">
                        <Map className='w-4 h-4 flex-shrink-0'/>
                    <span>{time}</span>
                    </div>
                   
                </div>
                <div className="flex py-2 items-center justify-between gap-4">
                     <div className="flex items-center">
                    <Calendar className='w-4 h-4 flex-shrink-0'/>
                    <span>{formatAppointment(date)}</span>
                    </div>
                    <div className="flex items-center">
                    <History className='w-4 h-4 flex-shrink-0'/>
                    <span>{item.appointmentTime}</span>
                    </div>
                </div>
                {item.status &&                 <div className="flex items-center justfy-end">
                    <Check className='w-4 h-4 flex-shrink-0'/>
                    Approved
                     
                </div>}

                </Link>   
            )
        })
    }
    </div>
  )
}
