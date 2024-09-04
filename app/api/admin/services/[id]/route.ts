import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function DELETE(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const existingCategory=await prismaClient.service.findUnique({
            
            where:{
               id,
            },
           
        })
        if(!existingCategory){
            return NextResponse.json({
                data:null,
                message:"Speciality Not Found"
            },{status:404})
        }
        const deletedService=await prismaClient.service.delete({
            
            where:{
               id,
            },
           
        })
        return NextResponse.json( deletedService )
    } catch (error) {
        return NextResponse.json({message:"Failed to delete Category",error},{status:500})
    }
}

export async function PUT(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        
        const data=await request.json()
        const {title,slug,imageUrl}=await data
        console.log(id,data)
        const existingservice =await prismaClient.service.findUnique({
            where:{
                id,
            }
        })
        if(!existingservice){
            return NextResponse.json({
                data:null,
                message:"Not Found"
            },{status:404})
        }
        const updatedservice=await prismaClient.service.update({
            where:{id:id},
            data:{
                slug,
                title,
                imageUrl
            }
        })
        return NextResponse.json({ data: updatedservice }, { status: 201 })
    } catch (error) {
        return NextResponse.json({message:"Failed to delete Category",error},{status:500})
    }
}
export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const service=await prismaClient.service.findUnique({
            
            where:{
               id,
            },
            
        })
        return NextResponse.json({ data: service },{status:201});
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}