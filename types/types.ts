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
    middleName:string;
    dob:any;
    gender:string;
    userId:string;
    page:string;
    trackingNumber:string;
}
export type profileFormProps={
    profilePicture:string;
    bio:string;
    medicalLicense:string;
    medicalLicenseExpiry:any;
    page:string; 
    id:string; 
}
export type contactFormProps={
    email:string;
    phone:string;
    country:string;
    city:string;
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
    otherSpecialties:any;
    boardCertificates:any;
    id:string;
    page:string;
}
export type PracticeFormProps={
    hospitalName:string;
    hospitalAddress:string;
    hospitalContactNumber:string;
    hospitalEmailAddress:string;
    hospitalWebsite:string;
    hospitalHoursOfOperation:string;
    servicesOffered:any;
    insuranceAccepted:boolean;
    langaugesSpoken:any;
    id:string;
    page:string;
}
export type additionalFormProps={
    educationHistory:string;
    research:string;
    accomplishments:string;
    additionalDocs:any;
    id:string;
    page:string;
}
export type serviceFormProps={
    title:string;
    slug:string;
    imageUrl:string;
}
export type serviceResponse={
    id:string;
    title:string;
    slug:string;
    imageUrl:string;
}
export type specialityFormProps={
    title:string;
    slug:string;
}
export type specialityResponse={
    id:string;
    title:string;
    slug:string;
}
export type symptomFormProps={
    title:string;
    slug:string;
}
export type symptomResponse={
    id:string;
    title:string;
    slug:string;
}

export type statsResponse={
    doctros:string;
    patients:string;
    appointments:string;
    services:string;
}
export type statCardProps={
    title:string;
    icon:any;
    count:string;
    href:string;
}
export type TabItemsProps={
    services:serviceResponse[],
    specialities:specialityResponse[],
    symptoms:symptomResponse[]
}