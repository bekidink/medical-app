"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectScrollable } from '@/components/user/shared/Forms/ScrollableSelect'
import TextInput from '@/components/user/shared/Forms/TextInput'
import { ToggleGroupInput } from '@/components/user/shared/Forms/ToggleGroup'
import { makePutRequest } from '@/lib/apiRequest'
import { Appointment, updateAppointment } from '@/types/types'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
type update={
    status:string;
    meetingLink:string;
    meetingProvider:string
}
export default function UpdateAppointment({appointment}:{appointment: Appointment}) {
    const [appointmentAccepted,setAppointmentAccepted]=useState(appointment.meetingProvider??'zoom')
    const [loading,setLoading]=useState(false)
    const {register,handleSubmit,reset,formState:{errors}}=useForm<update>(
        {
          defaultValues:{
            meetingLink:appointment.meetingLink,
            meetingProvider:appointment.meetingProvider,
            status:appointment.status===true?'true':'false'
          }
        }
      )
      const Options = [
        {
          title: "Zoom",
          value: "zoom"
        },
        {
          title: "Microsoft Teams",
          value: "microsoft_teams"
        },
        {
          title: "Google Meet",
          value: "google_meet"
        },
        {
          title: "Skype",
          value: "skype"
        },
        {
          title: "Cisco Webex",
          value: "cisco_webex"
        },
        {
          title: "GoToMeeting",
          value: "gotomeeting"
        },
        {
          title: "BlueJeans",
          value: "bluejeans"
        },
        {
          title: "Slack",
          value: "slack"
        },
        {
          title: "Zoom Webinar",
          value: "zoom_webinar"
        },
        {
          title: "RingCentral",
          value: "ringcentral"
        }
      ];
      
      const radioOptions=[
        {
            label:"Accepted",
            value:true
          },
          {
            label:"Rejected",
            value:false
          }
    
    ]
      const onSubmit = async (updateData:update) => {
        // e.preventDefault();
        // data.status=data.status==='yes'?true:false
        const endpoint=`appointments/${appointment.id}`
        const resourceName="Appointment"
        const data={
            status:updateData.status==='true'?true:false,
            meetingLink:updateData.meetingLink,
            meetingProvider:updateData.meetingProvider
        }
        makePutRequest({setLoading,endpoint,resourceName,data})
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border flex flex-col gap-2 shadow rounded-md p-4">
       
       <div className="flex items-start justify-between">
       <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
         Update Appointments
       </h2>
       
       {
        loading?(
            <Button type='submit' disabled >
                <Loader className='w-4 h-4 animate-spin'/>
            updating please wait...
          </Button>
        ):(
            <Button type='submit' >
            Update Appoint
          </Button>
        )
       }
        
       {/* )} */}
       
       </div>
       <div className=" w-full">
      
            <div className="border flex flex-col gap-2 shadow rounded-md p-4">
             <TextInput register={register} errors={errors} label='Meeting Link' name='meetingLink'/>
             <div className="grid grid-cols-2 gap-2">
             <SelectScrollable  title={'Meeting Provider'} options={Options} selectedOption={appointmentAccepted} setSelectedOption={setAppointmentAccepted}/>
             <ToggleGroupInput options={radioOptions} title='Appointment Acceptable' name='status' register={register} errors={errors}/>
             </div>
             {/* <TextInput register={register} errors={errors} label='Meeting Provider' name='meetingProvider'/>  */}
             
            </div>
           
           </div>
         
          </form>
  )
}
