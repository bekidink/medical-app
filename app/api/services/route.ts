import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const profiles = await prismaClient.service.findMany({
            select:{
                id:true,
                title:true,
                slug:true,
                imageUrl:true,
                _count:{
                    select:{
                        DoctorProfiles:true
                    }
                }
              }
        });
        return NextResponse.json({ data: profiles });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}