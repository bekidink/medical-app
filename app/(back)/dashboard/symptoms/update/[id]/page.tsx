import SpecialityForm from '@/components/dashboard/admin/specialities/SpecialityForm'
import SymptomForm from '@/components/dashboard/admin/symptoms/SymptomForm'
import { getData } from '@/lib/utils'
import { serviceResponse, specialityResponse, symptomResponse } from '@/types/types'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
    const services=await getData(`admin/symptoms/${id}`)
  const data:symptomResponse=services
  return (
    <div>
      <SymptomForm title='Symptom' description='Please fill symptom form' isEdit={true} data={data}/>
    </div>
  )
}
