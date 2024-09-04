import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function GET(request:Request,{params:{id}}:{params:{id:string}}) {
    try {
        const doc = await prismaClient.user.findUnique({
            where:{id,},
            include:{
                doctorProfile:true
            }
        })

        const appointments=await prismaClient.appointment.findMany({
            where:{
                doctorId:doc?.doctorProfile?.id
            }
        });
    const uniquePtaientsMap=new Map()
    appointments.forEach((app)=>{
        if(!uniquePtaientsMap.has(app.userId)){
            uniquePtaientsMap.set(app.userId,{
                patientId:app.userId,
                name:app.fullName,
                emai:app.email,
                phone:app.phoneNumber,
                location:app.address,
                gender:app.gender,
                occupation:app.occupation,
                dob:app.dob
            })
        }
    })
    const patients=Array.from(uniquePtaientsMap.values())
        const stats={
            // doctros:appointments.length.toString().padStart(2,"0"),
            patients:patients.length.toString().padStart(2,"0"),
            appointments:appointments.length.toString().padStart(2,"0"),
            inboxes:"00"
        }
        return NextResponse.json( stats );
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}