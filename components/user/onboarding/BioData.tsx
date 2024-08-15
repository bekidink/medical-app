"use client"
import { BioDataFormProps, LoginInputProps, RegisterInputProps, StepFormProps } from '@/types/types'
import { Span } from 'next/dist/trace'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../shared/Forms/TextInput'
import SubmitButton from '../shared/Forms/SubmitButton'
import { createUser } from '@/Actions/users'
import { UserRole } from '@prisma/client'
import toast from 'react-hot-toast'
import Link from "next/link"
import Image from "next/image"
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
import { TextAreaInput } from '../shared/Forms/TextAreaInput'
import { ToggleGroupInput } from '../shared/Forms/ToggleGroup'
import ImageInput from '../shared/Forms/ImageInput'

export default function BioData({page,title,description}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const[imageUrl,setImageUrl]=useState("")
  const {register,handleSubmit,reset,formState:{errors}}=useForm<BioDataFormProps>()
  const router = useRouter();
  const [dob, setDob] = React.useState<Date>()
  const [expiry, setExpiry] = React.useState<Date>()
  async function onSubmit(data:BioDataFormProps){
    if(!dob){
        toast.error("Please select your date of birth")
        return;
    }
    if(!expiry){
        toast.error("Please select your medical license expiry")
    }
    setLoading(true)
    data.dob=dob;
    data.medicalLicenseExpiry=expiry;
    data.page=page
    // data.role=role

    // try {
  
//  const user= await createUser(data);
//  if(user && user.status===200){
//   toast.success("User Created Successfully")
//   router.push(`/verify-account/${user.data?.id}`)
//  }else{
//   // toast.error(${user.error})
//  }
//   reset()
//   setLoading(false)
// } catch (error) {
//   setLoading(false)
// }
  }
  return (
    <div className="w-full mx-auto px-4 py-3     bg-blue-50 ">
    <Card className="mx-auto  min-h-screen bg-white text-slate-800">
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
          <Label htmlFor="middle-name">Middle Name</Label>
          <Input id="middle-name" type="text"  {...register("middleName",{required:true})}
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
        <ToggleGroupInput title='Gender' name='gender' register={register} errors={errors}/>
      
        
        
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
