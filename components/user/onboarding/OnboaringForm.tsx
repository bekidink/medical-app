
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
import Availability from './Availability'
import { useOnboardingContext } from '@/context/onboarding'

export default function OnboaringForm({id}:{id:string}) {
    const params=useSearchParams()
    const page=params.get("page") ?? "bio"
    const{trackingNumber:truckingNmber,doctorProfileId}=useOnboardingContext()
    const steps=[
        {
            title:"Bio Data",
            page:"bio",
            component:<BioData nextPage='profile' formId={doctorProfileId} trackingNo={truckingNmber} userId={id} page={page} title="Bio Data" description="Please fill in your Bio Data Info" />
        },
        {
            title:"Profile Information",
            page:"profile",
            component:<ProfileForm nextPage='contact' formId={doctorProfileId} trackingNo={truckingNmber} userId={id} page={page} title="Profile Info" description="Please fill in your Profile Info"/>
        },
        {
            title:"Contact Information",
            page:"contact",
            component:<ContactInfo nextPage='educational' userId={id} formId={doctorProfileId} trackingNo={truckingNmber} page={page} title="Contact Information" description="Please fill in your contact Info"/>
        },
        {
            title:"Educational Information",
            page:"educational",
            component:<EducationalForm nextPage='practice' userId={id} formId={doctorProfileId} trackingNo={truckingNmber}  page={page} title="Education Info" description="Please fill in your education Info"/>
        },
        {
            title:"Practice Information",
            page:"practice",
            component:<PracticeForm nextPage='additional' userId={id} formId={doctorProfileId} trackingNo={truckingNmber} page={page} title="Professional Info" description="Please fill in your Professional Info"/>
        },
        
        
        
        {
            title:"Additional Information",
            page:"additional",
            component:<AdditionalInfoForm nextPage='availability' userId={id} formId={doctorProfileId} trackingNo={truckingNmber}  page={page} title="Additional Info" description="Please fill in your Additional Info"/>
        },
        // {
        //     title:"Availability",
        //     page:"availability",
        //     component:<Availability nextPage='completed' userId={id} formId={doctorProfileId} trackingNo={truckingNmber}  page={page} title="Availability Info" description="Please fill in your available time"/>
        // }
    ]
const currentStep=steps.find((step)=>step.page===page)
console.log(currentStep)
  return (
    <div className='grid grid-cols-12 mx-auto rounded-lg shadow-inner bg-white dark:bg-slate-900 overflow-hidden border border-slate-200'>
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
      <div className="col-span-full sm:col-span-10 bg-white dark:bg-slate-950 p-4">
        {truckingNmber && (
            <p className="border-b border-gray-200 text-teal-600 pb-2">
            Use this Trucking Number {" "} <span className="font-bold">
                {truckingNmber}
            </span> 
            <span className="text-xs">
            to Check Status or Resume application  
            </span>
        </p>
        )}
     {currentStep?.component}
      </div>
    </div>
  )
}
