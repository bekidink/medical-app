import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";

// Handle POST request
export async function POST(req: Request) {
    try {
       
        const data = await req.json();
        // const { firstName, lastName, middleName,page ,userId, dob, trackingNumber } = data;
       console.log(data)
        const newProfile = await prismaClient.appointment.create({
            data:data
        });

        return NextResponse.json({ data: newProfile }, { status: 201 });
    } catch (error) {
        console.error("Error creating profile:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
export async function GET(request:Request,{params:{id}}:{params:{id:string}}) {
    try {
        const profiles = await prismaClient.appointment.findUnique({
            where:{id:id}
        });
        return NextResponse.json( profiles );
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
export async function PUT(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const data=await request.json()
        console.log(data)
        const existingbanner =await prismaClient.appointment.findUnique({
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
        const updatedBanner=await prismaClient.appointment.update({
            where:{id},
            data:data
        })
        return NextResponse.json(updatedBanner)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}