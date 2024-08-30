"use client"
import { BioDataFormProps, LoginInputProps, PracticeFormProps, RegisterInputProps, StepFormProps } from '@/types/types'
import React, { useEffect, useState } from 'react'
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

import { useRouter } from "next/navigation";

import ItemsInput from '../shared/Forms/ItemsInput'

import { FileState } from '../shared/Forms/MultiFileDropzone'
import  { File } from '../shared/Forms/MultiFileUploader'
import { SelectScrollable } from '../shared/Forms/ScrollableSelect'
import { useOnboardingContext } from '@/context/onboarding'
import toast from 'react-hot-toast'

export default function PracticeForm({page,title,description,nextPage}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,setTrackingNumber,setDoctorProfileId,practiceData,setPracticeData}=useOnboardingContext()
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const[services,setServices]=useState<string[]>(practiceData.servicesOffered??[])
    const[langs,setLangs]=useState<string[]>(practiceData.langaugesSpoken??[])
  const {register,handleSubmit,reset,formState:{errors}}=useForm<PracticeFormProps>({
    defaultValues:practiceData
  })
  const router = useRouter();

  const [insuranceAccepted,setInsuranceAccepted]=useState(practiceData.insuranceAccepted?'yes': 'no')
  const insuranceOptions=[
    {
      title:"Yes",
      value:"yes"
    },
    {
      title:"No",
      value:"no"
    }
  ]
  
  
  async function onSubmit(data:PracticeFormProps){
    
    setLoading(true)
    data.id=doctorProfileId
    data.page=nextPage
    // data.role=role
   data.servicesOffered=services
   data.langaugesSpoken=langs
   data.insuranceAccepted=insuranceAccepted==="yes"?true:false
   try {
    const response = await fetch('/api/doctors/practice', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      
        toast.success('Practice created Successfully')
        router.push(`/onboarding/66bc55c24e6e9fe0c723d1b3?page=additional`)
    } else {
      toast.error(result.error)
    }
} catch (error) {
    toast.error("Something went wrong")
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
      
       <div className="grid grid-cols-2 gap-2">
       <TextInput name={'hospitalName'} register={register} label={'Hospital Name'} errors={errors}/>
       <TextInput name={'hospitalAddress'} register={register} label={'Hospital Address'} errors={errors}/>
       <TextInput name={'hospitalContactNumber'} register={register} label={'Hospital ContactNumber'} errors={errors}/>
       <TextInput name={'hospitalEmailAddress'} register={register} label={'Hospital Email Address'} errors={errors}/>
       <TextInput name={'hospitalWebsite'} register={register} label={'Hospital Website'} errors={errors} required={false}/>
       <TextInput name={'hospitalHoursOfOperation'} register={register} label={'Hospital Hours Of Operation'} errors={errors}/>
       <TextInput type='tel' name={'gc-yr'} register={register} label={'Graduation Year'} errors={errors}/>
     
        
        
        
        
        
       </div>
       <ItemsInput setItems={setServices} items={services} itemTitle={' Your Services'} />
       <ItemsInput setItems={setLangs} items={langs} itemTitle={' Languages You Spoke'} />
       <SelectScrollable  title={'Insurance Acceptable'} options={insuranceOptions} selectedOption={insuranceAccepted} setSelectedOption={setInsuranceAccepted}/>
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
