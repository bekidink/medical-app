import HomeDisplay from '@/components/dashboard/doctor/appointments/HomeDisplay'
import ListPanel from '@/components/dashboard/doctor/appointments/ListPanel'
import PanelHeader from '@/components/dashboard/doctor/appointments/PanelHeader'
import PatientListPanel from '@/components/dashboard/doctor/petients/PatientListPanel'
import NewButton from '@/components/dashboard/shared/NewButton'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { Appointment, DoctorDetail } from '@/types/types'
import { Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth/next'
import React, { ReactNode } from 'react'

export default async function layout({children}:{children:ReactNode}) {
    const session =await getServerSession(authOptions)
  const user=session?.user
  const doc:DoctorDetail=await getData(`doctor/${user?.id}`)
  let appointments:Appointment[]= []
  if(user && doc){
    appointments=  await(await getData(`doctor/appointments/${doc.id}`)).data
  }
    const uniqueUserAppointments = Array.from(
        new Map(appointments.map(item => [item.userId, item])).values()
      );
  return (
    <div>
     
    <div className="grid grid-cols-12">
      <div className="col-span-4 px-3 py-2 border-r border-gray-100">
      <PanelHeader title={"Appointments"} desc={uniqueUserAppointments.length.toString().padStart(2,"0")} icon={Calendar} />
      <div className="py-3">
      <PatientListPanel appointments={uniqueUserAppointments} link='/dashboard/doctor/patients/view' title='patient' />
      </div>
     
      </div>
      <div className="col-span-8 ">
        {/* <div className="flex items-center py-2 border-b border-gray-200 justify-end">
          <div className="flex items-center gap-4">
            <NewButton title='New Appointment' href=''/>
          </div>
        </div>
        <HomeDisplay/> */}
        {children}
      </div>
    </div>
  </div>
  )
}
