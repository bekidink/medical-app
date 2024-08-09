import Navbar from '@/components/dashboard/layout/NavBar'
import Sidebar from '@/components/dashboard/layout/Sidebar'
import React, { ReactNode } from 'react'

export default function Layout({children}:{children:ReactNode}) {
  return (
    <div>
     <Navbar/>
     <Sidebar/>
      {children}
    </div>
  )
}
