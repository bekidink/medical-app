"use client"
import { Tabs,TabItem, TabItemProps } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe, X } from "lucide-react";
import ServiceList from "./services/ServiceList";
import LinkCards from "./doctors/LinkCards";
import { TabItemsProps } from "@/types/types";

export default function HomeTabs({services,specialities,symptoms}:TabItemsProps) {
    
    const tabs=[
        {
            title:"Popular",

            icon:Stethoscope,
            component:<ServiceList data={services}/>,
            content:[]
        },
       
        {
            title:"Specialists",
            icon:Activity,
            component:<LinkCards specialities={specialities} className={"bg-blue-900"}/>,
            content:[]
        },
        {
            title:"Symptoms",
            icon:Syringe,
            component:<LinkCards title="Symptoms" specialities={symptoms} className={""}/>,
            content:[]
        }
    ]
  return (
    <Tabs aria-label="Tabs with underline" variant="underline">
      
     {tabs.map((item,i)=>(
        <TabItem key={i} active title={item.title} icon={item.icon}>
       {item.component}
      </TabItem>
     ))}
    </Tabs>
  );
}
