"use client"
import OnboaringForm from '@/components/user/onboarding/OnboaringForm'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function page({params:{id}}:{params:{id:string}}) {
 
    return (
    <div className='bg-blue-50 dark:bg-teal-950'>
      <div className="max-w-5xl mx-auto py-8 min-h-screen">
        <OnboaringForm id={id}/>
      </div>
    </div>
  )
}
