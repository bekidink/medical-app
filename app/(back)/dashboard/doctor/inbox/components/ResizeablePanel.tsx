"use server"
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
import { Appointment, Message } from "@/types/types"
import { ReactNode } from "react"
import { links, Nav } from "./nav"
import { MailList } from "./mail-list"
  interface MailProps {
    accounts: {
      label: string
      email: string
      icon: React.ReactNode
    }[]
    mails: Message[]
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number
    patients:links,
    children:ReactNode
  }
export default async function ResizeablePanel({accounts, mails,defaultLayout = [20, 32, 48],defaultCollapsed = false,navCollapsedSize,patients,children}: MailProps) {
  return (
    <>
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
        collapsedSize={3}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`
        }}
        onResize={() => {
          
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`
        }}
        // className={cn(
        //   isCollapsed &&
        //     "min-w-[50px] transition-all duration-300 ease-in-out"
        // )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center px-2",
            // isCollapsed ? "h-[52px]" : "px-2"
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
            <MailList items={mails} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={mails} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
        {/* <MailDisplay
          mail={messages || null}
        /> */}
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
   </TooltipProvider>
    </>
  )
}
