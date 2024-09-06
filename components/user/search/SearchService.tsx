import React from 'react'
import { ServiceProps, serviceResponse } from '@/types/types'
import ServiceCard from '../home/services/ServiceCard'

export default function SearchServiceList({data}:{data:serviceResponse[]}) {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6'>
      {data.map((service,i)=>(
        <ServiceCard service={service} key={i}/>
      ))}
    </div>
  )
}
