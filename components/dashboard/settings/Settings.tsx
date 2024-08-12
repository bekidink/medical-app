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
import GeneralSettings from "./GeneralSettings"

export default function Settings() {
    const tabs=[
        {
            label:"General",
            value:"general",
            component:<GeneralSettings/>
        },
        {
            label:"Security",
            value:"security",
            component:<GeneralSettings/>
        },
        {
            label:"Integrations",
            value:"integrations",
            component:<GeneralSettings/>
        },
        {
            label:"Support",
            value:"support",
            component:<GeneralSettings/>
        }
        ,
        {
            label:"Organizations",
            value:"organizations",
            component:<GeneralSettings/>
        },
        {
            label:"Advanced",
            value:"advanced",
            component:<GeneralSettings/>
        }
    ]
  return (
    <div className="flex min-h-screen w-full flex-col">
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        

          <div className="">
          <Tabs defaultValue="general" className="w-[400px]">
  <TabsList>
    {
        tabs.map((item,i)=>(
            <TabsTrigger value={item.value} key={i}>{item.label}</TabsTrigger>
        ))
    }
   
  </TabsList>
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
