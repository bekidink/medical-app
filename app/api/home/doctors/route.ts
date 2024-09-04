import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function GET() {
    try {
        const profiles = await prismaClient.doctorProfile.findMany(
            {
                include:{
                    availability:true
                }
            }
        );
        return NextResponse.json( profiles );
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}