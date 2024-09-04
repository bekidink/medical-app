import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params:{slug}}:{params:{slug:string}}){
    try {
        // let doctors=[]
        
        const speciality=await prismaClient.sepeciality.findUnique({
            
            where:{
             slug:  slug,
            },
            include:{
               DoctorProfiles:{
                include:{
                    availability:true
                }
               } 
            }
        })
       const doctors=speciality?.DoctorProfiles
       const specialities=await prismaClient.sepeciality.findMany({
        where:{
            id:{
                not:speciality?.id
            }
        }
       })
       const data={
        doctors,
        specialities
       }
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}

// export async function DELETE(request:Request,{params:{id}}:{params:{id:string}}){
//     try {
//         const existingCategory=await prismaClient.doctorProfile.findUnique({
            
//             where:{
//                id,
//             },
           
//         })
//         if(!existingCategory){
//             return NextResponse.json({
//                 data:null,
//                 message:"Category Not Found"
//             },{status:404})
//         }
//         const deletedCategory=await prismaClient.doctorProfile.delete({
            
//             where:{
//                id,
//             },
           
//         })
//         return NextResponse.json(deletedCategory)
//     } catch (error) {
//         return NextResponse.json({message:"Failed to delete Category",error},{status:500})
//     }
// }
export async function PUT(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const data=await request.json()
        console.log(data)
        const existingbanner =await prismaClient.doctorProfile.findUnique({
            where:{
                id,
            }
        })
        if(!existingbanner){
            return NextResponse.json({
                data:null,
                message:"Not Found"
            },{status:404})
        }
        const updatedBanner=await prismaClient.doctorProfile.update({
            where:{id},
            data:data
        })
        return NextResponse.json({data:updatedBanner},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
    }
}