import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function DELETE(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const existingCategory=await prismaClient.symptom.findUnique({
            
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
        const deletedSpeciality=await prismaClient.symptom.delete({
            
            where:{
               id,
            },
           
        })
        return NextResponse.json({ data: deletedSpeciality }, { status: 201 })
    } catch (error) {
        return NextResponse.json({message:"Failed to delete Category",error},{status:500})
    }
}
export async function PUT(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const data=await request.json()
        const {title,slug,}=await data
        const existingspeciality =await prismaClient.symptom.findUnique({
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
        const updatedSpeciality=await prismaClient.symptom.update({
            where:{id},
            data:{
                title,
                slug
            }
        })
        return NextResponse.json({ data: updatedSpeciality }, { status: 201 })
    } catch (error) {
        return NextResponse.json({message:"Failed to delete Category",error},{status:500})
    }
}
export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const service=await prismaClient.symptom.findUnique({
            
            where:{
               id,
            },
            
        })
        return NextResponse.json({ data: service },{status:201});
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}