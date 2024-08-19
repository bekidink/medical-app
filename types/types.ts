import { File } from "@/components/user/shared/Forms/MultiFileUploader";
import { UserRole } from "@prisma/client";

export type ServiceProps={
    title:string,
    image:string,
    slug:string
}
export type RegisterInputProps={
    name:string,
    email:string,
    password:string
    phone:string;
    role:UserRole
}
export type LoginInputProps={

    email:string,
    password:string
}
export type FAQ ={
    qn: string; // Question
    ans: string; // Answer
    }
export type ToolTip={
    title:string;
    hover:string;
    Icon:any;
    className:string;
}
export type BioDataFormProps={
    firstName:string;
    lastName:string;
    middleName?:string;
    dob?:Date | undefined;
    gender:string;
    userId:string;
    page:string;
    trackingNumber:string;
}
export type profileFormProps={
    profilePicture?:string;
    bio:string;
    medicalLicense:string;
    medicalLicenseExpiry?:Date;
    page:string; 
    id:string; 
}
export type contactFormProps={
    email?:string;
    phone:string;
    country:string;
    city?:string;
    state:string;
    page:string; 
    id:string; 
}
export type StepFormProps={
    title:string;
    page:string;
    description:string;
    userId:string;
    nextPage:string;
    formId:string;
    trackingNo:string
}
export type EducationFormProps={
    medicalSchool:string;
    graduationYear:string;
    primarySpecialization:string;
    otherSpecialties:string[];
    boardCertificates:string[];
    id:string;
    page:string;
}
export type PracticeFormProps={
    hospitalName:string;
    hospitalAddress:string;
    hospitalContactNumber:string;
    hospitalEmailAddress:string;
    hospitalWebsite?:string;
    hospitalHoursOfOperation:string;
    servicesOffered:string[];
    insuranceAccepted:boolean;
    langaugesSpoken:string[];
    id:string;
    page:string;
}
export type additionalFormProps={
    educationHistory:string;
    research:string;
    acoomplisments:string;
    additionalDocs:string[];
    id:string;
    page:string;
}
