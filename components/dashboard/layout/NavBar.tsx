"use client"
import Link from "next/link"
import {
  AlarmClock,
  Bell,
  CircleUser,
  Folder,
  Grid2X2,
  Home,
  LineChart,
  Mail,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  User2,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ModeToggle from "@/components/ModeToggle"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { generateInitials } from "@/lib/utils"
import { UserRole } from "@prisma/client"


export default function Navbar({role}:{role:UserRole}) {
  const router = useRouter();
  const {data:session,status}=useSession()
  const user=session?.user;
  const initials = generateInitials(user?.name??'User');
  async function handleLogout() {
    await signOut();
    router.push("/");
  }
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
  let sideBarLinks=role? roles[role] : []
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
        <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        {sideBarLinks.map((item:any,i:any)=>{
          const Icon=item.icon
          return (
            <Link
            key={i}
            href={item.path}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Icon className="h-5 w-5" />
           {item.name}
          </Link>
          )
        }
          
        )}
          
          
        </nav>
        
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our
                support team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
    <ModeToggle/>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel >
          <Link href={'/'}>Online</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  );
}