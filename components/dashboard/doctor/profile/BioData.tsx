"use client"
import { BioDataFormProps,  StepFormProps } from '@/types/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";

import { generateTrackingNumber } from '@/lib/utils'
import { useOnboardingContext } from '@/context/onboarding'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { DatePickerInput } from '@/components/user/shared/Forms/DatePickerInput'
import { ToggleGroupInput } from '@/components/user/shared/Forms/ToggleGroup'
import { makePutRequest } from '@/lib/apiRequest'

export default function ProfileBioData({page,title,description,userId,nextPage,data,doctorId}:{page:string,title:string,description:string,userId:string,nextPage:string,data:BioDataFormProps,doctorId?:string}) {
    const[isloading,setLoading]=useState(false)
    // const{trackingNumber:truckingNmber,doctorProfileId,bioData,setBioData,setTrackingNumber,setDoctorProfileId}=useOnboardingContext()
   
  const {register,handleSubmit,reset,formState:{errors}}=useForm<BioDataFormProps>(
    {
      defaultValues:data
    }
  )
  const router = useRouter();
  const [dob, setDob] = React.useState<Date>(data.dob)
  const trackingNumber = generateTrackingNumber();
  const radioOptions=[
    {
        label:"Male",
        value:"male"
    },
    {
        label:"Female",
        value:"female"
    },

]

function redirect(){
  router.push(`/dashboard/doctor/profile/${userId}?page=${nextPage}`)
}
const onSubmit = async (data:BioDataFormProps) => {
  // e.preventDefault();
  const nextPage="profile"
      data.userId=userId;
    data.dob=dob;
    data.page=nextPage
    data.trackingNumber=trackingNumber
    const endpoint=`doctor/detail/${doctorId}`
    const resourceName="BioData"
  await  makePutRequest({setLoading,endpoint,resourceName,data,redirect})
  redirect()
  // try {
  //   setLoading(true)
  //     const response = await fetch('/api/doctors', {
  //         method: 'PUT',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //     });
  //     const result = await response.json();
  //     if (response.ok) {
      
  //         toast.success("Onboarding Created successfully")
  //         router.push(`/dashboard/doctor/profile/${userId}?page=${nextPage}`)
  //         setLoading(false)
  //     } else {
  //       setLoading(false)
  //       toast.error(result.error)
        
  //     }
  // } catch (error) {
  //   setLoading(false)
  //   toast.error("Something went wrong")
  // }
};
  return (
    <div className="w-full mx-auto px-4 py-3  ">
    <Card className="mx-auto  min-h-screen dark:text-slate-50 text-slate-800">
    <CardHeader className='items-center'>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>
       {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
       <div className="grid grid-cols-2 gap-2">
       <div className="grid gap-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" type='text' placeholder="Max"   {...register("firstName",{required:true})} className='bg-white text-gray-900' />
            {errors.firstName && <span className='text-red-600 text-sm'>Name is required</span>}
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Robinson" required />
          </div> */}
        
        <div className="grid gap-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            id="last-name"
            type="text"
            placeholder="Bekele"
            {...register("lastName",{required:true})}
            className='bg-white text-gray-900'
          />
           {errors.lastName && <span className='text-red-600 text-sm'>Last Name is required</span>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="middle-name">Middle Name (Optional)</Label>
          <Input  id="middle-name" type="text"  {...register("middleName",{required:false})}
          className='bg-white text-gray-900'
          placeholder="Dink"
          />
          {errors.middleName && <span className='text-red-600 text-sm'>Middle Name is required</span>}
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Date of Birth</Label>
          {/* <Input id="phone" type="date"  {...register("phone",{required:true})}
          className='bg-white'
          placeholder="m@example.com"
          /> */}
          <DatePickerInput date={dob} setDate={setDob} className='text-gray-900'/>
          {/* {errors.dob && <span className='text-red-600 text-sm'>Password is required</span>} */}
        </div>
        <ToggleGroupInput options={radioOptions} title='Gender' name='gender' register={register} errors={errors}/>
      
        
        
       </div>
        <div className="flex justify-center items-center">
          {isloading?(
            <Button  variant={'outline'} disabled type="submit" className=" bg-slate-900 text-center text-slate-50">
            <Loader2 className='w-4 h-4 animate-spin'/>saving please wait...
          </Button>
          ):(
            <Button  variant={'outline'} type="submit" className=" bg-slate-900 text-center text-slate-50">
          Save and Continue
        </Button>
          )}
        
        </div>
        
        </form>
        
      </div>
      
    </CardContent>
  </Card>
    
  </div>
  )
}
