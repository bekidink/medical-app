import DisplayPanel from '@/components/dashboard/doctor/appointments/DisplayPanel'
import HomeDisplay from '@/components/dashboard/doctor/appointments/HomeDisplay'
import ListPanel from '@/components/dashboard/doctor/appointments/ListPanel'
import PanelHeader from '@/components/dashboard/doctor/appointments/PanelHeader'
import NewButton from '@/components/dashboard/shared/NewButton'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { Appointment } from '@/types/types'
import { Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth/next'
import React from 'react'

export default async function page() {
  const session =await getServerSession(authOptions)
  const user=session?.user
  let appointments:Appointment[]= []
  if(user){
    appointments=  await(await getData(`user/appointments/${user.id}`)).data
  }
  const count=appointments.length
  return (
    
     
      
        <div className="">
          <div className="flex items-center py-2 border-b border-gray-200 justify-end">
            <div className="flex items-center gap-4">
              <NewButton title='New Appointment' href=''/>
            </div>
          </div>
          <HomeDisplay count={count}/>
        </div>
     
    
  )
}
