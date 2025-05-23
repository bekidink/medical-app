

import {  Message } from "@/types/types"
import { getData } from "@/lib/utils"

import HomeDisplay from "@/components/dashboard/doctor/appointments/HomeDisplay"

export default async function MailPage() {


  const messages:Message[]= await getData("doctor/inbox")||[]
  const count=messages.length
  return (
    <div className="">
    
    <HomeDisplay count={count} title="Inbox" link="/dashboard/doctor/inbox/new" />
  </div>
  )
}