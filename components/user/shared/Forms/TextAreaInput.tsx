import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
type TextAreaInputProps={
label:string;
name:string;
placeholder:string;
register:any;
errors:any;
}
export function TextAreaInput({label,name,placeholder,register,errors}:TextAreaInputProps) {
  return  <div className="grid w-full gap-1.5 text-gray-900">
  <Label htmlFor="message" className="text-gray-800 dark:text-gray-50">{label}</Label>
  <Textarea {...register(`${name}`,{required:true})} className="bg-white" name={`${name}`} placeholder={placeholder} id="message" />
  {errors[`${name}`] && <span className='text-red-600 text-sm'>{label} is required</span>}
</div>
}
