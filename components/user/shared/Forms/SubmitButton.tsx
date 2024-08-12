import { Loader } from 'lucide-react';
import React from 'react'
type SubmitButtonProps={
    title:string;
    type?:"submit"| "reset" | "button" | undefined;
    isLoading:boolean,
    loadingTitle:string
}
export default function SubmitButton({title,type="submit",isLoading=false,loadingTitle}:SubmitButtonProps) {
  return (
    <>
    {isLoading?(
       
        <button
          type={type}
          disabled
          className="flex items-center w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        <Loader className='w-4 h-4 mr-2 flex-shrink-0 animate-spin'/>  {loadingTitle}
        </button>
      
    ):(
        <div>
              <button
                type={type}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {title}
              </button>
            </div>
    )}
    </>
    
  )
}
