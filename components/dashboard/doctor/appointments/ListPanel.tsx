import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Briefcase, Dot } from 'lucide-react'
 
const tags = Array.from({ length: 50 },(_,i)=>({
    id:i+1,
    name:`name-${i+1}`
}))
export default function ListPanel() {
  
    return (
        <ScrollArea className="h-72 w-full ">
           {tags.map((tag) => (
             
                <Link href={'#'} className='border mb-2  text-xs   py-3 px-2 w-full rounded-md'>
                <div className="flex items-center justify-between">
                    <h2>William Larsen</h2>
                    <span>4:00pm</span>
                </div>
                <div className="flex items-center gap-4">
                     <div className="flex items-center">
                    <Dot className='w-4 h-4 flex-shrink-0'/>
                    <span>Follow Up</span>
                    </div>
                    <div className="flex items-center">
                    <Briefcase className='w-4 h-4 flex-shrink-0'/>
                    <span>Exam</span>
                    </div>
                </div>
                </Link>
              
            ))}
        </ScrollArea>
  )
}
