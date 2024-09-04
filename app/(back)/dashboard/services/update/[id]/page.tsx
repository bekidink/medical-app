import ServiceForm from '@/components/dashboard/admin/services/ServiceForm'
import { getData } from '@/lib/utils'
import { serviceFormProps, serviceResponse } from '@/types/types'
import React from 'react'

export default async function page({params:{id}}:{params:{id:string}}) {
  const services=await getData(`admin/services/${id}`)
  const data:serviceResponse=services
  return (
    <div>
       {data && <ServiceForm title={'Update Services'} description={'Please update  service Info'} isEdit={true} data={data} />}
    </div>
  )
}
