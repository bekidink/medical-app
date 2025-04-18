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
import GeneralSettings from "../../settings/GeneralSettings"
import AvailabilitySettings from "./AvailabilitySettings"
import { authOptions } from '@/lib/auth'
import { getData } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import ServiceSettings from "./ServiceSettings"
export default async function Settings() {
  const session =await getServerSession(authOptions)
  const user=session?.user
  const doc=await getData(`doctor/${user?.id}`)
  
    const tabs=[
        {
            label:"Availability Settings",
            value:"availability",
            component:<AvailabilitySettings profile={doc}/>
        },
        {
            label:"Account Settings",
            value:"account-settings",
            component:<ServiceSettings profileId={doc.id}/>
        },
        
    ]
  return (
    <div className="flex min-h-screen w-full flex-col">
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full min-w-5xl ">
        

          <div className="">
          <Tabs defaultValue="availability" className="w-full">
          <div className="flex items-center justify-between">
  <TabsList>
    {
        tabs.map((item,i)=>(
            <TabsTrigger value={item.value} key={i}>{item.label}</TabsTrigger>
        ))
    }
   
  </TabsList>
  {/* <div className="ml-auto flex items-center gap-2">
                
                
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </div> */}
              </div>
  {tabs.map((item,i)=>{
    return (
        <TabsContent className="w-full" value={`${item.value}`} key={i}> 
       {item.component}
      </TabsContent>  
    )
  })}
 
</Tabs>

          </div>
        </div>
      </main>
    </div>
  )
}
