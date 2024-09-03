import { getData } from '@/lib/utils'
import { Message, UserResponse } from '@/types/types'
import React from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MailDisplay } from '@/app/(back)/dashboard/doctor/inbox/components/mail-display'

export default async function page({params:{id}}:{params:{id:string}}) {
 const message:Message=await getData(`doctor/inbox/detail/${id}`)
 const receiver:UserResponse=await getData(`user/${message.recieverId}`)
 console.log(receiver)
  return (
    // <TooltipProvider >
      <MailDisplay mail={message} receiver={receiver}/>
    //  </TooltipProvider>
  )
}
