"use client"
import { additionalFormProps, BioDataFormProps, LoginInputProps, RegisterInputProps, StepFormProps } from '@/types/types'
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
import MultiFileUploader, { File } from '../shared/Forms/MultiFileUploader'

export default function AdditionalInfoForm({page,title,description}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const[imageUrl,setImageUrl]=useState("")
    const[docs,setDocs]=useState<File[]>([])
  const {register,handleSubmit,reset,formState:{errors}}=useForm<additionalFormProps>()
  const router = useRouter();
  const [dob, setDob] = React.useState<Date>()
  const [expiry, setExpiry] = React.useState<Date>()
  async function onSubmit(data:additionalFormProps){
    if(!dob){
        toast.error("Please select your date of birth")
        return;
    }
    if(!expiry){
        toast.error("Please select your medical license expiry")
    }
    setLoading(true)
  
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
