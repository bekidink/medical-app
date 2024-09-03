"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import AdditionalInfoForm from './AdditionalInfoForm'
import { useOnboardingContext } from '@/context/onboarding'
import { additionalFormProps, additionalUpdateProps, BioDataFormProps, contactFormProps, contactUpdateProps, DoctorDetail, EducationFormProps, EducationUpdateProps, PracticeFormProps, PracticeUpdateProps, profileFormProps, profileUpdateProps, specialityResponse } from '@/types/types'
import ProfileBioData from './BioData'

import ProfileContactInfo from './ContactInfo'
import ProfileEducationalForm from './EducationalForm'
import ProfilePracticeForm from './PracticeForm'
import ProfileUpdateForm from './ProfileForm'
import ProfileAdditionalInfoForm from './AdditionalInfoForm'


export default function ProfileOnboaringForm({id,specialities,doctor}:{id:string,specialities:specialityResponse[],doctor:DoctorDetail}) {
    const params=useSearchParams()
    const page=params.get("page") ?? "bio"
    const bioData: BioDataFormProps = {
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        middleName: doctor.middleName,
        dob: doctor.dob,
        gender: doctor.gender??'',
        userId: doctor.userId,
        page: doctor.page,
        trackingNumber: doctor.trackingNumber
      };
      const profileData: profileUpdateProps = {
        profilePicture: doctor.profilePicture,
        bio: doctor.bio,
        medicalLicense: doctor.medicalLicense,
        medicalLicenseExpiry: doctor.medicalLicenseExpiry,
        page: doctor.page,
       
      }
      const contactData: contactUpdateProps = {
        email: doctor.email,
        phone: doctor.phone,
        country: doctor.country,
        city: doctor.city,
        state: doctor.state,
        page: doctor.page,
        
      };
      const educationData: EducationUpdateProps = {
        medicalSchool: doctor.medicalSchool,
        graduationYear: doctor.graduationYear,
        primarySpecialization: doctor.primarySpecialization,
        otherSpecialties: doctor.otherSpecialties,
        boardCertificates: doctor.boardCertificates,
       
      };
      const practiceData: PracticeUpdateProps = {
        hospitalName: doctor.hospitalName,
        hospitalAddress: doctor.hospitalAddress,
        hospitalContactNumber: doctor.hospitalContactNumber,
        hospitalEmailAddress: doctor.hospitalEmailAddress,
        hospitalWebsite: doctor.hospitalWebsite,
        hospitalHoursOfOperation: doctor.hospitalHoursOfOperation,
        servicesOffered: doctor.servicesOffered,
        insuranceAccepted: doctor.insuranceAccepted ?? false, // Default to false if null
        langaugesSpoken: doctor.langaugesSpoken,
        // id: doctor.id,
        page: doctor.page
      };
      const additionalData: additionalUpdateProps = {
        educationHistory: doctor.educationHistory,
        research: doctor.research,
        acoomplisments: doctor.acoomplisments,
        additionalDocs: doctor.additionalDocs,

        page: doctor.page
      };
    const{trackingNumber:truckingNmber,doctorProfileId}=useOnboardingContext()
    const steps=[
        {
            title:"Bio Data",
            page:"bio",
            component:<ProfileBioData nextPage='profile'data={bioData} doctorId={doctor.id}   userId={id} page={page} title="Bio Data" description="Please fill in your Bio Data Info" />
        },
        {
            title:"Profile Information",
            page:"profile",
            component:<ProfileUpdateForm doctorId={doctor.id} nextPage='contact' data={profileData}  userId={id} page={page} title="Profile Info" description="Please fill in your Profile Info"/>
        },
        {
            title:"Contact Information",
            page:"contact",
            component:<ProfileContactInfo nextPage='educational' doctorId={doctor.id} userId={id} data={contactData} page={page} title="Contact Information" description="Please fill in your contact Info"/>
        },
        {
            title:"Educational Information",
            page:"educational",
            component:<ProfileEducationalForm doctorId={doctor.id} specialities={specialities} nextPage='practice' userId={id} data={educationData}  page={page} title="Education Info" description="Please fill in your education Info"/>
        },
        {
            title:"Practice Information",
            page:"practice",
            component:<ProfilePracticeForm doctorId={doctor.id} nextPage='additional' userId={id} data={practiceData}  page={page} title="Professional Info" description="Please fill in your Professional Info"/>
        },
        
        
        
        {
            title:"Additional Information",
            page:"additional",
            component:<ProfileAdditionalInfoForm doctorId={doctor.id} nextPage='availability' userId={id} data={additionalData}  page={page} title="Additional Info" description="Please fill in your Additional Info"/>
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
            <Link key={i} href={`/dashboard/doctor/profile/${id}?page=${item.page}`} className={cn('block py-3 px-4 bg-slate-300 text-slate-100 shadow-inner',item.page===page?" bg-teal-900 text-xs shadow-inner uppercase py-3 px-4":"")}>{item.title}
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
