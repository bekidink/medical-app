import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import SelectInput from "@/components/user/shared/Forms/SelectInput"
import { useForm } from "react-hook-form"
import ServiceForm from "./ServiceForm"
import { cn, getData } from "@/lib/utils"
import { Appointment, serviceResponse, specialityResponse, symptomResponse } from "@/types/types"
import Image from "next/image"
type SelectOption={
    label:string;
    value:string;
}
export default async function ServiceSettings({profileId}:{profileId:string}) {
    const allservices=await (await getData("admin/services"))
    const allspecialities= await(await getData("admin/specialities"))
    const allsymptoms=await (await getData("admin/symptoms"))
    // const allappointments:Appointment[]=await (await getData(`appointments`)).data

    // const appointments:Appointment[]=allappointments.filter((item)=>item.doctorId===profileId)
   
const symptoms:symptomResponse[]=allsymptoms 
const services:serviceResponse[]=allservices
const specialities:specialityResponse[]=allspecialities
  return (
    <>
    <ServiceForm  profileId={profileId} symptoms={symptoms} services={services} specialities={specialities}/>
    </>
  )
}
