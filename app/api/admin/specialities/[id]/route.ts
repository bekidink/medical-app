import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function DELETE(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const existingCategory=await prismaClient.sepeciality.findUnique({
            
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
        const deletedSpeciality=await prismaClient.sepeciality.delete({
            
            where:{
               id,
            },
           
        })
        return NextResponse.json( deletedSpeciality)
    } catch (error) {
        return NextResponse.json({message:"Failed to delete Category",error},{status:500})
    }
}
export async function PUT(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const data=await request.json()
        const {title,slug,imageUrl}=await data
        const existingspeciality =await prismaClient.sepeciality.findUnique({
            where:{
                id,
            }
        })
        if(!existingspeciality){
            return NextResponse.json({
                data:null,
                message:"Not Found"
            },{status:404})
        }
        const updatedSpeciality=await prismaClient.sepeciality.update({
            where:{id},
            data:{
                title,
                slug
            }
        })
        return NextResponse.json( updatedSpeciality )
    } catch (error) {
        return NextResponse.json({message:"Failed to delete Category",error},{status:500})
    }
}
export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const service=await prismaClient.sepeciality.findUnique({
            
            where:{
               id,
            },
            
        })
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}