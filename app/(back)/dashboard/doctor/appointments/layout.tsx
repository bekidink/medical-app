import HomeDisplay from '@/components/dashboard/doctor/appointments/HomeDisplay'
import ListPanel from '@/components/dashboard/doctor/appointments/ListPanel'
import PanelHeader from '@/components/dashboard/doctor/appointments/PanelHeader'
import NewButton from '@/components/dashboard/shared/NewButton'
import { getData } from '@/lib/utils'
import { Appointment } from '@/types/types'
import { Calendar } from 'lucide-react'
import React, { ReactNode } from 'react'

export default async function layout({children}:{children:ReactNode}) {
    const appointments:Appointment[]= await(await getData("appointments")).data
  return (
    <div>
     
    <div className="grid grid-cols-12">
      <div className="col-span-4 px-3 py-2 border-r border-gray-100">
      <PanelHeader title={"Appointments"} desc={"11"} icon={Calendar} />
      <div className="py-3">
      <ListPanel appointments={appointments} />
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
