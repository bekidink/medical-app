import DoctorDashboard from '@/components/dashboard/doctor/DoctorDashboard'
import Dashboard from '@/components/dashboard/home/Dashboard'
import UserDashboard from '@/components/dashboard/user/UserDashboard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session=await getServerSession(authOptions)
  const user=session?.user;
  const role=user?.role
  if(!user){
    return <p>Not Authorize</p>
  }
  return (
    <div>
      {role==="DOCTOR"?<DoctorDashboard session={session!}/>:role==="ADMIN"?<Dashboard/>:<UserDashboard session={session!}/>}
      
    </div>
  )
}
