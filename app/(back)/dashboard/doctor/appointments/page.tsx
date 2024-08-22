import DisplayPanel from '@/components/dashboard/doctor/appointments/DisplayPanel'
import HomeDisplay from '@/components/dashboard/doctor/appointments/HomeDisplay'
import ListPanel from '@/components/dashboard/doctor/appointments/ListPanel'
import PanelHeader from '@/components/dashboard/doctor/appointments/PanelHeader'
import NewButton from '@/components/dashboard/shared/NewButton'
import { Calendar } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>
     
      <div className="grid grid-cols-12">
        <div className="col-span-4 px-3 py-2 border-r border-gray-100">
        <PanelHeader title={"Appointments"} desc={"11"} icon={Calendar} />
        <div className="py-3">
        <ListPanel/>
        </div>
       
        </div>
        <div className="col-span-8 ">
          <div className="flex items-center py-2 border-b border-gray-200 justify-end">
            <div className="flex items-center gap-4">
              <NewButton title='New Appointment' href=''/>
            </div>
          </div>
          <HomeDisplay/>
        </div>
      </div>
    </div>
  )
}
