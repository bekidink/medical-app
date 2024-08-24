import React, { useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Briefcase, Dot } from 'lucide-react'
import { getData } from '@/lib/utils'
import { serviceFormProps, specialityResponse, symptomResponse } from '@/types/types'
import SymptomForm from './SymptomForm'
import SymptomCard from './SymptomCard'
 

export default async function SymptomPanel({symptoms}:any) {
    
  
    return (
       
        <ScrollArea className="h-96 w-full ">
           {symptoms.data && symptoms.data.map((tag:symptomResponse,i:any) => (
             <SymptomCard key={i} title={tag.title} slug={tag.slug} id={tag.id}/>
               
              
            ))}
        </ScrollArea>
  )
}
