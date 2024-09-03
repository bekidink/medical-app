"use client"
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Briefcase, Calendar, Check, Dot, History } from 'lucide-react'
import { Appointment } from '@/types/types'
import { cn, formatAppointment, timeAgo } from '@/lib/utils'
import { usePathname } from 'next/navigation'
 

export default function ListPanel({appointments,link='/dashboard/doctor/appointments/view',title=''}:{appointments:Appointment[],link?:string,title?:string}) {
  const pathname=usePathname()
    return (
        <ScrollArea className="h-96  w-full  ">
           {appointments.map((tag,i) => {
            const time=timeAgo(new Date(tag.createdAt))
            const date = new Date(tag.appointmentDate);
            return (
                <Link key={i} href={ title===''?  `${link}/${tag.id}`:`${link}/${tag.userId}`} className={cn('border mb-2 border-gray-300 shadow-sm text-xs  py-4 px-2 inline-block w-full rounded-md dark:text-slate-100 gap-4',pathname===`/dashboard/doctor/appointments/view/${tag.id}`&& ' border-blue-800 border-2 dark:border-blue-100')}>
                <div className="flex items-center py-1 justify-between">
                    <h2 className='capitalize'>{tag.fullName}</h2>
                    <div className="flex items-center">
                        <History className='w-4 h-4 flex-shrink-0'/>
                    <span>{time}</span>
                    </div>
                   
                </div>
                <div className="flex items-center py-1 justify-between gap-4">
                     <div className="flex items-center">
                    <Calendar className='w-4 h-4 flex-shrink-0'/>
                    <span>{formatAppointment(date)}</span>
                    </div>
                    <div className="flex items-center">
                    <History className='w-4 h-4 flex-shrink-0'/>
                    <span>{tag.appointmentTime}</span>
                    </div>
                </div>
                {tag.status &&                 <div className="flex items-center justfy-end">
                    <Check className='w-4 h-4 flex-shrink-0'/>
                    Approved
                     
                </div>}

                </Link>
            )
           }
             
                
              
            )}
        </ScrollArea>
  )
}
