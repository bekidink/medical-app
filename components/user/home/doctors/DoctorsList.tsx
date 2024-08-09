import React from 'react'
import SectionHeading from '../../shared/SectionHeading'
import Toggle from '../../shared/Toggle'
import Link from 'next/link'
import DoctorCard from './DoctorCard'
import { Map } from 'lucide-react'
import DoctorsCarousel from './DoctorsCarousel'

export default function DoctorsList({title,isInPerson=false,className='bg-pink-100 px-10 py-8 lg:py-24 '}:{title:string,isInPerson:boolean,className?:string}) {
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
      <SectionHeading title={title}/>
      <div className="py-4 flex items-center justify-between">
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
      
        <Link className='py-3 px-6 border border-blue-600 bg-white' href="">See All</Link>

      </div>
      <div className="py-6">
    <DoctorsCarousel doctros={doctros} isInPerson={isInPerson}/>
</div>
    </div>
  )
}
