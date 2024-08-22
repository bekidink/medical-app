"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { retrieveByTrackingNo, updateUserById } from "@/Actions/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { useOnboardingContext } from "@/context/onboarding";
 
const FormSchema = z.object({
  token: z.string().min(10, {
    message: "Your tracking number must be 10 characters.",
  }),
});
 
export default function TrackingForm({
  userToken,
  id,
  role
}: {
  userToken?: any;
  id?: string;
  role?:any
}) {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const[successfully,setSuccessFully]=useState(false)
  const[userId,setUserId]=useState<string | undefined>()
  const [page,setPage]=useState("")
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  });
  const{trackingNumber:truckingNmber,doctorProfileId,setTrackingNumber,setDoctorProfileId}=useOnboardingContext()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    console.log(data)
    try {
    const res=  await retrieveByTrackingNo(data.token);
      setLoading(false);
      // reset();
      if(res?.status===200){
        setUserId(res.data?.userId)
        setTrackingNumber(res.data?.trackingNumber??"")
  setDoctorProfileId(res.data?.id??"")
        router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`)
        toast.success("Verified Successfully");
      }else if(res?.status===404){
        toast.error("Tracking Number Not correct");
      }else{
        toast.error("Something went wrong");
      }
      
    
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong")
    }
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {showNotification && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Wrong Token!</span> Please Check the
            token and Enter again
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="tracking number" {...field} />
              </FormControl>
              <FormDescription>
               Tracking Number 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}