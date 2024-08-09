"use client"
import React, { useState } from 'react'

export default function DoctorDetails() {
    const[isActive,setIsActive]=useState('availability')
  return (
    <div>
      <div className="flex items-center justify-between uppercase tracking-widest">
        <button onClick={()=>setIsActive('detail')} className={isActive==="detail"?'py-4 px-8 w-full bg-blue-600 text-white':'py-4 px-8 w-full bg-slate-50 text-slate-800'}>
            Service Details

        </button>
        <button onClick={()=>setIsActive('availability')} className={isActive==="availability"?'py-4 px-8 w-full bg-blue-600 text-white':'py-4 px-8 w-full bg-slate-50 text-slate-800'}>
            Availability

        </button>
      </div>
      <div className="py-8 px-6">
        {isActive==="availability"?(
 <div className="">Service Detaials</div>
        ):(
<div className="">Service Detaials</div>
        )}
       
        
      </div>
    </div>
  )
}
