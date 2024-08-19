import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

export default function TimeSelectInput() {
    const timeOptions=[
        {
            label:"AM",
            value:"am"
        },
        {
            label:"PM",
            value:"pm"
        }
    ]
  return (
    <div className="grid grid-cols-3 gap-1">
          <Select>
              <SelectTrigger id="hour">
                <SelectValue placeholder="00" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length:12},(_,i)=>(
                    <SelectItem key={i} value={`${(i+1).toString().padStart(2,"0")}`}>
{`${(i+1).toString().padStart(2,"0")}`}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger id="second">
                <SelectValue placeholder="00" />
              </SelectTrigger>
              <SelectContent>
              {Array.from({length:59},(_,i)=>(
                    <SelectItem key={i} value={`${(i+1).toString().padStart(2,"0")}`}>
{`${(i+1).toString().padStart(2,"0")}`}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger id="zone">
                <SelectValue placeholder="Am" />
              </SelectTrigger>
              <SelectContent>
                
                {timeOptions.map((item,i)=>{
                    return (
<SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                    )
                })}
              </SelectContent>
            </Select>
        </div>
  )
}
