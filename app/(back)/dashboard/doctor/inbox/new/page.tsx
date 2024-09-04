import InboxForm from '@/components/dashboard/doctor/inbox/InboxForm'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { Appointment, DoctorDetail } from '@/types/types'
import { getServerSession } from 'next-auth/next'
import React from 'react'
import { Options } from 'react-tailwindcss-select/dist/components/type'

export default async function page() {
    const session =await getServerSession(authOptions)
    const user=session?.user
    const doc:DoctorDetail=await getData(`doctor/${user?.id}`)
    let appointments:Appointment[]= []
    if(user && doc){
      appointments=  await getData(`doctor/appointments/${doc.id}`)
    }
      const uniqueUserAppointments = Array.from(
          new Map(appointments.map(item => [item.userId, item])).values()
        );
    const users:Options=uniqueUserAppointments.map((item)=>{
        return {
            label:item.fullName,
            value:item.userId
        }
    })
    console.log(appointments)
  return (
    <InboxForm title='New Inbox' description='' data={users} session={session}/>
  )
}
