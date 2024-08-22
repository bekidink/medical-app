import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

// export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
//     try {
//         const category=await prismaClient.availability.findUnique({
            
//             where:{
//                id,
//             },
            
//         })
//         return NextResponse.json(category)
//     } catch (error) {
//         return NextResponse.json({message:"Failed to fetch Categories",error},{status:500})
//     }
// }

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
        const existingbanner =await prismaClient.availability.findUnique({
            where:{
                id
            }
        })
        if(!existingbanner){
            return NextResponse.json({
                data:null,
                message:"Not Found"
            },{status:404})
        }
        const updatedBanner=await prismaClient.availability.update({
            where:{id},
            data:data
        })
        return NextResponse.json(updatedBanner)
    } catch (error) {
        
    }
}