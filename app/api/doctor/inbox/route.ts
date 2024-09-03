import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";

// Handle POST request
export async function POST(req: Request) {
    try {
        const data = await req.json();
        
        const newProfile = await prismaClient.inbox.create({
            data:data,
        });

        return NextResponse.json({ data: newProfile }, { status: 201 });
    } catch (error) {
        console.error("Error creating profile:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
export async function GET() {
    try {
        const profiles = await prismaClient.inbox.findMany();
        return NextResponse.json({ data: profiles });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}