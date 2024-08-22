import { prismaClient } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params:{id}}:{params:{id:string}}){
    try {
        const category=await prismaClient.doctorProfile.findUnique({
            
            where:{
             userId:  id,
            },
            include:{
                availability:true
            }
        })
        return NextResponse.json(category)
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
// export async function PUT(request,{params:{id}}){
//     try {
//         const {title,link,imageUrl,isActive}=await request.json()
//         const existingbanner =await prismaClient.doctorProfile.findUnique({
//             where:{
//                 id
//             }
//         })
//         if(!existingbanner){
//             return NextResponse.json({
//                 data:null,
//                 message:"Not Found"
//             },{status:404})
//         }
//         const updatedBanner=await prismaClient.doctorProfile.update({
//             where:{id},
//             data:{title,link,imageUrl,isActive}
//         })
//         return NextResponse.json(updatedBanner)
//     } catch (error) {
        
//     }
// }