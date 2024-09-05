import ServiceForm from '@/components/dashboard/admin/services/ServiceForm'
import ServicePanel from '@/components/dashboard/admin/services/ServicePanel'
import SymptomPanel from '@/components/dashboard/admin/symptoms/SymptomPanel'
import DisplayPanel from '@/components/dashboard/doctor/appointments/DisplayPanel'
import HomeDisplay from '@/components/dashboard/doctor/appointments/HomeDisplay'
import ListPanel from '@/components/dashboard/doctor/appointments/ListPanel'
import PanelHeader from '@/components/dashboard/doctor/appointments/PanelHeader'
import NewButton from '@/components/dashboard/shared/NewButton'
import { getData } from '@/lib/utils'
import { LayoutGrid } from 'lucide-react'
import React from 'react'

export default async function page() {
    const symptoms= await getData("admin/symptoms")||[]
    if(!symptoms){
      return <p>no Symptoms</p>
    }
  return (
    <div>
     
      <div className="grid grid-cols-12">
        <div className="col-span-4 px-3 py-2 border-r border-gray-100">
        <PanelHeader title={"Symptoms"} desc={(symptoms.data.length).toString().padStart(2,"0")} icon={LayoutGrid} />
        <div className="py-3">
        {/* <ListPanel/> */}
        <SymptomPanel symptoms={symptoms}/>
        </div>
       
        </div>
        <div className="col-span-8 ">
          <div className="flex items-center py-2 border-b border-gray-200 justify-end">
            <div className="flex items-center gap-4">
              <NewButton title='New Symptom' href='/dashboard/symptoms/new'/>
            </div>
          </div>
         {/* <ServiceForm title='Services' description='Please fill in your service Info' /> */}
         <div className='flex py-3 px-2 h-1/2 items-center justify-center'>
      <div className=" gap-2 py-2 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center">
      <LayoutGrid/>
      <p>You have {(symptoms.data.length).toString().padStart(2,"0")}  available symptoms.</p>
      <NewButton title='New Symptom' href='/dashboard/symptoms/new'/>
      </div>
    </div>
        </div>
      </div>
    </div>
  )
}
