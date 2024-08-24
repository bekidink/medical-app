import React, { useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Briefcase, Dot } from 'lucide-react'
import { getData } from '@/lib/utils'
import { serviceFormProps, specialityResponse } from '@/types/types'
import SpecialityCard from './SpecialityCard'
 

export default async function SpecialityPanel({specialities}:any) {
    
  
    return (
       
        <ScrollArea className="h-96 w-full ">
           {specialities.data && specialities.data.map((tag:specialityResponse,i:any) => (
             <SpecialityCard key={i} title={tag.title} slug={tag.slug} id={tag.id}/>
               
              
            ))}
        </ScrollArea>
  )
}
