import Footer from '@/components/user/layout/Footer'
import MegaMenu from '@/components/user/layout/MegaMenu'
import Navbar from '@/components/user/Navbar'

import React, { ReactNode } from 'react'

export default async function Layout({children}:{children:ReactNode}) {
//  const session= useSession()

  return (
    <div className='bg-white dark:bg-slate-950'>
      <Navbar  />
      {/* <div className="bg-white z-50  right-0 mx-auto py-4 fixed top-20 w-full border-t border-gray-400/30">
      <MegaMenu/>
      </div> */}
      <div className="">
      {children}
      </div>
      
      <Footer/>
    </div>
  )
}
