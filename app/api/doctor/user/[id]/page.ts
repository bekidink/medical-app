import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const category=await prismaClient.user.findUnique({
            
            where:{
               id,
            },
            include:{
doctorProfile:{
    include:{
        availability:true,
        sepeciality:true,
        service:true
    }
}
            }
        })
        return NextResponse.json(category?.doctorProfile)
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}
