import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function GET() {
    try {
        const services = await prismaClient.service.count();
        const doctros=await prismaClient.doctorProfile.count();
        const apps=await prismaClient.appointment.count()
        const appointments=await prismaClient.appointment.findMany({
            
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
            doctros:doctros.toString().padStart(2,"0"),
            patients:patients.length.toString().padStart(2,"0"),
            appointments:appointments.length.toString().padStart(2,"0"),
            services:services.toString().padStart(2,"0")
        }
        return NextResponse.json({ data: stats },{status:201});
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}