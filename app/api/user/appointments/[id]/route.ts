import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";


export async function GET(request:Request,{params:{id}}:{params:{id:string}}) {
    try {
        const appointment = await prismaClient.appointment.findMany({
           
            where:{userId:id}
        });
        if(!appointment){
            return NextResponse.json({ data: null})
        }
        return NextResponse.json( appointment );
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}