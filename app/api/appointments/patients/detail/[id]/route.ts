import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params:{id}}:{params:{id:string}}) {
    try {
        const appointment = await prismaClient.appointment.findMany({
           
            where:{userId:id}
        });
        if(!appointment){
            return NextResponse.json({ data: null})
        }
        return NextResponse.json({ data: appointment });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}