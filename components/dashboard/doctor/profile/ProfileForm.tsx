"use client"
import { profileFormProps,  profileUpdateProps,  StepFormProps } from '@/types/types'
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
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";

import { useOnboardingContext } from '@/context/onboarding'
import toast from 'react-hot-toast'
import TextInput from '@/components/user/shared/Forms/TextInput'
import { DatePickerInput } from '@/components/user/shared/Forms/DatePickerInput'
import { TextAreaInput } from '@/components/user/shared/Forms/TextAreaInput'
import ImageInput from '@/components/user/shared/Forms/ImageInput'
import { makePutRequest } from '@/lib/apiRequest'
import { Loader } from 'lucide-react'

export default function ProfileUpdateForm({page,title,description,userId,nextPage,data,doctorId}:{page:string,title:string,description:string,userId:string,nextPage:string,data:profileUpdateProps,doctorId:string}) {
  
  const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,bioData,profileData,setProfileData,doctorProfileId,setTrackingNumber,setDoctorProfileId}=useOnboardingContext()
    const[imageUrl,setImageUrl]=useState(data.profilePicture?? " https://utfs.io/f/17390a85-7e51-405c-b8a4-8e63304cae94-jlodu7.jpg")
  const {register,handleSubmit,reset,formState:{errors}}=useForm<profileUpdateProps>(
    {
      defaultValues:data
    }
  )
  const router = useRouter();
  const initialExpiry=data.medicalLicenseExpiry
  const [expiry, setExpiry] = React.useState<Date>(initialExpiry)
  function redirect(){
    router.push(`/dashboard/doctor/profile/${userId}?page=${nextPage}`)
  }
  async function onSubmit(data:profileUpdateProps){
    setLoading(true)
  
    
    data.page=nextPage
    data.profilePicture=imageUrl
    data.medicalLicenseExpiry=expiry
    // data.id=doctorProfileId
    const endpoint=`doctor/detail/${doctorId}`
    const resourceName="Profile"
   makePutRequest({setLoading,endpoint,resourceName,data,redirect})
  
   
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
       {/* <TextInput name={'year-exp'} register={register} label={'Year of Experience'} errors={errors}/> */}
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
          {isloading?(
             <Button  variant={'outline'} disabled type="submit" className=" bg-slate-900 text-center text-slate-50">
             <Loader className='w-4 h-4 animate-spin'/> saving please wait...
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
