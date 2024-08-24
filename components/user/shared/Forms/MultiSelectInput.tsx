"use client"
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
type MultiSelectProps={
    options:any;
    selected:any;
    setSelected:any;
    optionTitle:string;
    label:string;
}
export default function MultiSelectInput({optionTitle,options,selected,setSelected,label}:MultiSelectProps) {
  return (
    <div className="">
        <label
        // htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-900"
      >
        {label}
      </label>
 <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        className="text-slate-100 dark:text-slate-900 dark:bg-slate-100 bg-slate-900"
      />
    </div>
   
  )
}
