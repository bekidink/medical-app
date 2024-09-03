"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
export type searchQuery={
    query:string
}
export default function SearchBar() {
    const [query,setQuery]=useState('')
    const router=useRouter()
    const {register,handleSubmit,reset,formState:{errors}}=useForm<searchQuery>()
    function handleSearch(data:searchQuery){
router.push(`/search?query=${data.query}`)
    }
  return (
    <form onSubmit={handleSubmit(handleSearch)}  className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
              {...register("query",{required:true})}
                type="search"

                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
  )
}
