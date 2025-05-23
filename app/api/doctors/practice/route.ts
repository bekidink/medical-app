import { NextResponse } from 'next/server';
import { prismaClient } from "@/lib/db";
export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const { id,  hospitalName,
            hospitalAddress,
            hospitalContactNumber,
            hospitalEmailAddress,
            hospitalWebsite,
            hospitalHoursOfOperation,
            servicesOffered,
            insuranceAccepted,
            langaugesSpoken,
            page
        } = data;
           
        const updatedProfile = await prismaClient.doctorProfile.update({
            where: { id },
            data: {
                hospitalName,
                hospitalAddress,
                hospitalContactNumber,
                hospitalEmailAddress,
                hospitalWebsite,
                hospitalHoursOfOperation,
                servicesOffered,
                insuranceAccepted,
                langaugesSpoken,
                page
            },
        });

        return NextResponse.json( updatedProfile );
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}