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
type Option={
    title:string;
    id:string;
}
type SelectInputProps={
    label:string;
    name:string;
    register:any;
    className :string;
    options : Option[],
    multiple:boolean,
    optionTitle:string;
}
export function ShadSelectInput({
    label,
    name,
    register,
    className = "sm:col-span-2",
    options = [],
    multiple=false,
    optionTitle
  }:SelectInputProps) {
  return (
    
    <div className={className}>
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
    >
      {label}
    </label>
    <div className="mt-2">
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={optionTitle} />
      </SelectTrigger>
      <SelectContent className="">
        <SelectGroup className="">
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, i) => {
            return (
              
              <SelectItem className="" key={i} value={option.id}>{option.title}</SelectItem>
            );
          })}
         
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  </div>
  )
}
