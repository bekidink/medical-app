import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const doctors=await prismaClient.doctorProfile.findMany({
            
            where:{
             symptomIds:{
                has:id
             }
            },
            include:{
                availability:true,
                sepeciality:true,
                service:true
            }
        })
        const symptom=await prismaClient.symptom.findUnique({
            where:{
                id,
            }
        })
        const symptoms=await prismaClient.symptom.findMany({
            where:{
                id:{
                    not:symptom?.id
                }
            }
           })
        const data={
doctors,
symptom,
symptoms
        }
        return NextResponse.json({data:data})
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}