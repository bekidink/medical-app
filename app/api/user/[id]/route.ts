import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const category=await prismaClient.user.findUnique({
            
            where:{
            id:id
            },
            
        })
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}