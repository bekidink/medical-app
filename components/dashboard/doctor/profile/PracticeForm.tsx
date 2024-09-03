"use client"
import { BioDataFormProps, LoginInputProps, PracticeFormProps, PracticeUpdateProps, RegisterInputProps, StepFormProps } from '@/types/types'
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
import { FileState } from '@/components/user/shared/Forms/MultiFileDropzone'
import TextInput from '@/components/user/shared/Forms/TextInput'
import ItemsInput from '@/components/user/shared/Forms/ItemsInput'
import { SelectScrollable } from '@/components/user/shared/Forms/ScrollableSelect'
import { makePutRequest } from '@/lib/apiRequest'
import { Loader } from 'lucide-react'

export default function ProfilePracticeForm({page,title,description,userId,nextPage,data,doctorId}:{page:string,title:string,description:string,userId:string,nextPage:string,data:PracticeUpdateProps,doctorId:string}) {
    const[isloading,setLoading]=useState(false)
    const{trackingNumber:truckingNmber,doctorProfileId,setTrackingNumber,setDoctorProfileId,practiceData,setPracticeData}=useOnboardingContext()
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const[services,setServices]=useState<string[]>(data.servicesOffered??[])
    const[langs,setLangs]=useState<string[]>(data.langaugesSpoken??[])
    console.log(data)

  const {register,handleSubmit,reset,formState:{errors}}=useForm<PracticeUpdateProps>({
    defaultValues:data
  })
  const router = useRouter();

  const [insuranceAccepted,setInsuranceAccepted]=useState(data.insuranceAccepted?'yes': 'no')
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
  
  function redirect(){
    router.push(`/dashboard/doctor/profile/${userId}?page=${nextPage}`)
  }
  async function onSubmit(data:PracticeUpdateProps){
    
    setLoading(true)
    // data.id=doctorProfileId
    data.page=nextPage
    // data.role=role
   data.servicesOffered=services
   data.langaugesSpoken=langs
   data.insuranceAccepted=insuranceAccepted==="yes"?true:false
   const endpoint=`doctor/detail/${doctorId}`
   const resourceName="Contact"
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
      
       <div className="grid grid-cols-2 gap-2">
       <TextInput name={'hospitalName'} register={register} label={'Hospital Name'} errors={errors}/>
       <TextInput name={'hospitalAddress'} register={register} label={'Hospital Address'} errors={errors}/>
       <TextInput name={'hospitalContactNumber'} register={register} label={'Hospital ContactNumber'} errors={errors}/>
       <TextInput name={'hospitalEmailAddress'} register={register} label={'Hospital Email Address'} errors={errors}/>
       <TextInput name={'hospitalWebsite'} register={register} label={'Hospital Website'} errors={errors} required={false}/>
       <TextInput name={'hospitalHoursOfOperation'} register={register} label={'Hospital Hours Of Operation'} errors={errors}/>
       {/* <TextInput type='tel' name={'gc-yr'} register={register} label={'Graduation Year'} errors={errors}/> */}
     
        
        
        
        
        
       </div>
       <ItemsInput setItems={setServices} items={services} itemTitle={' Your Services'} />
       <ItemsInput setItems={setLangs} items={langs} itemTitle={' Languages You Spoke'} />
       <SelectScrollable  title={'Insurance Acceptable'} options={insuranceOptions} selectedOption={insuranceAccepted} setSelectedOption={setInsuranceAccepted}/>
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
