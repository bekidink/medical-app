
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioData from './BioData'
import ContactInfo from './ContactInfo'
import ProfileForm from './ProfileForm'
import EducationalForm from './EducationalForm'
import PracticeForm from './PracticeForm'
import AdditionalInfoForm from './AdditionalInfoForm'

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
            component:<ContactInfo page={page} title="Contact Information" description="Please fill in your contact Info"/>
        },
        {
            title:"Educational Information",
            page:"educational",
            component:<EducationalForm page={page} title="Education Info" description="Please fill in your education Info"/>
        },
        {
            title:"Practice Information",
            page:"practice",
            component:<PracticeForm page={page} title="Professional Info" description="Please fill in your Professional Info"/>
        },
        
        
        
        {
            title:"Additional Information",
            page:"additional",
            component:<AdditionalInfoForm page={page} title="Additional Info" description="Please fill in your Additional Info"/>
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
    <div className='grid grid-cols-12 mx-auto rounded-lg shadow-inner bg-blue-50 overflow-hidden border border-slate-200'>
      <div className="col-span-full sm:col-span-2 divide-y-2 divide-gray-100">
      
{
    steps.map((item,i)=>{
        return (
            <Link key={i} href={`/onboarding/${id}?page=${item.page}`} className={cn('block py-3 px-4 bg-slate-300 text-slate-100 shadow-inner',item.page===page?" bg-teal-900 text-xs shadow-inner uppercase py-3 px-4":"")}>{item.title}
       </Link> 
        )
    })
}
      
      </div>
      <div className="col-span-full sm:col-span-10 bg-white">
     {currentStep?.component}
      </div>
    </div>
  )
}
