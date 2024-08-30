import HomeDisplay from '@/components/dashboard/doctor/appointments/HomeDisplay'
import ListPanel from '@/components/dashboard/doctor/appointments/ListPanel'
import PanelHeader from '@/components/dashboard/doctor/appointments/PanelHeader'
import NewButton from '@/components/dashboard/shared/NewButton'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { Appointment } from '@/types/types'
import { Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth/next'
import React, { ReactNode } from 'react'

export default async function layout({children}:{children:ReactNode}) {
    
    const session =await getServerSession(authOptions)
  const user=session?.user
  let appointments:Appointment[]= []
  if(user){
    appointments=  await(await getData(`user/appointments/${user.id}`)).data
  }

  return (
    <div>
     
    <div className="grid grid-cols-12">
      <div className="col-span-4 px-3 py-2 border-r border-gray-100">
      <PanelHeader title={"Appointments"} desc={appointments.length.toString().padStart(2,"0")} icon={Calendar} />
      <div className="py-3">
        {appointments && (<ListPanel appointments={appointments} link='/dashboard/user/appointments/view' />)}
      
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
