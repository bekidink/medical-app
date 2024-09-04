import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { query } }: { params: { query: string } }) {
    console.log(query);
  
    const services = await prismaClient.service.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } }
        ]
      },
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
  
    const specialities = await prismaClient.sepeciality.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } }
        ]
      },
      select:{
        id:true,
        title:true,
        slug:true,
        _count:{
            select:{
                DoctorProfiles:true
            }
        }
      }
    });
  
    const symptoms = await prismaClient.symptom.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } }
        ]
      },
     
    });
  
    const doctors = await prismaClient.doctorProfile.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { bio: { contains: query, mode: 'insensitive' } },
          { medicalLicense: { contains: query, mode: 'insensitive' } },
          { primarySpecialization: { contains: query, mode: 'insensitive' } },
          { acoomplisments: { contains: query, mode: 'insensitive' } },
          { research: { contains: query, mode: 'insensitive' } },
          { educationHistory: { contains: query, mode: 'insensitive' } }
        ]
      },
      include:{
        availability:true
      }
    });
  
    const data = {
      services,
      specialities,
      symptoms,
      doctors
    };
  
    return NextResponse.json( data );
  }
  