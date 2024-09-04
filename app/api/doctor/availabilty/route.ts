import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";

// Handle POST request
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { doctorId,monday,tuesDay,wednesday,thursday,friday,saturday,sunday } = data;
       console.log(data)
        const newProfile = await prismaClient.availability.create({
            data:data,
        });

        return NextResponse.json({ data: newProfile }, { status: 201 });
    } catch (error) {
        console.error("Error creating profile:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

// Handle GET request (optional example if you want to support GET)
export async function GET() {
    try {
        const profiles = await prismaClient.doctorProfile.findMany();
        return NextResponse.json( profiles );
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
