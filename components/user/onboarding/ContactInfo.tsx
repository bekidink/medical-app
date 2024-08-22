"use client"
import { BioDataFormProps, contactFormProps, LoginInputProps, RegisterInputProps, StepFormProps } from '@/types/types'
import { Span } from 'next/dist/trace'
import React, { useEffect, useState } from 'react'
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
import SelectInput from '../shared/Forms/SelectInput'
import ItemsInput from '../shared/Forms/ItemsInput'
import MultiImageInput from '../shared/Forms/MultiImageInput'
import { MultiFileInput } from '../shared/Forms/MultiFileInput'
import { FileState } from '../shared/Forms/MultiFileDropzone'
import MultiFileUploader, { File } from '../shared/Forms/MultiFileUploader'
import { useOnboardingContext } from '@/context/onboarding'

export default function ContactInfo({page,title,description,nextPage}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,contactData,setContactData}=useOnboardingContext()
    const [fileStates, setFileStates] = useState<FileState[]>([]);
   
  const {register,handleSubmit,reset,formState:{errors}}=useForm<contactFormProps>({
    defaultValues:contactData
  })
  const router = useRouter();


  async function onSubmit(data:contactFormProps){
    setLoading(true)
    data.id=doctorProfileId
    data.page=nextPage
    try {
      const response = await fetch('/api/doctors/contact', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
          setContactData(data)
          toast.success("Contact updated Successfully")
          router.push(`/onboarding/66bc55c24e6e9fe0c723d1b3?page=${nextPage}`)
      } else {
        toast.error(result.error)
      }
  } catch (error) {
    toast.error("Something went wrong")
  }
  }
  return (
    <div className="w-full mx-auto px-4 py-3    ">
    <Card className="mx-auto  min-h-screen dark:text-slate-100 text-slate-800">
    <CardHeader className='items-center'>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
      <TextInput name={'email'} register={register} label={'Email Address'} errors={errors} type='email'/>
       <div className="grid grid-cols-2 gap-2">
       <TextInput type='tel' name={'phone'} register={register} label={'Phone'} errors={errors}/>
       {/* <TextAreaInput name='medicalLicense' label='Medical-License' placeholder='Enter Medical License' register={register} errors={errors} /> */}
       <TextInput  name={'country'} register={register} label={'Country'} errors={errors}/>
       <TextInput  name={'city'} register={register} label={'City'} errors={errors}/>
       <TextInput   name={'state'} register={register} label={'State'} errors={errors}/>
        
        
        
        
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
