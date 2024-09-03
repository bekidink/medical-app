"use client"
import {  EducationFormProps,  EducationUpdateProps,  specialityResponse,  StepFormProps } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import MultiFileUploader, { File } from '@/components/user/shared/Forms/MultiFileUploader'
import { FileState } from '@/components/user/shared/Forms/MultiFileDropzone'
import TextInput from '@/components/user/shared/Forms/TextInput'
import SelectInput from '@/components/user/shared/Forms/SelectInput'
import ItemsInput from '@/components/user/shared/Forms/ItemsInput'
import { makePutRequest } from '@/lib/apiRequest'

export default function ProfileEducationalForm({page,title,description,userId,nextPage,data,specialities,doctorId}:{page:string,doctorId:string,specialities:specialityResponse[],title:string,description:string,userId:string,nextPage:string,data:EducationUpdateProps}) {
    const[isloading,setLoading]=useState(false)
    
    const{trackingNumber:truckingNmber,doctorProfileId,
      educationData,setEducationData
    }=useOnboardingContext()
    const[imageUrls,setImageUrls]=useState<File[]>(
      data.boardCertificates.map((item:any)=>{
        return{
          "name":'profile',
          "size":37,
          "url":item
        }
      })??
      [
      {
        "name":'profile',
        "size":37,
        "url":'https://utfs.io/f/f3fe5f08-f1da-4b23-a1c1-f25f74b047b2-mev895.pdf'

      }
    ])
    const [fileStates, setFileStates] = useState<FileState[]>([
      
    ]);
    const[items,setItems]=useState<string[]>(data.otherSpecialties??[])
  const {register,handleSubmit,reset,formState:{errors}}=useForm<EducationUpdateProps>(
    {
      defaultValues:data
    }
  )
  const router = useRouter();
  
  
 
  function redirect(){
    router.push(`/dashboard/doctor/profile/${userId}?page=${nextPage}`)
  }
  async function onSubmit(data:EducationUpdateProps){
    
    setLoading(true)
    // data.id=doctorProfileId
    data.otherSpecialties=items
    data.boardCertificates=imageUrls.map((file) => file.url);
    const endpoint=`doctor/detail/${doctorId}`
    const resourceName="Education"
   makePutRequest({setLoading,endpoint,resourceName,data,redirect})
    // data.role=role
   
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
     <SelectInput  label={'Select Your Primary Specializations'} name={'primarySpecialization'} register={register} className={''} options={specialities??[]} multiple={false} />
        
        
        
        
        
       </div>
       <ItemsInput setItems={setItems} items={items} itemTitle={' Other Specialties'} />
        <MultiFileUploader label={'Upload your Academic Documents (max 4)'} files={imageUrls} setFiles={setImageUrls} className={'text-slate-50 dark:text-slate-900'} endpoint={''}/>
        {/* <MultiFileInput fileStates={fileStates} setFileStates={setFileStates}/> */}
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
