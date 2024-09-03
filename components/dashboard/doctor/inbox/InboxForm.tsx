"use client"
import {  EducationFormProps,  InboxProps,  serviceFormProps,  serviceResponse,  StepFormProps } from '@/types/types'
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
import FormSelectInput from '@/components/user/shared/Forms/FormSelectInputs'
import { Appointment } from '@prisma/client'
import { Option, Options } from 'react-tailwindcss-select/dist/components/type'
import dynamic from 'next/dynamic'
import { Session } from 'next-auth'
const QuillEditor = dynamic(
    () => import("@/components/user/shared/Forms/QuillEditor"),
    {
      ssr: false,
    }
  );
export default function InboxForm({title,description,backlink="/dashboard/doctor/inbox",isEdit=false,data,session}:{title:string,description:string,isEdit?:boolean,data?:Options,session:Session | null,backlink?:string}) {
    const[isloading,setLoading]=useState(false)
    
    const [selectedUser,setSelectedUser]=useState<any>(null)
   
  
  const {register,handleSubmit,reset,formState:{errors}}=useForm<InboxProps>(
   
  )
 
  
  
  useEffect(()=>{
console.log(data)
  },[])
  const router=useRouter()
  function redirect(){
    router.push(backlink)
  }
  async function onSubmit(data:InboxProps){
    const resourceName="Inbox"
    console.log(selectedUser)
    setLoading(true)
    data.senderId=session?.user.id??''
    data.senderEmail=session?.user.email??''
    data.senderName=session?.user.name??''
    data.body=content
    data.recieverId=selectedUser.value

    // console.log(data,selectedUser)
//     if(isEdit){
//         const endpoint=`admin/services/${id}`
// makePutRequest({setLoading,endpoint,resourceName,data})
//     }else{
        const endpoint="doctor/inbox"
        makePostRequest({setLoading,endpoint,resourceName,data,redirect})
//     }
  }
 
  const [content, setContent] = useState("");
  return (
    <div className="w-full mx-auto px-4 py-3     ">
    <Card className="mx-auto  min-h-screen dark:text-slate-50 text-slate-800">
    <CardHeader className='flex flex-row items-center justify-center'>
      <CardTitle className="text-xl mx-auto">{title}</CardTitle>
      {/* <CardDescription>
        {description}
      </CardDescription> */}
      <Button asChild variant={"outline"}>
        <Link href={backlink}>
        <X className='w-4 h-4'/>
        </Link>
      </Button>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
        <FormSelectInput label='Users' options={data || []} option={selectedUser} setOption={setSelectedUser} />
      <TextInput name={'subject'} register={register} label={'Subject'} errors={errors}/>
      
      <QuillEditor
    label="Write the Content of the Meeting"
    className=""
    value={content}
    onChange={setContent}
              />
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
