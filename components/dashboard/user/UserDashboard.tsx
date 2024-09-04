import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getData } from '@/lib/utils'
import { Calendar, DollarSign, MessageCircle, Users } from 'lucide-react'
import { Session } from 'next-auth'
import React from 'react'

export default async  function UserDashboard({session}:{session:Session}) {
  const user=session.user
  const stats=await getData(`user/stats/${user.id}`)
  return (
    <div className='px-8 py-4'>
    <h1 className="scroll-m-20 mb-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Welcome Dr. <span className='capitalize'>{user.name}</span>
  </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<Card>
<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
  <CardTitle className='text-sm font-medium'>
    Appointments

  </CardTitle>
<Calendar className='w-4 h-4'/>
</CardHeader>
<CardContent>
            <div className="text-2xl font-bold">{stats.appointments}</div>
           
          </CardContent>
</Card>
<Card>
<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
  <CardTitle className='text-sm font-medium'>
    Doctors

  </CardTitle>
<Users className='w-4 h-4'/>
</CardHeader>
<CardContent>
            <div className="text-2xl font-bold">{stats.doctors}</div>
           
          </CardContent>
</Card>
<Card>
<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
  <CardTitle className='text-sm font-medium'>
    Inboxes

  </CardTitle>
<MessageCircle className='w-4 h-4'/>
</CardHeader>
<CardContent>
            <div className="text-2xl font-bold">{stats.inboxes}</div>
           
          </CardContent>
</Card>
    </div>
  </div>
  )
}
