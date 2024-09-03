

import * as React from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  User,
  Users2,
} from "lucide-react"

import { cn, getData } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"

import { MailList } from "./components/mail-list"
import { links, Nav } from "./components/nav"

import { Appointment, DoctorDetail, Message } from "@/types/types"

import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
export default async function layout({children}:{children:React.ReactNode}) {
    const layout = cookies().get("react-resizable-panels:layout:mail")
    const collapsed = cookies().get("react-resizable-panels:collapsed")
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined
    const session =await getServerSession(authOptions)
    // const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const user=session?.user
  const doc:DoctorDetail=await getData(`doctor/${user?.id}`)
  let appointments:Appointment[]= []
  if(user && doc){
    appointments=  await(await getData(`doctor/appointments/${doc.id}`)).data
  }
    const uniqueUserAppointments = Array.from(
        new Map(appointments.map(item => [item.userId, item])).values()
      );
      const patients:links=uniqueUserAppointments.map((item,i)=>{
        return {
          title:item.fullName,
          label:'',
          icon:User,
          variant:"default"
          
        }
       })
       const messages:Message[]= await(await getData("doctor/inbox")).data
  return (
  
    <TooltipProvider delayDuration={0}>
    <ResizablePanelGroup
      direction="horizontal"
    //   onLayout={(sizes: number[]) => {
    //     document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
    //       sizes
    //     )}`
    //   }}
      className="h-full max-h-[800px] items-stretch"
    >
       <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={4}
        collapsible={true}
        minSize={15}
        maxSize={20}
        // onCollapse={() => {
          
        //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
        //     true
        //   )}`
        // }}
        // onResize={() => {
          
        //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
        //     false
        //   )}`
        // }}
        className={cn(
         
            "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            
          )}
        >
          {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
        </div>
        <Separator />
        <Nav
          isCollapsed={false}
          links={patients}
        />
        <Separator />
        <Nav
          isCollapsed={false}
          links={[
            {
              title: "Social",
              label: "972",
              icon: Users2,
              variant: "ghost",
            },
            {
              title: "Updates",
              label: "342",
              icon: AlertCircle,
              variant: "ghost",
            },
            {
              title: "Forums",
              label: "128",
              icon: MessagesSquare,
              variant: "ghost",
            },
            {
              title: "Shopping",
              label: "8",
              icon: ShoppingCart,
              variant: "ghost",
            },
            {
              title: "Promotions",
              label: "21",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Inbox</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                All mail
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" className="m-0">
            <MailList items={messages} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={messages} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
        {children}
        {/* <MailDisplay
          mail={messages || null}
        /> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
  )
}

