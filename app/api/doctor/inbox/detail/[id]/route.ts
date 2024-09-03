

import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const category=await prismaClient.inbox.findUnique({
            
            where:{
            id:id
            },
            
        })
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}

export async function PUT(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const data=await request.json()
        console.log(data)
        const existingbanner =await prismaClient.inbox.findUnique({
            where:{
                id,
            }
        })
        if(!existingbanner){
            return NextResponse.json({
                data:null,
                message:"Not Found"
            },{status:404})
        }
        const updatedBanner=await prismaClient.inbox.update({
            where:{id},
            data:{
                doctorDelete:true
            }
        })
        return NextResponse.json({data:updatedBanner},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}