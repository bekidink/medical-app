"use client"
import { Button } from '@/components/ui/button'
import { makeDeleteRequest } from '@/lib/apiRequest'
import { serviceFormProps, specialityFormProps, specialityResponse } from '@/types/types'
import { Loader, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import DeleteAlert from '../../shared/DeleteAlert'
export default function SpecialityCard({title,slug,id}:specialityResponse) {
    const [isLoading,setLoading]=useState(false)
    function handleDelete(){
        const endpoint=`admin/specialities/${id}`
        const resourceName="Speciality"
        makeDeleteRequest({setLoading,endpoint,resourceName})
    }
  return (
    <div  className='border mb-2  text-xs flex items-center justify-between   py-3 px-2 w-full rounded-md'>
    <div className="flex items-center gap-2">
        {/* <Image src={imageUrl} alt='' width={62} height={62} className='w-34 h-34' /> */}
        <h2>{title}</h2>
        
    </div>
    <div className="flex items-center justify-between gap-2">
    <Link href={`/dashboard/specialities/update/${id}`}>
    <Pencil className='w-4 h-4 flex-shrink-0'/>
    </Link>
   
    <DeleteAlert title='speciality' isLoading={isLoading} handleDelete={handleDelete}/>
    </div>
    
    </div>
  )
}
