"use client"
import { Tabs,TabItem } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe, X } from "lucide-react";
import ServiceList from "./services/ServiceList";
import LinkCards from "./doctors/LinkCards";

export default function HomeTabs() {
    const services=[
        {
            title:"TeleHealth",
            image:'/doctor.jfif',
            slug:'tele-health'
        },
        {
            title:"Video prescription",
            image:'/doctor.jfif',
            slug:'tele-health'
        },
        {
            title:"UTI consult",
            image:'/doctor.jfif',
            slug:'tele-health'
        },
        {
            title:"Mental health",
            image:'/doctor.jfif',
            slug:'tele-health'
        },
        {
            title:"ED Consult",
            image:'/doctor.jfif',
            slug:'tele-health'
        },
        {
            title:"Urgent care",
            image:'/doctor.jfif',
            slug:'tele-health'
        }
    ]
    const tabs=[
        {
            title:"Popular",

            icon:Stethoscope,
            component:<ServiceList data={services}/>,
            content:[]
        },
        {
            title:"Doctors",
            icon:Microscope,
            component:<LinkCards className={"bg-purple-950"}/>,
            content:[]
        },
        {
            title:"Specialists",
            icon:Activity,
            component:<LinkCards className={"bg-blue-900"}/>,
            content:[]
        },
        {
            title:"Symptoms",
            icon:Syringe,
            component:<LinkCards className={""}/>,
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
