import { specialityResponse } from '@/types/types';
import Link from 'next/link'
import React from 'react'
type LinkProps={
  title:string;
  slug:string;
}
export default function LinkCards({className,specialities,title=''}:{className:string,specialities:specialityResponse[],title?:string}) {
  
  return (
    <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
{specialities.map((item,i)=>{
  return (
    <Link key={i} href={ title===''? `/specialities/${item.slug}`:`/symptoms/${item.id}`} className={`rounded-md py-3 px-6 bg-slate-800 text-slate-50 flex gap-4 ${className}`}>
    <h2>{item.title}</h2>
    <span aria-hidden="true">&rarr;</span>
    </Link>
  )
})}

   
    </div>
   
  )
}

