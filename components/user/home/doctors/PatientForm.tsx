"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import React, { useState } from 'react'
import { DatePickerInput } from '../../shared/Forms/DatePickerInput'
import { ToggleGroupInput } from '../../shared/Forms/ToggleGroup'
import { Appointment, AppointmentsProps, BioDataFormProps } from '@/types/types'
import { useOnboardingContext } from '@/context/onboarding'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import MultiFileUploader, { File } from '../../shared/Forms/MultiFileUploader'
import TextInput from '../../shared/Forms/TextInput'
import { TextAreaInput } from '../../shared/Forms/TextAreaInput'
import { makePostRequest } from '@/lib/apiRequest'

export default function PatientForm({user,setStep,step,selectedTime,date,id,charge,appointment}:{user:any ,setStep:any,step:number,selectedTime:string,date:any,id:string,charge:any,appointment:Appointment | null | undefined}) {
    const[isloading,setLoading]=useState(false)
    console.log(appointment?.email)
    const{trackingNumber:truckingNmber,doctorProfileId,bioData,setBioData,setTrackingNumber,setDoctorProfileId}=useOnboardingContext()
  const {register,handleSubmit,reset,formState:{errors}}=useForm<AppointmentsProps>(
    {
      defaultValues:{
        email:appointment?.email??user?.email,
        fullName: appointment?.fullName?? user.name,
        phoneNumber:appointment?.phoneNumber??'',
        address:appointment?.address??'',
        occupation:appointment?.occupation??'',
        gender:appointment?.gender??''

      }
    }
  )
  const[imageUrls,setImageUrls]=useState<File[]>([
    {
      "name":'profile',
      "size":37,
      "url":'https://utfs.io/f/f3fe5f08-f1da-4b23-a1c1-f25f74b047b2-mev895.pdf'

    }
  ])
  const router = useRouter();
  const [dob, setDob] = React.useState<Date>(appointment?.dob ?? new Date())
  const radioOptions=[
    {
        label:"Male",
        value:"male"
    },
    {
        label:"Female",
        value:"female"
    },

]


const onSubmit = async (data:AppointmentsProps) => {
  // e.preventDefault();
  const nextPage="profile"
    //   data.userId=userId;
    const resourceName="Appointment"
    data.dob=dob;
   data.appointmentTime=selectedTime
   data.appointmentDate=date
   data.medicdoc=imageUrls.map((item)=>item.url)
   data.doctorId=id
   data.charge=charge
   data.userId=user.id!
   const endpoint=`appointments/${user.id}`
  
   makePostRequest({setLoading,endpoint,resourceName,data})

};
    return (
    <div className="p-8">
    {/* <h1>This is step two</h1> */}
    <Card className="mx-auto  min-h-screen dark:text-slate-50 text-slate-800">
    <CardHeader className='items-center'>
      <CardTitle className="text-xl">This is step {step}</CardTitle>
      <CardDescription>
       {/* {description} */}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
        <>
        {step===1?(
 <>
 <div className="grid grid-cols-2 gap-2">
 <div className="grid gap-2">
      <Label htmlFor="fullName">Full Name</Label>
      <Input id="fullName" type='text' placeholder="Max"   {...register("fullName",{required:true})} className='bg-white text-gray-900' />
      {errors.fullName && <span className='text-red-600 text-sm'>Name is required</span>}
    </div>
    
  
  <div className="grid gap-2">
    <Label htmlFor="email">Email Address</Label>
    <Input
      id="email"
      type="email"
      placeholder="example@gmail.com"
      {...register("email",{required:true})}
      className='bg-white text-gray-900'
    />
     {errors.email && <span className='text-red-600 text-sm'>Email is required</span>}
  </div>
  <div className="grid gap-2">
    <Label htmlFor="phoneNumber">Phone No</Label>
    <Input  id="phoneNumber" type="tel"  {...register("phoneNumber",{required:false})}
    className='bg-white text-gray-900'
    placeholder="+251901108024"
    />
    {errors.phoneNumber && <span className='text-red-600 text-sm'>Phone Number is required</span>}
  </div>
  
  <div className="grid gap-2">
    <Label htmlFor="dob">Date of Birth</Label>
    {/* <Input id="phone" type="date"  {...register("phone",{required:true})}
    className='bg-white'
    placeholder="m@example.com"
    /> */}
    <DatePickerInput date={dob} setDate={setDob} className='text-gray-900'/>
    {/* {errors.dob && <span className='text-red-600 text-sm'>Password is required</span>} */}
  </div>
  <ToggleGroupInput options={radioOptions} title='Gender' name='gender' register={register} errors={errors}/>

  
  
 </div>
 <div className="flex items-center space-x-8">
      <Button variant={"outline"} type='button' onClick={()=>setStep((cur:number)=>cur-1)}>
    Previous
      </Button>
      <Button onClick={()=>setStep((cur:number)=>cur+1)}>
        Next
      </Button>
    </div>
 </>
        ):(
<>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
<TextInput name={'address'} register={register} label={'Address'} errors={errors}/>
<TextInput name={'occupation'} register={register} label={'Occupation'} errors={errors}/>
</div>

<TextAreaInput name={'reason'} register={register} label={'Reason'} errors={errors} placeholder='Appointment reason'/>
       {/* <TextInput name={'reason'} register={register} label={'Reason'} errors={errors}/> */}

       <MultiFileUploader label={'Upload your Medical Documents (max 4)'} files={imageUrls} setFiles={setImageUrls} className={'text-slate-50 dark:text-slate-900'} endpoint={''}/>
       
        <div className="flex justify-between items-center">
        <Button  variant={'outline'} type="button" className=" bg-slate-900 text-center text-slate-50" onClick={()=>setStep((cur:number)=>cur-1)}>
          Prevoius
        </Button>
        <Button  variant={'outline'} type="submit" className=" bg-slate-900 text-center text-slate-50">
         Submit
        </Button>
        </div>
</>
        )}
        </>
        
      
       
        
        </form>
        
      </div>
      
    </CardContent>
  </Card>
 
            </div>
  )
}

