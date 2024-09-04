import OnboaringForm from '@/components/user/onboarding/OnboaringForm'
import { getData } from '@/lib/utils'
import { specialityResponse } from '@/types/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
  const allspecialities:specialityResponse[]= await getData("admin/specialities")
    return (
    <div className='bg-blue-50 dark:bg-teal-950'>
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <OnboaringForm id={id} specialities={allspecialities} />
      </div>
    </div>
  )
}
