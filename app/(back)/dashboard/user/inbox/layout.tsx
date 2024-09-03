import HomeDisplay from '@/components/dashboard/doctor/appointments/HomeDisplay'
import ListPanel from '@/components/dashboard/doctor/appointments/ListPanel'
import PanelHeader from '@/components/dashboard/doctor/appointments/PanelHeader'
import InboxListPanel from '@/components/dashboard/doctor/inbox/InboxListPanel'
import PatientListPanel from '@/components/dashboard/doctor/petients/PatientListPanel'
import NewButton from '@/components/dashboard/shared/NewButton'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { Appointment, DoctorDetail, Message } from '@/types/types'
import { Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth/next'
import React, { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function layout({children}:{children:ReactNode}) {
    const session =await getServerSession(authOptions)
  const user=session?.user
//   const doc:DoctorDetail=await getData(`doctor/${user?.id}`)
  let appointments:Message[]= []
  if(user ){
    appointments=  await(await getData(`doctor/inbox/${user.id}`))
  }
  
    const receviedes = appointments.filter((item)=>item.recieverId===user?.id)
    const sentes=appointments.filter((item)=>item.senderId===user?.id)
  return (
    <div>
     
    <div className="grid grid-cols-12">
      <div className="col-span-4 px-3 py-2 border-r border-gray-100">
      <PanelHeader title={"Inbox"} desc={appointments.length.toString().padStart(2,"0")} icon={Calendar} />
      <div className="py-3">
      <Tabs defaultValue="received" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="received">Recieved ({receviedes.length.toString().padStart(2,"0")})</TabsTrigger>
    <TabsTrigger value="sent">Sent ({sentes.length.toString().padStart(2,"0")})</TabsTrigger>
  </TabsList>
  <TabsContent value="received"><InboxListPanel appointments={receviedes} link='/dashboard/doctor/patients/view' title='Received' /></TabsContent>
  <TabsContent value="sent">
  <InboxListPanel appointments={sentes} link='/dashboard/doctor/patients/view' title='Sent' />

  </TabsContent>
</Tabs>

      {/* <InboxListPanel appointments={appointments} link='/dashboard/doctor/patients/view' title='Inbox' /> */}
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
