import Navbar from '@/components/dashboard/layout/NavBar'
import Sidebar from '@/components/dashboard/layout/Sidebar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

export default async function Layout({children}:{children:ReactNode}) {
  const session=await getServerSession(authOptions)
  const user=session?.user
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar role={user?.role??"USER"}/> 
     <div className="flex flex-col">
     <Navbar role={user?.role??"USER"}/>
     <div className="flex min-h-screen w-full flex-col">
     {children}
     </div>
     
     </div>
    
      
    </div>
  )
}
