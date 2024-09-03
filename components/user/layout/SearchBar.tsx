"use client"
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'
import { searchQuery } from '../SearchBar'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'

export default function SearchBar() {
  const router=useRouter()
  const {register,handleSubmit,reset,formState:{errors}}=useForm<searchQuery>()
  function handleSearch(data:searchQuery){
router.push(`/search?query=${data.query}`)
  }
  return (
    
<form onSubmit={handleSubmit(handleSearch)} className="max-w-md ">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <MagnifyingGlassIcon className='w-4 h-4 text-gray-500 dark:text-gray-400'/>
            
        </div>
        <Input
              {...register("query",{required:true})}
                type="search"

                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-slate-950 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
    </div>
</form>

  )
}
