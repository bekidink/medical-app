import { Button } from '@/components/ui/button'
import { AlignHorizontalDistributeCenter, Calendar, Plus } from 'lucide-react'
import React from 'react'
import NewButton from '../../shared/NewButton'
type PanelHeaderProps={
  title:String;
  desc:String;
  icon:any
}
export default function PanelHeader({title,desc,icon}:PanelHeaderProps) {
 const Icon=icon
  return (
    <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-between'>
      <div className="flex items-center gap-1" >
        <Icon className='w-4 h-4 flex-shrink-0'/>
        <span>{title}</span>
        <span className='bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm border text-sm text-slate-900'>{desc}</span>
      </div>
      {/* <div className="flex items-center gap-4">
        <Button variant={'outline'} className='text-sm'>
<AlignHorizontalDistributeCenter className='w-4 h-4' />
Display
        </Button>
       <NewButton title='New Appointments' href='/dashboard/doctor/appointments/new'/>
      </div> */}
    </div>
  )
}
