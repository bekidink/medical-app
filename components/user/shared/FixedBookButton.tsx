import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function FixedBookButton() {
  return (
    <div className="fixed bottom-0 w-full z-50 bg-white dark:bg-slate-700  shadow-2xl py-8 px-6 rounded-md   ">
       <div className="flex max-w-4xl mx-auto justify-between gap-4 items-center">
       <div className="w-full">
          <p className='text-xl font-bold'>$45</p>
          <p className='font-semibold text-sm'>Mon,Aug 23 - 4:30 PM </p>
        </div>
<Button variant={'outline'} className='px-4 py-6'>
  <Plus className='w-5 h-5 mr-1'/>
  Book
</Button>
       </div>
      </div>
  )
}
