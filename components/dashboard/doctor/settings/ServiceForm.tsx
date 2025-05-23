"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"
import { Loader, Map, PictureInPicture2, PlusCircle, Video } from "lucide-react"
import SelectInput from "@/components/user/shared/Forms/SelectInput"
import { useForm } from 'react-hook-form'
import { ShadSelectInput } from '@/components/user/shared/Forms/ShadSelectInput'
import MultiSelectInput from '@/components/user/shared/Forms/MultiSelectInput'
import { useSession } from 'next-auth/react'
import { makePutRequest } from '@/lib/apiRequest'
import { Appointment, serviceResponse, specialityResponse, symptomResponse } from '@/types/types'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
type ServiceFormProps={
  services:serviceResponse[],
  specialities:specialityResponse[],symptoms:symptomResponse[],
  profileId:string,
  // appointments:Appointment[]
}
export default function ServiceForm({services,specialities,symptoms,profileId}:ServiceFormProps) {
    const {register,handleSubmit,reset,formState:{errors}}=useForm(
       
    )
    const [selectedServiceId,setSelectedServiceId]=useState<String>("")
    const [selectedSpeciality,setSelectedSpeciality]=useState("")
    const [selectedOperationMode,setSelectedOperationMode]=useState("")
    const [isServiceLoading,setServiceLoading]=useState(false)
    const [isSpecialityLoading,setSpecialityLoading]=useState(false)
    const [isSymptomsLoading,setSymptomsLoading]=useState(false)
    const [isOperationLoading,setOperationLoading]=useState(false)
    const [isHourlyLoading,setHourlyLoading]=useState(false)
    const [hourlyWage,setHourlyWage]=useState(0)
    const {data:session,status}=useSession()
    const user=session?.user
    const operationModes=[
      {
        title:"Tele-health visit",
        icon:Video
      },
      {
        title:"In-person doctor visit",
        icon:Map
      },
      
    ]
    const [selected,setSelected]=useState<String[]>([])
    if(status==="loading"){
        return <div className="flex items-center">
          <Loader className="mr-1 w-4 h-4 animate-spin"/>
          <span>Loading a User...</span>
        </div>
    }
    
    // async function onSubmit(data:any){
    //     const resourceName=" Settings"
    //     // const endpoint="admin/symptoms"
    //     // data.symptomIds=selected.map((item:any)=>item.id)
    //     data.symptomIds=selected.map((item:any)=>item.value)
    //     const endpoint=`doctor/${profileId}`
    //     data.userId=user?.id
    //     makePutRequest({setLoading:,endpoint,resourceName,data})
       
    //   }
      function updateService(){
        const resourceName=" Settings"
        console.log(selectedServiceId)
        if(selectedServiceId){
          let data:any={};
        data.serviceId=selectedServiceId
        const endpoint=`doctor/${profileId}`
        data.userId=user?.id
          makePutRequest({setLoading:setServiceLoading,endpoint,resourceName,data})
        }else{
          toast.error("select first")
        }
        
        
        
      }
      function updateSpeciality(){
        const resourceName=" Speciality"
        
        let data:any={}
        data.sepecialityId=selectedSpeciality
        const endpoint=`doctor/${profileId}`
        data.userId=user?.id
        console.log(data)
        makePutRequest({setLoading:setSpecialityLoading,endpoint,resourceName,data})
      }
      function updateSymptom(){
        const resourceName=" Symptoms"
      
        let data:any={}
        data.symptomIds=selected
        const endpoint=`doctor/${profileId}`
        data.userId=user?.id
        makePutRequest({setLoading:setSymptomsLoading,endpoint,resourceName,data})
      }
      function updateOperationMode(){
        const resourceName=" OperationMode"
        // const endpoint="admin/symptoms"
        // data.symptomIds=selected.map((item:any)=>item.id)
        let data:any={}
        data.operationMode=selectedOperationMode
        // data.sepecialityId=selectedSpeciality
        const endpoint=`doctor/${profileId}`
        data.userId=user?.id
        makePutRequest({setLoading:setOperationLoading,endpoint,resourceName,data})
      }
      function updateHourly(){
        const resourceName="Price"
        // const endpoint="admin/symptoms"
        // data.symptomIds=selected.map((item:any)=>item.id)
        let data:any={}
        data.hourlyWage=hourlyWage
        // data.sepecialityId=selectedSpeciality
        const endpoint=`doctor/${profileId}`
        data.userId=user?.id
        makePutRequest({setLoading:setOperationLoading,endpoint,resourceName,data})
      }
  return (
    <div className="mx-auto flex flex-col items-start  w-full gap-4 ">
      <div className="border flex flex-col gap-2 shadow rounded-md p-4">
    
    <div className="flex items-start justify-between gap-x-4">
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Update your hourly price
    </h2>
    {isHourlyLoading?<Loader className='w-4 h-4 animate-spin'/>:(<Button disabled={hourlyWage?false:true} onClick={updateHourly}>
          Update Price4
          </Button>)}

    
    </div>
    <div className="flex flex-wrap gap-2 w-full">
    <Input  id="middle-name" type="number" onChange={()=>setHourlyWage} value={hourlyWage}
          className='bg-white text-gray-900'
          placeholder="Dink"
          />
        </div>
       </div>
    <div className="border flex flex-col gap-2 shadow rounded-md p-4">
    
    <div className="flex items-start justify-between">
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Choose service you want to offer.
    </h2>
    {isServiceLoading?<Loader className='w-4 h-4 animate-spin'/>:(<Button disabled={selectedServiceId?false:true} onClick={updateService}>
          Update Service
          </Button>)}

    
    </div>
    <div className="grid grid-cols-5 flex-wrap gap-2 w-full">
          {
            services.map((item:serviceResponse,i)=>{
return (
  <button key={i}  onClick={()=>setSelectedServiceId(item.id)} className={cn("flex flex-col items-center justify-between py-2 px-3 rounded-md cursor-pointer",selectedServiceId===item.id?"border border-gray-900 dark:border-gray-100":"")}>
<Image src={item.imageUrl} alt='' width={100} height={100} className='w-14 h-14' />
<p className="text-xs">{item.title}</p>
  </button>
)
            })
          }
        </div>
       </div>
       <div className="border flex flex-col gap-2 shadow rounded-md p-4">
       
    <div className="flex items-start justify-between">
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Choose your operation Mode.
    </h2>
    {isOperationLoading?<Loader className='w-4 h-4 animate-spin'/>:(
      <Button disabled={selectedOperationMode?false:true} onClick={updateOperationMode}>

      Update mode
    </Button>
    )}
        
    </div>
    <div className="grid grid-cols-4 gap-2 w-full">
          {
            operationModes.map((item:any,i)=>{
              const Icon=item.icon
return (
  <button key={i} onClick={()=>setSelectedOperationMode(item.title)} className={cn('flex flex-col items-center justify-between py-2 px-3 rounded-md cursor-pointer',selectedOperationMode===item.title?"border border-gray-900 dark:border-gray-200":"")}>
<Icon className='w-8 h-8' />
<p className="text-xs">{item.title}</p>
  </button>
)
            })
          }
        </div>
       </div>
       <div className="border flex flex-col gap-2 shadow rounded-md p-4">
       
    <div className="flex items-start justify-between">
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Choose your Speciality.
    </h2>
    {isSpecialityLoading?<Loader className='w-4 h-4 animate-spin'/>:(
      <Button disabled={selectedSpeciality?false:true} onClick={updateSpeciality}>

      Update Speciality
    </Button>
    )}
        
    </div>
    <div className="grid grid-cols-4 gap-2 w-full">
          {
            specialities.map((item:specialityResponse,i)=>{
return (
  <button key={i} onClick={()=>setSelectedSpeciality(item.id)} className={cn('flex flex-col items-center justify-between py-2 px-3 rounded-md cursor-pointer',selectedSpeciality===item.id?"border border-gray-900 dark:border-gray-200":"")}>
<p className="text-xs">{item.title}</p>
  </button>
)
            })
          }
        </div>
       </div>
       <div className="border flex flex-col gap-2 shadow rounded-md p-4">
       
    <div className="flex items-start justify-between">
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Choose symptoms list.
    </h2>
    {isSymptomsLoading?(
      <Loader className='w-4 h-4 animate-spin'/>
    ):(
      <Button disabled={selected?false:true} onClick={updateSymptom}>
      Update Symptoms
    </Button>
    )}
    
    </div>
    <div className="grid grid-cols-4 gap-2 w-full">
          {
            symptoms.map((item:symptomResponse,i)=>{
return (
  <button key={i} onClick={()=>setSelected((prev)=>[...prev,item.id])} className={cn('flex flex-col items-center justify-between py-2 px-3 rounded-md cursor-pointer',selected.includes(item.id)?"border border-gray-900 dark:border-gray-200":"")}>
<p className="text-xs">{item.title}</p>
  </button>
)
            })
          }
        </div>
      
       </div>
       
  </div>
  )
}
