import DoctorCard from '@/components/user/home/doctors/DoctorCard';
import LinkCards from '@/components/user/home/doctors/LinkCards';
import ServiceList from '@/components/user/home/services/ServiceList';
import { getData } from '@/lib/utils';
import { DoctorDetail, DoctorProfile, ServiceData, serviceResponse, specialityResponse, symptomResponse } from '@/types/types';
import Link from 'next/link';
import React from 'react'

export default async function page({params:{slug},searchParams}:{
  params:{slug:string};
  searchParams:{[key:string]:string | string[] | undefined}
}) {
const {query}=searchParams
//   const title=slug.split("-").join(" ")
//   const data=await(await getData(`specialities/${slug}`)).data
//   const doctors:DoctorDetail[]=data.doctors
//   const services:specialityResponse[]=data.specialities
const data=await (await getData(`search/${query}`)).data
console.log(data)  
const doctors:DoctorProfile[]=data.doctors
  const services:ServiceData[]=data.services
  const symptoms:symptomResponse[]=data.symptoms
  const specialities:specialityResponse[]=data.specialities
  const allServices:ServiceData[]=await (await getData(`services`)).data
  const serviceList:ServiceData[]=services.length>0?services:allServices
 return (
<div className='container p-8'>
       <h1 className="capitalize scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
      {query} ({doctors.length.toString().padStart(2,"0")})
    </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-3 shadow border border-gray-200/50 rounded-sm p-6">
<h2 className=' capitalize font-semibold'>Browse by Services</h2>
<div className="py-3 flex flex-col text-sm space-y-2">
  {serviceList.map((item,i)=>{
    return (
<Link key={i} href={`/service/${item.slug}`} className='hover:to-blue-600'>{item.title}({item._count.DoctorProfiles.toString().padStart(2,"0")})</Link>
    )
  })}
  

</div>
        </div>
        <div className="col-span-9 shadow-sm border border-gray-200/50 rounded-sm">
        {services.length>0 && <div className="py-6 border-b">
        <h2>Results for {query} in services</h2>
        <ServiceList data={services} />
        </div>}
 {
   symptoms && symptoms.length>0 &&
   <div className="py-6 border-b">
     <h2>Results for
        <span className='font-semibold'>{query}</span>
          in symptoms</h2>
   <LinkCards className='' specialities={symptoms}/>
   </div> 
 }           
 {
   specialities.length>0 && 
   <div className="py-6 border-b">
    <h2>Results for
        <span className='font-semibold'>{query} </span>
         in specialities</h2>
   <LinkCards className='' specialities={specialities}/> 
   </div>
 } 
 {doctors.length>0 &&  
 <div className="py-6 border-b">
    <h2>Results for <span className='font-semibold'>
        <span className='font-semibold'>{query}</span>
        
        </span> in doctors</h2>
 <div className=" grid grid-cols-2 gap-6">
      {
        doctors.map((doctor)=>{
          return (
            <DoctorCard isInPerson={doctor.operationMode==='In-person doctor visit'?true:false} doctor={doctor}/>
          )
        })
      }

    </div>
    </div>
    }          


        </div>

      </div>
    </div>

  )
}
