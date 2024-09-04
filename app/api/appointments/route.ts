import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const profiles = await prismaClient.appointment.findMany();
        return NextResponse.json( profiles );
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}