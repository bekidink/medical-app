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
export default function RegisterForm({role="USER",plan=""}:{role?:undefined| UserRole,plan?:string| string[]| undefined}) {
  const[isloading,setLoading]=useState(false)
  const {register,handleSubmit,reset,formState:{errors}}=useForm<RegisterInputProps>()
  const router = useRouter();
  async function onSubmit(data:RegisterInputProps){
    setLoading(true)
    data.role=role

    try {
  
 const user= await createUser(data);
 if(user && user.status===200){
  toast.success("User Created Successfully")
  router.push(`/verify-account/${user.data?.id}`)
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
    <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[700px]">
      <Card className="mx-auto max-w-sm max-h-[600px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Full Name</Label>
              <Input id="first-name" placeholder="Max"   {...register("name",{required:true})}  />
              {errors.name && <span className='text-red-600 text-sm'>Name is required</span>}
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div> */}
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email",{required:true})}
            />
             {errors.email && <span className='text-red-600 text-sm'>Email is required</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"  {...register("password",{required:true})} />
            {errors.password && <span className='text-red-600 text-sm'>Password is required</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel"  {...register("phone",{required:true})} />
            {errors.password && <span className='text-red-600 text-sm'>Password is required</span>}
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          </form>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/doctor.jfif"
          alt="Image"
          width="1420"
          height="780"
          className=" object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
