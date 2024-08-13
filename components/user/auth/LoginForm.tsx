"use client"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import { LoginInputProps } from "@/types/types"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function LoginForm() {
  const[isloading,setIsLoading]=useState(false)
  const [showNotification, setShowNotification] = useState(false);
  const {register,handleSubmit,reset,formState:{errors}}=useForm<LoginInputProps>()
  const router = useRouter();
  async function onSubmit(data:LoginInputProps){
  try {
    setIsLoading(true);
    console.log("Attempting to sign in with credentials:", data);
    const loginData = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log("SignIn response:", loginData);
    if (loginData?.error) {
      setIsLoading(false);
      toast.error("Sign-in error: Check your credentials");
      setShowNotification(true);
    } else {
      // Sign-in was successful
      setShowNotification(false);
      reset();
      setIsLoading(false);
      toast.success("Login Successful");
      router.push("/dashboard");
    }
  } catch (error) {
    setIsLoading(false);
    console.error("Network Error:", error);
    toast.error("Its seems something is wrong with your Network");
  }
}
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email",{required:true})}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required {...register("password",{required:true})} />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            </form>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/doctor.jfif"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
