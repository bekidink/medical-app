import React from 'react'
type TextInputProps={
    name:string;
    register:any;
    label:string;
    errors:any;
    type?:string;
    required?:boolean
    
}
export default function TextInput({name,register,label,errors,type="text",required=true}:TextInputProps) {
  return (
    <div>
    <label htmlFor={`${name}`} className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50">
      {label} {!required && ("(Optional)")}
    </label>
    <div className="mt-2">
      <input
      {...register(`${name}`,{required:`${required}`})}
        id={`${name}`}
        name={`${name}`}
        type={`${type}`}
        placeholder={ `Enter your ${label}  `}
        autoComplete={`${name}`}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {errors[`${name}`] && <span className='text-red-600 text-sm'>{label} is required</span>}
    </div>
  </div>
  )
}

