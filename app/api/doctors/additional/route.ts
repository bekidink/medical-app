import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const { id, educationHistory,
            research,
            acoomplisments,
            additionalDocs } = data;
            
        const updatedProfile = await prismaClient.doctorProfile.update({
            where: { id },
            data: {
                
                educationHistory,
            research,
            acoomplisments,
            additionalDocs 
            },
        });

        return NextResponse.json( updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}