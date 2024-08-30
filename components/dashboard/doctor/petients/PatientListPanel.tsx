"use client"
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Briefcase, Calendar, Check, Dot, History, Mail, Map, User } from 'lucide-react'
import { Appointment } from '@/types/types'
import { cn, formatAppointment, timeAgo } from '@/lib/utils'
import { usePathname } from 'next/navigation'
 

export default function PatientListPanel({appointments,link='/dashboard/doctor/appointments/view',title=''}:{appointments:Appointment[],link?:string,title?:string}) {
  const pathname=usePathname()
    return (
        <ScrollArea className="h-96  w-full  ">
           {appointments.map((tag,i) => {
            const time=timeAgo(new Date(tag.createdAt))
            const date = new Date(tag.appointmentDate);
            return (
                <Link key={i} href={ title===''?  `${link}/${tag.id}`:`${link}/${tag.userId}`} className={cn('border mb-2 border-gray-300 shadow-sm text-xs  py-4 px-2 inline-block w-full rounded-md dark:text-slate-100 gap-4',pathname===`/dashboard/doctor/appointments/view/${tag.id}`&& ' border-blue-800 border-2 dark:border-blue-100')}>
                <div className="flex py-1 items-center justify-between">
                    <h2 className='capitalize'>{tag.fullName}</h2>
                    <div className="flex items-center">
                        <Map className='w-4 h-4 flex-shrink-0'/>
                    <span>{tag.address}</span>
                    </div>
                   
                </div>
                <div className="flex py-1 items-center justify-between gap-4">
                     <div className="flex items-center">
                    <Mail className='w-4 h-4 flex-shrink-0'/>
                    <span>{tag.email}</span>
                    </div>
                    <div className="flex items-center">
                    <span>{tag.phoneNumber}</span>
                    </div>
                </div>
                               <div className="flex items-center justfy-end">
                    <User className='w-4 h-4 flex-shrink-0'/>
                    {tag.gender}
                     
                </div>

                </Link>
            )
           }
             
                
              
            )}
        </ScrollArea>
  )
}
