"use client"
import { additionalFormProps,  additionalUpdateProps,  StepFormProps } from '@/types/types'
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

import { useOnboardingContext } from '@/context/onboarding'
import { Loader } from 'lucide-react'
import MultiFileUploader, { File } from '@/components/user/shared/Forms/MultiFileUploader'
import { TextAreaInput } from '@/components/user/shared/Forms/TextAreaInput'
import { makePutRequest } from '@/lib/apiRequest'

export default function ProfileAdditionalInfoForm({page,title,description,userId,nextPage,data,doctorId}:{page:string,title:string,description:string,userId:string,nextPage:string,data:additionalUpdateProps,doctorId:string}) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,additionalData,setAdditionalData}=useOnboardingContext()
    const[docs,setDocs]=useState<File[]>(
      data.additionalDocs.map((item:any)=>{
        return {
          "name":'profile',
        "size":37,
        "url":item
        }
      })
     )
  const {register,handleSubmit,reset,formState:{errors}}=useForm<additionalUpdateProps>(
    {
      defaultValues:data
    }
  )
  const router = useRouter();
  function redirect(){
    router.push(`/dashboard`)
  }
  
  async function onSubmit(data:additionalUpdateProps){
    
    setLoading(true)
  //  data.id=doctorProfileId
   data.additionalDocs=docs.map((file) => file.url);
    data.page=page
    const endpoint=`doctor/detail/${doctorId}`
    const resourceName="Profile"
   makePutRequest({setLoading,endpoint,resourceName,data,redirect})
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
      <TextAreaInput  name='educationHistory' label='Education History' placeholder='Enter your education History' register={register} errors={errors} />
      <TextAreaInput name='research' label='Published Work or Research' placeholder='Enter your Published Work or Research' register={register} errors={errors} />
      <TextAreaInput name='acoomplisments' label='Any Special Acoomplisments or Awards' placeholder='Enter your Acoomplisments or Awards' register={register} errors={errors} />
      <MultiFileUploader label={'Upload your Academic Documents (max 4)'} files={docs} setFiles={setDocs} className={''} endpoint={''}/>
        <div className="flex justify-center items-center">
          {isloading?(
            <Button  variant={'outline'} disabled className=" bg-slate-900 text-center text-slate-50">
              <Loader className='w-4 h-4 animate-spin'/>
            Saving please wait...
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
