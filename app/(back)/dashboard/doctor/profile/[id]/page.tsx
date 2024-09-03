import ProfileOnboaringForm from '@/components/dashboard/doctor/profile/ProfileOnboardingForm'
import OnboaringForm from '@/components/user/onboarding/OnboaringForm'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { DoctorDetail, specialityResponse } from '@/types/types'
import { getServerSession } from 'next-auth/next'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
  const allspecialities:specialityResponse[]= await(await getData("admin/specialities")).data
  const session =await getServerSession(authOptions)
  const user=session?.user
  if(!user){
    return <p>Not Authorized</p>
  }
  const doctor:DoctorDetail= await getData(`doctor/detail/${id}`)
  console.log(doctor)
  if(!doctor){
    return <p> Profile Not Found</p>
  }
    return (
    <div className='bg-blue-50 dark:bg-teal-950'>
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <ProfileOnboaringForm doctor={doctor} id={id} specialities={allspecialities} />
      </div>
    </div>
  )
}
