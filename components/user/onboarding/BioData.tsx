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
import { DatePickerInput } from '../shared/Forms/DatePickerInput'
import { ToggleGroupInput } from '../shared/Forms/ToggleGroup'
import { generateTrackingNumber } from '@/lib/utils'
import { useOnboardingContext } from '@/context/onboarding'
import toast from 'react-hot-toast'

export default function BioData({page,title,description,userId,nextPage}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,bioData,setBioData,setTrackingNumber,setDoctorProfileId}=useOnboardingContext()
  const {register,handleSubmit,reset,formState:{errors}}=useForm<BioDataFormProps>(
    {
      defaultValues:bioData
    }
  )
  const router = useRouter();
  const [dob, setDob] = React.useState<Date>(bioData.dob)
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


const onSubmit = async (data:BioDataFormProps) => {
  // e.preventDefault();
  const nextPage="profile"
      data.userId=userId;
    data.dob=dob;
    data.page=nextPage
    data.trackingNumber=trackingNumber
  try {
      const response = await fetch('/api/doctors', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setBioData(data)
        setTrackingNumber(result.data?.trackingNumber??"")
  setDoctorProfileId(result.data?.id??"")
          toast.success("Onboarding Created successfully")
          router.push(`/onboarding/${userId}?page=${nextPage}`)
      } else {
        toast.error(result.error)
      }
  } catch (error) {
    toast.error("Something went wrong")
  }
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
            <Input id="first-name" type='text' placeholder="Max"   {...register("firstName",{required:true})} className='bg-white' />
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
            className='bg-white'
          />
           {errors.lastName && <span className='text-red-600 text-sm'>Last Name is required</span>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="middle-name">Middle Name (Optional)</Label>
          <Input  id="middle-name" type="text"  {...register("middleName",{required:false})}
          className='bg-white'
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
          <DatePickerInput date={dob} setDate={setDob} className=''/>
          {/* {errors.dob && <span className='text-red-600 text-sm'>Password is required</span>} */}
        </div>
        <ToggleGroupInput options={radioOptions} title='Gender' name='gender' register={register} errors={errors}/>
      
        
        
       </div>
        <div className="flex justify-center items-center">
        <Button  variant={'outline'} type="submit" className=" bg-slate-900 text-center text-slate-50">
          Save and Continue
        </Button>
        </div>
        
        </form>
        
      </div>
      
    </CardContent>
  </Card>
    
  </div>
  )
}
