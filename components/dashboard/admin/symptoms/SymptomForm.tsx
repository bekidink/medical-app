"use client"
import {  EducationFormProps,  serviceFormProps,  specialityFormProps,  specialityResponse,  StepFormProps, symptomFormProps } from '@/types/types'
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
import SelectInput from '@/components/user/shared/Forms/SelectInput'
import MultiFileUploader, { File } from '@/components/user/shared/Forms/MultiFileUploader'
import ItemsInput from '@/components/user/shared/Forms/ItemsInput'
import TextInput from '@/components/user/shared/Forms/TextInput'
import { FileState } from '@/components/user/shared/Forms/MultiFileDropzone'
import ImageInput from '@/components/user/shared/Forms/ImageInput'
import Link from 'next/link'
import { Loader, X } from 'lucide-react'
import { generateSlug } from '@/lib/utils'
import { makePostRequest, makePutRequest } from '@/lib/apiRequest'

export default function SymptomForm({title,description,isEdit=false,data}:{title:string,description:string,isEdit?:boolean,data?:specialityResponse}) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,
      educationData,setEducationData
    }=useOnboardingContext()
    console.log(data)
    const[imageUrls,setImageUrls]=useState<File[]>([
      {
        "name":'profile',
        "size":37,
        "url":'https://utfs.io/f/f3fe5f08-f1da-4b23-a1c1-f25f74b047b2-mev895.pdf'

      }
    ])
    const [fileStates, setFileStates] = useState<FileState[]>([
      
    ]);
    const [imageUrl,setImageUrl]=useState("")
    const[items,setItems]=useState<string[]>(educationData.otherSpecialties??[])
  const {register,handleSubmit,reset,formState:{errors}}=useForm<symptomFormProps>(
    {
      defaultValues:data
    }
  )
  const router = useRouter();
  
  
  useEffect(()=>{
console.log(fileStates)
  },[fileStates])
  const id=data?.id
  async function onSubmit(data:symptomFormProps){
    const resourceName="Symptom"
    const endpoint="admin/symptoms"
    setLoading(true)
    data.slug=generateSlug(data.title)
    if(isEdit){
        const endpoint=`admin/symptoms/${id}`
        makePutRequest({setLoading,endpoint,resourceName,data})
    }else{
        makePostRequest({setLoading,endpoint,resourceName,data})
    }
   
  }
  return (
    <div className="w-full mx-auto px-4 py-3     ">
    <Card className="mx-auto  min-h-screen dark:text-slate-50 text-slate-800">
    <CardHeader className='flex flex-row items-center justify-center'>
      <CardTitle className="text-xl mx-auto">{title}</CardTitle>
      {/* <CardDescription>
        {description}
      </CardDescription> */}
      <Button asChild variant={"outline"}>
        <Link href={'/dashboard/symptoms'}>
        <X className='w-4 h-4'/>
        </Link>
      </Button>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
      <TextInput name={'title'} register={register} label={'Symptom Name'} errors={errors}/>
      {/* <TextInput name={''} register={register} label={'Service Name'} errors={errors}/> */}
       
      {/* <ImageInput label='Professional Image' imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint='' className='' /> */}
        <div className="flex justify-center items-center">
        {isloading?(<button
          
          disabled
          className="flex items-center w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        <Loader className='w-4 h-4 mr-2 flex-shrink-0 animate-spin'/>  Saving please wait...
        </button>):(<Button  variant={'outline'} type="submit" className=" bg-slate-900 text-center text-slate-50">
          Save 
        </Button>)}
        
        </div>
        
        </form>
        
      </div>
      
    </CardContent>
  </Card>
    
  </div>
  )
}
