import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { statCardProps } from "@/types/types"
import Link from "next/link"
import React from 'react'

export default function StatCard({title,icon,count,href}:statCardProps) {
    const Icon=icon;
  return (
    <Card x-chunk="dashboard-01-chunk-0">
        <Link href={href}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {title}
              </CardTitle>
              <Icon/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
             
            </CardContent>
        </Link>
            
          </Card>
  )
}
