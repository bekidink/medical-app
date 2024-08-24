import React, { useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Briefcase, Dot } from 'lucide-react'
import ServiceCard from './ServiceCard'
import { getData } from '@/lib/utils'
import { serviceFormProps, serviceResponse } from '@/types/types'
 

export default async function ServicePanel({services}:any) {
    
  
    return (
       
        <ScrollArea className="h-96 w-full ">
           {services.data && services.data.map((tag:serviceResponse,i:any) => (
             <ServiceCard key={i} title={tag.title} slug={tag.slug} imageUrl={tag.imageUrl} id={tag.id}/>
               
              
            ))}
        </ScrollArea>
  )
}
