import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
type Option={
    title:string;
    value:string;
}
type SelectsProps={
    title:string;
    options:Option[];
    selectedOption:string;
    setSelectedOption:any
}
export function SelectScrollable({title,options,selectedOption}:SelectsProps) {
  return (
    <div className="flex flex-col gap-2 text-gray-800">
        <Label htmlFor="terms">{title}</Label>
    <Select >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={`Select ${title}`} />
      </SelectTrigger>
      <SelectContent className="bg-slate-900">
       
        
       
       
        <SelectGroup >
          <SelectLabel>{title}</SelectLabel>
          {options.map((option,i)=>{
        return <SelectItem onChange={()=>{
            console.log(option)
        }} key={i} value={option.value}>{option.title}</SelectItem>
    })}
          
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

  )
}
