
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioData from './BioData'
import ContactInfo from './ContactInfo'
import ProfessionForm from './ProfessionForm'
import ProfileForm from './ProfileForm'

export default function OnboaringForm({id}:{id:string}) {
    const params=useSearchParams()
    const page=params.get("page") ?? "bio"
    const steps=[
        {
            title:"Bio Data",
            page:"bio",
            component:<BioData page={page} title="Bio Data" description="Please fill in your Bio Data Info" />
        },
        {
            title:"Profile Information",
            page:"profile",
            component:<ProfileForm page={page} title="Profile Info" description="Please fill in your Profile Info"/>
        },
        {
            title:"Contact Information",
            page:"contact",
            component:<ContactInfo/>
        },
        {
            title:"Profession Information",
            page:"profession",
            component:<ProfessionForm page={page} title="Professional Info" description="Please fill in your Professional Info"/>
        },
        
        {
            title:"Educational Information",
            page:"educational",
            component:<></>
        },
        {
            title:"Practice Information",
            page:'practice',
            component:<></>
        },
        {
            title:"Additional Information",
            page:"additional",
            component:<></>
        },
        {
            title:"Availability",
            page:"availability",
            component:<></>
        }
    ]
const currentStep=steps.find((step)=>step.page===page)
console.log(currentStep)
  return (
    <div className='grid grid-cols-12 mx-auto rounded-lg shadow-inner bg-teal-950 overflow-hidden border border-slate-200'>
      <div className="col-span-full sm:col-span-2 divide-y-2 divide-gray-100">
      
{
    steps.map((item,i)=>{
        return (
            <Link href={`/onboarding/${id}?page=${item.page}`} className={cn('block py-3 px-4 bg-slate-300 text-slate-100 shadow-inner',item.page===page?" bg-teal-900 text-xs shadow-inner uppercase py-3 px-4":"")}>{item.title}
       </Link> 
        )
    })
}
      
      </div>
      <div className="col-span-full sm:col-span-10 bg-slate-100">
     {currentStep?.component}
      </div>
    </div>
  )
}
