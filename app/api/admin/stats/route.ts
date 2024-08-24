import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function GET() {
    try {
        const services = await prismaClient.service.count();
        const doctros=await prismaClient.doctorProfile.count();
        const stats={
            doctros:doctros.toString().padStart(2,"0"),
            patients:"00",
            appointments:"00",
            services:services.toString().padStart(2,"0")
        }
        return NextResponse.json({ data: stats },{status:201});
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}