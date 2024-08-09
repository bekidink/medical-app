import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function FixedBookButton() {
  return (
    <div className="fixed bottom-0 w-full z-50  shadow-2xl py-8 px-6 rounded-md   border border-gray-200 mx-auto">
       <div className="flex max-w-4xl mx-auto justify-between gap-4 items-center">
       <div className="w-full">
          <p className='text-xl font-bold'>$45</p>
          <p className='font-semibold text-sm'>Mon,Aug 23 - 4:30 PM </p>
        </div>
<Button variant={'outline'} className='inline-flex items-center justify-center w-1/2 tracking-widest uppercase px-4 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 hover:text-slate-50'>
  <Plus className='w-5 h-5 mr-1'/>
  Book
</Button>
       </div>
      </div>
  )
}
