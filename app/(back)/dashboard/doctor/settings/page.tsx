import Settings from '@/components/dashboard/doctor/settings/Settings'
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import React from 'react'

export default  function page() {
  
  return (
    <div>
      <Settings/>
    </div>
  )
}
