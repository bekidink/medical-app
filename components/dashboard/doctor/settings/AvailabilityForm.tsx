"use client"
import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/user/shared/Forms/SubmitButton'
import { makePostRequest, makePutRequest } from '@/lib/apiRequest'
import { Loader, Plus, Trash, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AvailabilityForm({profile,title}:{profile:any,title:string}) {
    console.log(profile)
    const timesArray=[
        "7:00 AM","8:00 AM",
        "9:00 AM","10:00 AM","11:00 AM","12:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"
    ]
    const[selectedTimes,setSelectedTimes]=useState<String[]>(["7:00 AM","8:00 AM",])
 const [isLoading,setLoading]=useState(false)
 useEffect(()=>{
if(title==="MonDay"){
   if(profile.availability.monday.length>0
   ) {
    setSelectedTimes(profile.availability.monday)
   }
}else if(title==="TuesDay"){
    if(profile.availability.tuesDay.length>0
    ) {
     setSelectedTimes(profile.availability.tuesDay)
    }
}else  if(title==="WednesDay"){
    if(profile.availability.wednesday.length>0
    ) {
     setSelectedTimes(profile.availability.wednesday)
    }
} else  if(title==="ThursDay"){
    if(profile.availability.thursday.length>0
    ) {
     setSelectedTimes(profile.availability.thursday)
    }
} else  if(title==="FriDay"){
    if(profile.availability.friday.length>0
    ) {
     setSelectedTimes(profile.availability.friday)
    }
}else  if(title==="SaturDay"){
    if(profile.availability.saturday.length>0
    ) {
     setSelectedTimes(profile.availability.saturday)
    }
} else  if(title==="SunDay"){
    if(profile.availability.sunday.length>0
    ) {
     setSelectedTimes(profile.availability.sunday)
    }
} 
 },[title])
 function handleAddTime(time:string){
    if(!selectedTimes.includes(time)){
        setSelectedTimes((prev)=>[...prev,time])

    }else{
        toast.error(`${time} already selected`)
    }
 }
 function handleAddAll(){
    setSelectedTimes((prev)=>[...timesArray])
 }
 function handleAllClear(){
    setSelectedTimes([])
 }
 function submitAll(){
    let data
    const resourceName="Avaliabilty"
    if(profile.id && profile.availability){
         const endpoint=`doctor/availabilty/${profile.availability.id}`
        if(title==="MonDay"){
             data={
               
                monday:selectedTimes,
            }
        const endpoint="doctor/availabilty"
        
        makePutRequest({setLoading,endpoint,resourceName,data})
        }else if(title==="TuesDay"){
           
            data={
                
                tuesDay:selectedTimes
            }
            makePutRequest({setLoading,endpoint,resourceName,data})
        }else if(title==="WednesDay"){
            const endpoint=`doctor/availabilty/${profile.availability.id}`
            data={
               
                wednesday:selectedTimes
            }
            makePutRequest({setLoading,endpoint,resourceName,data})
        }
        else if(title==="ThursDay"){
            const endpoint=`doctor/availabilty/${profile.availability.id}`
            data={
               
                thursday:selectedTimes
            }
            makePutRequest({setLoading,endpoint,resourceName,data})
        }else if(title==="FriDay"){
            const endpoint=`doctor/availabilty/${profile.availability.id}`
            data={
                
                friday:selectedTimes
            }
            makePutRequest({setLoading,endpoint,resourceName,data})
        }else if(title==="SaturDay"){
            const endpoint=`doctor/availabilty/${profile.availability.id}`
            data={
               
                saturday:selectedTimes
            }
            makePutRequest({setLoading,endpoint,resourceName,data})
        }else if(title==="SunDay"){
            const endpoint=`doctor/availabilty/${profile.availability.id}`
            data={
                
                sunday:selectedTimes
            }
            makePutRequest({setLoading,endpoint,resourceName,data})
        }
        
        

        
       

    } else if(profile.id && !profile.availability){
        const endpoint="doctor/availabilty"
        if(title==="MonDay"){
            data={
               doctorId:profile.id,
               monday:selectedTimes,
           }
       
       
           makePostRequest({setLoading,endpoint,resourceName,data})
       }else if(title==="TuesDay"){
           const endpoint=`doctor/availabilty/${profile.availability.id}`
           data={
            doctorId:profile.id,
               tuesDay:selectedTimes
           }
           makePostRequest({setLoading,endpoint,resourceName,data})
       }else if(title==="WednesDay"){
           const endpoint=`doctor/availabilty/${profile.availability.id}`
           data={
            doctorId:profile.id,
               wednesday:selectedTimes
           }
           makePostRequest({setLoading,endpoint,resourceName,data})
       }
       else if(title==="ThursDay"){
           const endpoint=`doctor/availabilty/${profile.availability.id}`
           data={
            doctorId:profile.id,
               thursday:selectedTimes
           }
          makePostRequest({setLoading,endpoint,resourceName,data})
       }else if(title==="FriDay"){
           const endpoint=`doctor/availabilty/${profile.availability.id}`
           data={
            doctorId:profile.id,
               friday:selectedTimes
           }
          makePostRequest({setLoading,endpoint,resourceName,data})
       }else if(title==="SaturDay"){
           const endpoint=`doctor/availabilty/${profile.availability.id}`
           data={
            doctorId:profile.id,
               saturday:selectedTimes
           }
          makePostRequest({setLoading,endpoint,resourceName,data})
       }else if(title==="SunDay"){
           const endpoint=`doctor/availabilty/${profile.availability.id}`
           data={
            doctorId:profile.id,
               sunday:selectedTimes
           }
          makePostRequest({setLoading,endpoint,resourceName,data})
       }
    }
    else{
        console.log("no")
    }

 }
 function handleDeleteTime(time: String) {
    if (selectedTimes.includes(time)) {
        setSelectedTimes((prev) => prev.filter(t => t !== time));
    } else {
        toast.error(`${time} is not in the selected times`);
    }
}

    return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 border-gray-200 dark:border-gray-600 shadow rounded-md divide-x divide-gray-200'>
      <div className="p-4 ">
<h2 className='font-semibold'>Select the Times your available for this day</h2>
<div className="py-6 grid grid-cols-2 gap-2">
    {
        timesArray.map((item,i)=>{
            return (
                <Button onClick={()=>handleAddTime(item)} key={i} variant={"outline"} className='flex items-center py-2 px-3 border border-gray-100 gap-4 rounded-md'>
                    <span>{item}</span>
                    <Plus className='w-3 h-3 ml-2'/>
                </Button>
            )
        })
    }
</div>
<Button onClick={handleAddAll} variant={"outline"} className='flex items-center py-2 px-3 border border-gray-100 gap-4 rounded-md'>
                    <span> All</span>
                    <Plus className='w-3 h-3 ml-2'/>
                </Button>
      </div>
      <div className="p-4">
        <h2>Here is your Selected Time</h2>
        <div className="py-6 grid grid-cols-2 gap-2">
    {
        selectedTimes.map((item,i)=>{
            return (
                <Button onClick={()=>handleDeleteTime(item)} key={i} variant={"outline"} className='flex items-center py-2 px-3 border border-gray-100 gap-4 rounded-md'>
                    <span>{item}</span>
                    <X className='w-3 h-3 ml-2'/>
                </Button>
            )
        })
    }
    <div className="w-full border-t border-gray-200 pt-4 flex justify-between gap-2">
        {isLoading?(<button
          
          disabled
          className="flex items-center w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        <Loader className='w-4 h-4 mr-2 flex-shrink-0 animate-spin'/>  Saving please wait...
        </button>):(<Button onClick={submitAll} variant={"outline"} className='flex items-center py-2 px-3 border border-gray-100 gap-4 rounded-md'>
                    <span> Save</span>
                    {/* <Plus className='w-3 h-3 ml-2'/> */}
                </Button>)}
    
        
    <Button onClick={handleAllClear} variant={"outline"} className='flex items-center py-2 px-3 border border-gray-100 gap-4 rounded-md'>
                    <span> Clear All</span>
                    <Trash className='w-3 h-3 ml-2'/>
                </Button>
    </div>
</div>
      </div>
    </div>
  )
}
