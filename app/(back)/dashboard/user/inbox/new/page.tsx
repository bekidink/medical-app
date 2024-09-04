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
    let appointments:Appointment[]= []
    if(user ){
      appointments=  await getData(`user/appointments/${user.id}`)
    }
      const uniqueUserAppointments = Array.from(
          new Map(appointments.map(item => [item.doctorId, item])).values()
        );
    const users:Options=uniqueUserAppointments.map((item)=>{
        return {
            label:item.fullName,
            value:item.doctorId
        }
    })
    console.log(appointments)
  return (
    <InboxForm title='New Inbox' description='' data={users} session={session} backlink='/dashboard/user/inbox'/>
  )
}
