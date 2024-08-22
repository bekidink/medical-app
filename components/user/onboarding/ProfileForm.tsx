"use client"
import { profileFormProps,  StepFormProps } from '@/types/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../shared/Forms/TextInput'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { DatePickerInput } from '../shared/Forms/DatePickerInput'
import { TextAreaInput } from '../shared/Forms/TextAreaInput'
import ImageInput from '../shared/Forms/ImageInput'
import { useOnboardingContext } from '@/context/onboarding'
import toast from 'react-hot-toast'

export default function ProfileForm({page,title,description,nextPage}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,bioData,profileData,setProfileData,doctorProfileId,setTrackingNumber,setDoctorProfileId}=useOnboardingContext()
    const[imageUrl,setImageUrl]=useState(profileData.profilePicture?? " https://utfs.io/f/17390a85-7e51-405c-b8a4-8e63304cae94-jlodu7.jpg")
  const {register,handleSubmit,reset,formState:{errors}}=useForm<profileFormProps>(
    {
      defaultValues:profileData
    }
  )
  const router = useRouter();
  const initialExpiry=profileData.medicalLicenseExpiry
  const [expiry, setExpiry] = React.useState<Date>(initialExpiry)
  
  async function onSubmit(data:profileFormProps){
    setLoading(true)
  
    
    data.page=nextPage
    data.profilePicture=imageUrl
    data.medicalLicenseExpiry=expiry
    data.id=doctorProfileId
    try {
      const response = await fetch('/api/doctors/profile', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setTrackingNumber(result.data?.trackingNumber??"")
  setDoctorProfileId(result.data?.id??"")
  setProfileData(data)
          toast.success('Profile Update Successfully')
          router.push(`/onboarding/66bc55c24e6e9fe0c723d1b3?page=contact`)
      } else {
          toast.error( result.error)
      }
  } catch (error) {
    
      toast.error( 'Something went wrong')
  }
  }
  return (
    <div className="w-full mx-auto px-4 py-3     ">
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
      <TextInput name={'medicalLicense'} register={register} label={'Medical-License'} errors={errors}/>
       <div className="grid grid-cols-2 gap-2">
       <TextInput name={'year-exp'} register={register} label={'Year of Experience'} errors={errors}/>
       {/* <TextAreaInput name='medicalLicense' label='Medical-License' placeholder='Enter Medical License' register={register} errors={errors} /> */}
       <div className="grid gap-2">
          <Label htmlFor="phone">Medical License Expiry</Label>
          
          <DatePickerInput date={expiry} setDate={setExpiry} className=''/>
          {/* {errors.phone && <span className='text-red-600 text-sm'>Password is required</span>} */}
        </div>
        
        
        
        
        
       </div>
       <TextAreaInput name='bio' label='Biography' placeholder='Enter your biography' register={register} errors={errors} />
       <ImageInput label='Professional Image' imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint='' className='' />
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
