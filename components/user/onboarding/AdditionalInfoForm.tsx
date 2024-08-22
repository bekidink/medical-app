"use client"
import { additionalFormProps,  StepFormProps } from '@/types/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useRouter } from "next/navigation";
import { TextAreaInput } from '../shared/Forms/TextAreaInput'

import MultiFileUploader, { File } from '../shared/Forms/MultiFileUploader'
import { useOnboardingContext } from '@/context/onboarding'

export default function AdditionalInfoForm({page,title,description}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,additionalData,setAdditionalData}=useOnboardingContext()
    const[docs,setDocs]=useState<File[]>([
      {
        "name":'profile',
        "size":37,
        "url":'https://utfs.io/f/f3fe5f08-f1da-4b23-a1c1-f25f74b047b2-mev895.pdf'

      }
    ])
  const {register,handleSubmit,reset,formState:{errors}}=useForm<additionalFormProps>(
    {
      defaultValues:additionalData
    }
  )
  const router = useRouter();
  
  
  async function onSubmit(data:additionalFormProps){
    
    setLoading(true)
   data.id=doctorProfileId
   data.additionalDocs=docs.map((file) => file.url);
    data.page=page
    try {
      const response = await fetch('/api/doctors/additional', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setAdditionalData(data)
          
          toast.success('Profile completed successfully')
          router.push('/login')
      } else {
      toast.error("Something went wrong")
      }
  } catch (error) {
    toast.error("Something went wrong")
  }
  }
  return (
    <div className="w-full mx-auto px-4 py-3">
    <Card className="mx-auto  min-h-screen dark:text-slate-50  text-slate-800">
    <CardHeader className='items-center'>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
      <TextAreaInput name='educationHistory' label='Education History' placeholder='Enter your education History' register={register} errors={errors} />
      <TextAreaInput name='research' label='Published Work or Research' placeholder='Enter your Published Work or Research' register={register} errors={errors} />
      <TextAreaInput name='acoomplisments' label='Any Special Acoomplisments or Awards' placeholder='Enter your Acoomplisments or Awards' register={register} errors={errors} />
      <MultiFileUploader label={'Upload your Academic Documents (max 4)'} files={docs} setFiles={setDocs} className={''} endpoint={''}/>
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
