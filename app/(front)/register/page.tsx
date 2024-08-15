import RegisterForm from '@/components/user/auth/RegisterForm'
import { UserRole } from '@prisma/client';
import React from 'react'

export default function page({searchParams}:{
  searchParams:{[key:string]:string | string | string[] | undefined}
}) {
  const {role,plan}=searchParams;
  console.log(role,plan)
 
  return (
    <div className='bg-blue-100 dark:bg-slate-950 min-h-screen py-8'>
       
<div className=" w-full max-w-5xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
<RegisterForm role={role==="DOCTOR"?UserRole.DOCTOR:UserRole.USER} plan={plan} />
</div>
    </div>
  
  )
}
