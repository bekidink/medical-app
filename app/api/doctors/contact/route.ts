import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const { id, email,
            phone,
            country,
            city,
            state,
            page
        
        } = data;
            
        const updatedProfile = await prismaClient.doctorProfile.update({
            where: { id },
            data: {
                email,
            phone,
            country,
            city,
            state,
            page
            
            },
        });

        return NextResponse.json({ data: updatedProfile }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}