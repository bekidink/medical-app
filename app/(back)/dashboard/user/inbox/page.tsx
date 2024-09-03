

import {  Message } from "@/types/types"
import { getData } from "@/lib/utils"

import HomeDisplay from "@/components/dashboard/doctor/appointments/HomeDisplay"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function MailPage() {


    const session =await getServerSession(authOptions)
    const user=session?.user
  //   const doc:DoctorDetail=await getData(`doctor/${user?.id}`)
    let messages:Message[]= []
    if(user ){
      messages=  await(await getData(`doctor/inbox/${user.id}`))
    }
  const count=messages.length
  return (
    <div className="">
    
    <HomeDisplay count={count} title="Inbox" link="/dashboard/user/inbox/new" />
  </div>
  )
}