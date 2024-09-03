"use client"
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Briefcase, Calendar, Check, Dot, History } from 'lucide-react'
import { Appointment, Message } from '@/types/types'
import { cn, formatAppointment, timeAgo } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'


export default function InboxListPanel({appointments,link='/dashboard/doctor/appointments/view',title=''}:{appointments:Message[],link?:string,title?:string}) {
  const pathname=usePathname()
    return (
        <ScrollArea className="h-screen">

        <div className="flex flex-col gap-2 p-4 pt-0">
          {appointments.map((item) => {
            const time=timeAgo(new Date(item.createdAt))
            return (
                <Link
                href={`/dashboard/doctor/inbox/view/${item.id}`}
              key={item.id}
              
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                // mail.selected === item.id && "bg-muted"
              )}
              // onClick={() =>
              //   setMail({
              //     ...mail,
              //     selected: item.id,
              //   })
              // }
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center justify-between ">
                    <h1 className="font-semibold">{item.senderName}</h1>
                    <h1 className="">{time}</h1>
                   
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      // mail.selected === item.id
                      //   ? "text-foreground"
                      //   : "text-muted-foreground"
                    )}
                  >
                    {/* {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                    })} */}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.body}
              </div>
              {/* {item.labels.length ? (
                <div className="flex items-center gap-2">
                  {item.labels.map((label) => (
                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null} */}
            </Link>
            )
          }
            
          )}
        </div>
      </ScrollArea>
  )
}
