import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from 'react'
import AvailabilityForm from "./AvailabilityForm"

export default function AvailabilitySettings({profile}:any) {
    const tabs=[
    {
    title:"MonDay",
    active:true,
    component:<AvailabilityForm profile={profile} title="MonDay"/>
  },
  {
    title:"TuesDay",
    active:false,
    component:<AvailabilityForm profile={profile} title="TuesDay"/>
  },
  {
    title:"WednesDay",
    active:false,
    component: <AvailabilityForm profile={profile} title="WednesDay"/> },
  {
    title:"ThursDay",
    active:false,
    component:<AvailabilityForm profile={profile} title="ThursDay"/>   },
  {
    title:"FriDay",
    active:false,
    component:<AvailabilityForm profile={profile} title="FriDay"/> },
  {
    title:"SaturDay",
    active:false,
    component:<AvailabilityForm profile={profile} title="SaturDay"/> },
  {
    title:"SunDay",
    active:false,
    component:<AvailabilityForm profile={profile} title="SunDay"/>  }
]
    return (
    <div className="mx-auto flex flex-col w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <p className="py-3">
        Please Add the Availability for the whole week
      </p>
      <Tabs defaultValue="general" >
          <div className="flex items-center justify-between">
  <TabsList>
    {
        tabs.map((item,i)=>(
            <TabsTrigger value={item.title} key={i}>{item.title}</TabsTrigger>
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
        <TabsContent className="w-full" value={`${item.title}`} key={i}> 
       {item.component}
      </TabsContent>  
    )
  })}
 
</Tabs>
    </div>
  )
}
