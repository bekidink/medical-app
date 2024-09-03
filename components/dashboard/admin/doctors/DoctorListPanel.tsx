"use client"
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { DoctorDetail } from '@/types/types';
import { History, Mail, Map, Microscope, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function DoctorListPanel({doctors,link='/dashboard/doctors/view',title=''}:{doctors:DoctorDetail[],link?:string,title?:string}) {
  const pathname=usePathname()
    return (
    <ScrollArea className="h-96  w-full  ">
    {doctors.map((tag,i) => {
     
     return (
         <Link key={i} href={ `${link}/${tag.userId}`} className={cn('border mb-2 border-gray-300 shadow-sm text-xs  py-4 px-2 inline-block w-full rounded-md dark:text-slate-100 gap-4',pathname===`/dashboard/doctor/view/${tag.id}`&& ' border-blue-800 border-2 dark:border-blue-100')}>
         <div className="flex items-center py-1 justify-between">
             <h2 className='capitalize'>{tag.firstName},{tag.lastName}</h2>
             <div className="flex items-center">
                 <Map className='w-4 h-4 flex-shrink-0'/>
             <span>{tag.country}</span>
             </div>
            
         </div>
         <div className="flex items-center py-1 justify-between gap-4">
              <div className="flex items-center">
             <Mail className='w-4 h-4 flex-shrink-0'/>
             <span>{tag.email}</span>
             </div>
             <div className="flex items-center">
             {/* <History className='w-4 h-4 flex-shrink-0'/> */}
             <span>{tag.phone}</span>
             </div>
         </div>
         
                       <div className="flex items-center justfy-start">
             <User className='w-4 h-4 flex-shrink-0'/>
             <span>{tag.gender}</span>
           
              
         </div>

         </Link>
     )
    }
      
         
       
     )}
 </ScrollArea>
  )
}
