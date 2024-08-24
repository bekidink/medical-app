import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";

// Handle POST request
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const existingService=await prismaClient.sepeciality.findUnique({
            where:{
                slug:data.slug
            }
        })
        if(existingService){
            return NextResponse.json({ data: null }, { status: 409 });
        }
        const newProfile = await prismaClient.sepeciality.create({
            data:data,
        });

        return NextResponse.json({ data: newProfile }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

// Handle GET request (optional example if you want to support GET)
export async function GET() {
    try {
        const services = await prismaClient.sepeciality.findMany({
            orderBy:{
                createdAt:'desc'
            }
        });
        return NextResponse.json({ data: services },{status:201});
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}