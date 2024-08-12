"use client"
import { LoginInputProps, RegisterInputProps } from '@/types/types'
import { Span } from 'next/dist/trace'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../shared/Forms/TextInput'
import SubmitButton from '../shared/Forms/SubmitButton'
import { createUser } from '@/Actions/users'
import { UserRole } from '@prisma/client'
import toast from 'react-hot-toast'

export default function RegisterForm({role="USER"}:{role?:UserRole}) {
  const[isloading,setLoading]=useState(false)
  const {register,handleSubmit,reset,formState:{errors}}=useForm<RegisterInputProps>()
  async function onSubmit(data:RegisterInputProps){
    setLoading(true)
    data.role=role

    try {
  
 const user= await createUser(data);
 if(user && user.status===200){
  toast.success("User Created Successfully")
 }else{
  // toast.error(${user.error})
 }
  reset()
  setLoading(false)
} catch (error) {
  setLoading(false)
}
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST" className="space-y-6">
          <TextInput label='User Name' register={register} name='name' errors={errors}/>
            
            <TextInput label='Email Address' register={register} name='email' errors={errors} type='email'/>
            <TextInput label='Phone Number' register={register} name='phone' errors={errors} type='tel'/>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                {...register("password",{required:true})}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.password && <span className='text-red-600 text-sm'>This field is required</span>}
              </div>
            </div>

            <SubmitButton title='Sign Up' loadingTitle='Creating please wait...' isLoading={isloading}  />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have Account ?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign In
            </a>
          </p>
        </div>
      </div>
  )
}
