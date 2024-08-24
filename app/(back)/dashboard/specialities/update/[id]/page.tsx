import SpecialityForm from '@/components/dashboard/admin/specialities/SpecialityForm'
import { getData } from '@/lib/utils'
import { serviceResponse, specialityResponse } from '@/types/types'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
    const services=await getData(`admin/specialities/${id}`)
  const data:specialityResponse=services.data
  return (
    <div>
      <SpecialityForm title='Speciality' description='Please fill speciality form' isEdit={true} data={data}/>
    </div>
  )
}
