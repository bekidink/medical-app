"use client"
import { BioDataFormProps, LoginInputProps, RegisterInputProps, StepFormProps } from '@/types/types'
import { Span } from 'next/dist/trace'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../shared/Forms/TextInput'
import SubmitButton from '../shared/Forms/SubmitButton'
import { createUser } from '@/Actions/users'
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
import { Checkbox } from '@/components/ui/checkbox'
import TimeSelectInput from '../shared/Forms/TimeSelectInput'
import { Plus } from 'lucide-react'

export default function Availability({page,title,description}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const[imageUrl,setImageUrl]=useState("")
  const {register,handleSubmit,reset,formState:{errors}}=useForm<BioDataFormProps>()
  const router = useRouter();
  const availabilityOptions=[
    {
        label:"Weekly (available one or more times during the week,every week.)",
        value:"weekly"
    },
    {
        label:"Specific Dates (available on specific dates.)",
        value:"specific"
    }
  ]
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
    <div className="w-full mx-auto px-4 py-3   ">
    <Card className="mx-auto  min-h-screen  text-slate-800">
    <CardHeader className='items-center'>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
      <TextInput name={'meetingDuration'} register={register} label={'What is the Duration of your Meetings'} errors={errors}/>
      <ToggleGroupInput options={availabilityOptions} title='When are you available for this booking?' name='availablity' register={register} errors={errors}/>
     <div className="">
<h2>Define your weekly availability below:</h2>
<div className="border py-6 px-4 border-gray-200 flex items-center justify-between">
    <div className="">
    <div className="flex  items-center space-x-2">
    <Checkbox id="day" />
    <label
      htmlFor="day"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Monday
    </label>
  </div>
  
  
    </div>
    <div className="grid grid-cols-2 gap-2">
    <TimeSelectInput/>
    <TimeSelectInput/> 
    </div>
  <div className="">
    <Button variant={'ghost'}>
        <Plus className='w-4 h-4 flex-shrink-0' />
        Add window
    </Button>
  </div>
</div>
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
