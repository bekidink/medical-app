import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function GET(request:Request,{params:{id}}:{params:{id:string}}) {
    try {
       

        const appointments=await prismaClient.appointment.findMany({
            where:{
                userId:id
            }
        });
        const inboxes=await prismaClient.inbox.findMany({
            where:{
                recieverId:id
            }
        });
    const uniquePtaientsMap=new Map()
    appointments.forEach((app)=>{
        if(!uniquePtaientsMap.has(app.doctorId)){
            uniquePtaientsMap.set(app.doctorId,{
                patientId:app.doctorId,
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
            doctors:patients.length.toString().padStart(2,"0"),
            appointments:appointments.length.toString().padStart(2,"0"),
            inboxes:inboxes.length.toString().padStart(2,"0"),
        }

        return NextResponse.json( stats );
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}