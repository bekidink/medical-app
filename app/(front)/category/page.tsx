import DoctorCard from '@/components/user/home/doctors/DoctorCard';
import { getData } from '@/lib/utils';
import { DoctorDetail, DoctorProfile, serviceResponse, specialityResponse } from '@/types/types';
import Link from 'next/link';
import React from 'react'

export default async function page({params:{slug},searchParams}:{
  params:{slug:string};
  searchParams:{[key:string]:string | string[] | undefined}
}) {
const {mode}=searchParams
//   const title=slug.split("-").join(" ")
//   const data=await(await getData(`specialities/${slug}`)).data
//   const doctors:DoctorDetail[]=data.doctors
//   const services:specialityResponse[]=data.specialities
const alldoctors:DoctorProfile[]=await getData("home/doctors")
  const doctors=alldoctors.filter((doctor)=>doctor.operationMode===mode)
  const allservices:serviceResponse[]=await getData("admin/services")
 return (
<div className='container p-8'>
       <h1 className="capitalize scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
      {mode} ({doctors.length.toString().padStart(2,"0")})
    </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
        <div className="lg:col-span-4 col-span-12 sm:col-span-full shadow border border-gray-200/50 rounded-sm p-6">
<h2 className=' capitalize font-semibold'>Other Specialities</h2>
<div className="py-3 flex flex-col text-sm space-y-2">
  {allservices.map((item,i)=>{
    return (
<Link key={i} href={'#'} className='hover:to-blue-600'>{item.title}</Link>
    )
  })}
  

</div>
        </div>
        <div className="lg:col-span-8 col-span-12">
{
  doctors.length>0?(
    <div className=" grid lg:grid-cols-2 grid-cols-1 gap-6">
      {
        doctors.map((doctor,i)=>{
          return (
            <DoctorCard key={i} isInPerson={doctor.operationMode==='In-person doctor visit'?true:false} doctor={doctor}/>
          )
        })
      }

    </div>
  ):(
    <div className="">
      <h2>No Doctors for this Category</h2>
    </div>
  )
}
        </div>

      </div>
    </div>

  )
}
