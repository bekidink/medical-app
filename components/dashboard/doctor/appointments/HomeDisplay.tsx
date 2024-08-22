import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from '../../shared/NewButton'

export default function HomeDisplay() {
  return (
    <div className='flex py-3 px-2 h-1/2 items-center justify-center'>
      <div className=" gap-2 py-2 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center">
      <Calendar/>
      <p>You have 11 appointments today.</p>
      <p>11 New Patients,3 Follow Ups,4 Annual Physicals</p>
      <NewButton title='New Appointments' href=''/>
      </div>
    </div>
  )
}
