"use client"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  LogIn,
  Menu,
  Microscope,
  Package2,
  Search,
  Users,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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

import { useState } from "react"
import ModeToggle from "../ModeToggle"
import { Session } from "next-auth"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
// const products = [
//   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {data:session,status}=useSession()
  const user=session?.user;
  const router=useRouter()
  const pathname=usePathname()
  async function handleLogout(){
    await signOut()
    router.push('/login')
  }
  const navlinks=[
    {
      name:"Home",
      path:'/',

    },
    {
      name:"Find",
      path:'/find-doctor',

    },
    {
      name:"Telehealth ",
      path:'/tele-health',

    },
    {
      name:"Inperson ",
      path:'/inperson',

    },
    
    {
      name:"About",
      path:'/about',
      
    },
    {
      name:"Services",
      path:'/services',
      
    },
    
    

  ]
  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
         <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Microscope className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {
          navlinks.map((item,i)=>{
            return (
              <Link
              key={i}
              href={item.path}
              className={cn(" transition-colors hover:text-foreground/80",pathname== item.path ?" text-foreground":"text-foreground/60")}
            >
              {item.name}
            </Link>
            )
          })
        }
         
         
         
        </nav>
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
          <SheetContent side="left">
          <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Microscope className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
              </Link>
            <nav className="grid gap-6 text-lg font-medium">
            {
          navlinks.map((item,i)=>{
            return (
              <Link
              key={i}
              href={item.path}
              className={cn("flex items-center gap-2 text-lg font-semibold transition-colors hover:text-foreground/80",pathname== item.path ?" text-foreground":"text-foreground/60")}
            >
              {item.name}
            </Link>
            )
          })
        }

              
              
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <ModeToggle/>
          {session && user && user?.email ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                {user?.image?(
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                ):(
                  <AvatarFallback>BD</AvatarFallback>
                )}
              </Avatar>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
                {user?.email}

              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
                <Link href={'/dashboard'}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ):(
           <Button asChild>
            <Link href={'/login'}>
            <LogIn className="mr-2 h-4 w-4"/>Login
            </Link>

           </Button>
          )}
          
        </div>
      </header>
  )
}
