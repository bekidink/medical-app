"use client"
import { AlarmClock, Bell,  Grid2X2, Home,  Mail, Package2,  Settings, User2, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Card } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";

export default  function Sidebar({role}:{role:UserRole}) {
//   const categories = (await getCategories()) || [];
const session=useSession()
const user=session.data?.user
const pathname=usePathname()

const roles={
  USER:[
    {
      name:"Dashboard",
      path:"/dashboard",
      icon:Home
    },
    {
      name:"My Appointments",
      path:"/dashboard/user/appointments",
      icon:AlarmClock
    },
    {
      name:"Inbox",
      path:"/dashboard/user/inbox",
      icon:Mail
    },
    // {
    //   name:"Settings",
    //   path:"/dashboard/user/settings",
    //   icon:Home
    // },
  ],
  ADMIN:[
    {
      name:"Dashboard",
      path:"/dashboard",
      icon:Home
    },
    {
      name:"Services",
      path:"/dashboard/services",
      icon:Users
    },
    {
      name:"Specialities",
      path:"/dashboard/specialities",
      icon:Users
    },
    {
      name:"Symptoms",
      path:"/dashboard/symptoms",
      icon:Users
    },
    {
      name:"Doctors",
      path:"/dashboard/doctors",
      icon:Users
    },
    {
      name:"Patients",
      path:"/dashboard/patients",
      icon:Users
    },
    // {
    //   name:"Appointments",
    //   path:"/dashboard/appointments",
    //   icon:Grid2X2
    // },
    
    // {
    //   name:"Settings",
    //   path:"/dashboard/settings",
    //   icon:Settings
    // },
    
  
  ],
  DOCTOR:[
    {
      name:"Dashboard",
      path:"/dashboard",
      icon:Home
    },
    {
      name:"Appointments",
      path:"/dashboard/doctor/appointments",
      icon:AlarmClock
    },
    {
      name:"Patients",
      path:"/dashboard/doctor/patients",
      icon:Users
    },
   
    {
      name:"Inbox",
      path:"/dashboard/doctor/inbox",
      icon:Mail
    },
    {
      name:"Profile",
      path:`/dashboard/doctor/profile/${user?.id}`,
      icon:User2
    },
    {
      name:"Settings",
      path:"/dashboard/doctor/settings",
      icon:Settings
    },
    
  
  ],
}
const router = useRouter();
let sideBarLinks=role? roles[role] : []
async function handleLogout() {
  await signOut();
  router.push("/");
}
return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">EthioMedic</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sideBarLinks.map((item,i)=>{
                const Icon=item.icon
                return (
                  <Link
                  key={i}
                  href={item.path}
                  className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",pathname===item.path?"bg-muted text-primary":"")}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
                )
              })}
              
            
              
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle></CardTitle>
                <CardDescription>
                 
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button onClick={handleLogout} size="sm" className="w-full">
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}