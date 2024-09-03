import { getData } from '@/lib/utils'
import { Message, UserResponse } from '@/types/types'
import React from 'react'
import { MailDisplay } from '../../components/mail-display'
import { TooltipProvider } from '@/components/ui/tooltip'

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
