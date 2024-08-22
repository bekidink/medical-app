"use client"
import {  EducationFormProps,  StepFormProps } from '@/types/types'
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

import SelectInput from '../shared/Forms/SelectInput'
import ItemsInput from '../shared/Forms/ItemsInput'

import { FileState } from '../shared/Forms/MultiFileDropzone'
import MultiFileUploader, { File } from '../shared/Forms/MultiFileUploader'
import { useOnboardingContext } from '@/context/onboarding'
import toast from 'react-hot-toast'

export default function EducationalForm({page,title,description,nextPage}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,
      educationData,setEducationData
    }=useOnboardingContext()
    const[imageUrls,setImageUrls]=useState<File[]>([
      {
        "name":'profile',
        "size":37,
        "url":'https://utfs.io/f/f3fe5f08-f1da-4b23-a1c1-f25f74b047b2-mev895.pdf'

      }
    ])
    const [fileStates, setFileStates] = useState<FileState[]>([
      
    ]);
    const[items,setItems]=useState<string[]>(educationData.otherSpecialties??[])
  const {register,handleSubmit,reset,formState:{errors}}=useForm<EducationFormProps>(
    {
      defaultValues:educationData
    }
  )
  const router = useRouter();
  
  
  useEffect(()=>{
console.log(fileStates)
  },[fileStates])
  async function onSubmit(data:EducationFormProps){
    
    setLoading(true)
    data.id=doctorProfileId
    data.otherSpecialties=items
    data.boardCertificates=imageUrls.map((file) => file.url);
    data.page=nextPage
    // data.role=role
    try {
      const response = await fetch('/api/doctors/education', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
          setEducationData(data)
          toast.success("Education updated Successfully")
          router.push(`/onboarding/66bc55c24e6e9fe0c723d1b3?page=practice`)
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
      <TextInput name={'medicalSchool'} register={register} label={'Medical School'} errors={errors}/>
       <div className="grid grid-cols-2 gap-2">
       <TextInput type='tel' name={'graduationYear'} register={register} label={'Graduation Year'} errors={errors}/>
     <SelectInput label={'Select Your Primary Specializations'} name={'primarySpecialization'} register={register} className={''} options={[
        {
            title:'medic',
            id:'1'
        },
        {
            title:'medical',
            id:'2'
        },
        {
            title:'general',
            id:'3'
        }
     ]} multiple={false} />
        
        
        
        
        
       </div>
       <ItemsInput setItems={setItems} items={items} itemTitle={' Other Specialties'} />
        <MultiFileUploader label={'Upload your Academic Documents (max 4)'} files={imageUrls} setFiles={setImageUrls} className={'text-slate-50 dark:text-slate-900'} endpoint={''}/>
        {/* <MultiFileInput fileStates={fileStates} setFileStates={setFileStates}/> */}
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
