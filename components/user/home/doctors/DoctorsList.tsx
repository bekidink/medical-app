import React from 'react'
import SectionHeading from '../../shared/SectionHeading'
import Toggle from '../../shared/Toggle'
import Link from 'next/link'
import DoctorCard from './DoctorCard'
import { ArrowUpRight, Map } from 'lucide-react'
import DoctorsCarousel from './DoctorsCarousel'
import { Button } from '@/components/ui/button'
import { getData } from '@/lib/utils'
import { DoctorProfile } from '@/types/types'

export default async function DoctorsList({title,isInPerson=false,className='  px-10 py-8 lg:py-24 dark:bg-slate-900',doctors}:{title:string,isInPerson:boolean,className?:string,doctors:DoctorProfile[]}) {
    // const alldoctors=await (await getData("doctors")).data
    // console.log(alldoctors)
    const doctros=[
    {
        name:"james,john",
        description:"",
        image:'/doctor.jfif'
    },
    {
        name:"james,john",
        description:"",
        image:'/doctor.jfif'
    },
    {
        name:"james,john",
        description:"",
        image:'/doctor.jfif'
    },
    {
        name:"james,john",
        description:"",
        image:'/doctor.jfif'
    },
    {
        name:"james,john",
        description:"",
        image:'/doctor.jfif'
    },
    {
        name:"james,john",
        description:"",
        image:'/doctor.jfif'
    }
 ]
    return (
   <div className={className}>
     <div className="mx-auto max-w-6xl shadow-lg">
      <SectionHeading title={title}/>
      <div className="py-4 flex items-center  justify-between">
       {isInPerson?(
<Link href={''} className='bg-blue-500 text-sm flex items-center font-semibold'>
<Map className='mr-2 flex-shrink-0 w-4 h-4' />
<span>
    Map View
</span>
</Link>
       ):(
        <Toggle title='2 hours'/>
       )}
      <Button asChild>
      <Link href={isInPerson?`/category?mode=Tele-health visit`:`/category?mode=In-person doctor visit`}>See All
      <ArrowUpRight className='h-4 w-4 ms-2'/>
      </Link>
      </Button>
        

      </div>
      <div className="py-6">
    <DoctorsCarousel doctros={doctors} isInPerson={isInPerson}/>
</div>
    </div>
   </div>
  )
}
