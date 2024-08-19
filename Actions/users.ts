"use server"

import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "@/types/types";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import bcrypt from "bcrypt";
import { EmailTemplate } from "@/components/Email/EmailTemplete";
export async function createUser(data:RegisterInputProps){
    const resend = new Resend(process.env.RESEND_API_KEY);
    const{email,name,password,phone,role}=data
    try {
        const existingUser=await prismaClient.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser){
            return {
                data:null,
                error:`User with this email (${email}) already exists in the Database`,
            status:409}
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const generateToken = () => {
            const min = 100000; // Minimum 6-figure number
            const max = 999999; // Maximum 6-figure number
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          const userToken = generateToken();
          const newUser = await prismaClient.user.create({
            data: {
              name: name,
              email,
              phone,
              password: hashedPassword,
              role,
              token: userToken,
            },
          });
          const token = newUser.token;
    const userId = newUser.id;
    const firstName = newUser.name!.split(" ")[0];
    const linkText = "Verify your Account ";
    const message =
      "Thank you for registering with Gecko. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
    const sendMail = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify Your Email Address",
      react: EmailTemplate({ name:firstName, token, linkText, message }),
    });
          return {
            data:newUser,
            message:`User Created Successfully `,
        status:200}
    } catch (error) {
        return{
            error:"Something went wrong"
        }
    }
}

export async function getUserById(id:string){
if(id){
  try {
    const user=await prismaClient.user.findUnique({
      where:{
        id
      }
    })
    return user;
  } catch (error) {
    
  }
}
}
export async function updateUserById(id:string){
  if(id){
    try {
      const updateUser=await prismaClient.user.update({
        where:{
          id,
        },
        data:{
          isVerfied:true
        }
      })
      return updateUser;
    } catch (error) {
      
    }
  }
}
export async function retrieveByTrackingNo(id:string){
  if(id){
    try {
      const user=await prismaClient.doctorProfile.findUnique({
        where:{
          trackingNumber:id,
          
        }
      })
      if(!user){
        return {data:null,
          error:null,
          status:404

     };
      }
      return {data:user,
           error:null,
           status:200

      };
    } catch (error) {
    return  {data:null,
        error:"something went wrong",
        status:500

   };
    }
  }
}