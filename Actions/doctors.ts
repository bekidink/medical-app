import { prismaClient } from "@/lib/db"
import { BioDataFormProps } from "@/types/types"

export async function doctorBioData(data:any){
    const{firstName,lastName,middleName,userId,dob,trackingNumber}=data
    // try {
    //     const newProfile=await prismaClient.doctorProfile.create({
    //         data:{
    //             firstName:firstName,
    //             lastName,
    //             middleName,
    //             userId,
    //             dob,
    //             trackingNumber
    //         }
    //     })
    //     return {
    //         data:newProfile,
    //         status:201,
    //         error:null
    //     }
    // } catch (error) {
    //     console.log(error)
    //     return {
    //         data:null,
    //         status:500,
    //         error:"Something went wrong"
    //     }
    try {
        const response = await fetch('/api/doctors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
            return {
                data:result,
                status:200,
                error:null
            }
            console.log('Profile created successfully:', result.data);
        } else {
            console.error('Error creating profile:', result.error);
            return {
                data:null,
                status:200,
                error:"Error creating profile:"
            }
        }

    } catch (error) {
        console.error('Request failed:', error);
    }
    }
// }