"use client"
import { BioDataFormProps, LoginInputProps, RegisterInputProps, StepFormProps } from '@/types/types'
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

export default function EducationalForm({page,title,description}:StepFormProps) {
    const[isloading,setLoading]=useState(false)
    const[imageUrl,setImageUrl]=useState("")
    const[imageUrls,setImageUrls]=useState<File[]>([])
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const[items,setItems]=useState<string[]>([
        

    ])
  const {register,handleSubmit,reset,formState:{errors}}=useForm<BioDataFormProps>()
  const router = useRouter();
  const [dob, setDob] = React.useState<Date>()
  const [expiry, setExpiry] = React.useState<Date>()
  useEffect(()=>{
console.log(fileStates)
  },[fileStates])
  async function onSubmit(data:BioDataFormProps){
    if(!dob){
        toast.error("Please select your date of birth")
        return;
    }
    if(!expiry){
        toast.error("Please select your medical license expiry")
    }
    setLoading(true)
    data.dob=dob;
    data.medicalLicenseExpiry=expiry;
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
      <TextInput name={'medicalSchool'} register={register} label={'Medical School'} errors={errors}/>
       <div className="grid grid-cols-2 gap-2">
       <TextInput type='tel' name={'gc-yr'} register={register} label={'Graduation Year'} errors={errors}/>
       {/* <TextAreaInput name='medicalLicense' label='Medical-License' placeholder='Enter Medical License' register={register} errors={errors} /> */}
     <SelectInput label={'Select Your Primary Specializations'} name={'speciality'} register={register} className={''} options={[
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
        <MultiFileUploader label={'Upload your Academic Documents (max 4)'} files={imageUrls} setFiles={setImageUrls} className={''} endpoint={''}/>
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
