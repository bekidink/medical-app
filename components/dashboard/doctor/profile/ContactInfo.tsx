"use client"
import { BioDataFormProps, contactFormProps, contactUpdateProps, LoginInputProps, RegisterInputProps, StepFormProps } from '@/types/types'
import { Span } from 'next/dist/trace'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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

import { useRouter } from "next/navigation";


import { useOnboardingContext } from '@/context/onboarding'
import { Country, State, City } from 'country-state-city';
import { Loader } from 'lucide-react'
import { FileState } from '@/components/user/shared/Forms/MultiFileDropzone'
import TextInput from '@/components/user/shared/Forms/TextInput'
import { makePutRequest } from '@/lib/apiRequest'
export default function ProfileContactInfo({page,title,description,userId,nextPage,data,doctorId}:{page:string,title:string,description:string,userId:string,nextPage:string,data:contactUpdateProps,doctorId:string}) {
    const[isloading,setLoading]=useState(false)
    console.log(doctorId)
    const{trackingNumber:truckingNmber,doctorProfileId,contactData,setContactData}=useOnboardingContext()
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [selectedCountry, setSelectedCountry] = useState(data.country??'');
    const [selectedState, setSelectedState] = useState(data.state??'');
  
    const countries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
    const cities = selectedState ? City.getCitiesOfState(selectedCountry,selectedState) : [];
  const {register,handleSubmit,reset,formState:{errors}}=useForm<contactUpdateProps>({
    defaultValues:data
  })
  const router = useRouter();

  const handleCountryChange = (event:any) => {
    setSelectedCountry(event.target.value);
    setSelectedState(''); // Reset state when country changes
  };

  const handleStateChange = (event:any) => {
    setSelectedState(event.target.value);
  };
  function redirect(){
    router.push(`/dashboard/doctor/profile/${userId}?page=${nextPage}`)
  }
  async function onSubmit(data:contactUpdateProps){
    setLoading(true)
  
    
    data.page=nextPage
    
    // data.id=doctorProfileId
    const endpoint=`doctor/detail/${doctorId}`
    const resourceName="Contact"
   makePutRequest({setLoading,endpoint,resourceName,data,redirect})
  
   
  }
  return (
    <div className="w-full mx-auto px-4 py-3    ">
    <Card className="mx-auto  min-h-screen dark:text-slate-100 text-slate-800">
    <CardHeader className='items-center'>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
      <TextInput name={'email'} register={register} label={'Email Address'} errors={errors} type='email'/>
       <div className="grid grid-cols-2 gap-2">
       <TextInput type='tel' name={'phone'} register={register} label={'Phone'} errors={errors}/>
       {/* <TextAreaInput name='medicalLicense' label='Medical-License' placeholder='Enter Medical License' register={register} errors={errors} /> */}
       {/* <TextInput  name={'country'} register={register} label={'Country'} errors={errors}/> */}
       <div className='rounded-md'>
        <label htmlFor="country">Country</label>
        <select
        className='text-gray-800'
          id="country"
          {...register('country', { required: 'Country is required' })}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>
       {/* <TextInput  name={'city'} register={register} label={'City'} errors={errors}/> */}
       <div className='overflow-hidden rounded-md'>
        <label htmlFor="state">State</label>
        <select
        className='text-gray-800 '
          id="state"
          {...register('state', { required: 'State is required' })}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
        {errors.state && <p>{errors.state.message}</p>}
      </div>
       {/* <TextInput   name={'state'} register={register} label={'State'} errors={errors}/> */}
        
       <div className='overflow-hidden flex flex-col rounded-md'>
        <label htmlFor="city">City</label>
        <select
          id="city"
          {...register('city', { required: 'City is required' })}
          disabled={!selectedState}
          className='text-gray-800'
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.city && <p>{errors.city.message}</p>}
      </div>
        
        
       </div>
       
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