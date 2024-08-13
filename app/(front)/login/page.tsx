import LoginForm from '@/components/user/auth/LoginForm'
import React from 'react'

export default function page() {
  return (
    <div className='bg-blue-100 dark:bg-slate-950 min-h-screen py-8'>
        {/* <div className="grid md:grid-cols-2 grid-cols-1 w-full max-w-5xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"> */}
            {/* <div className="hidden md:flex linear-bg overflow-hidden">

            </div> */}
<div className="w-full max-w-5xl mx-auto p-4 bg-white  border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <LoginForm/>
</div>
        {/* </div> */}
      
    </div>
  )
}
