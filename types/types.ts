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
export type profileUpdateProps={
  profilePicture:string;
  bio:string;
  medicalLicense:string;
  medicalLicenseExpiry:any;
  page:string; 
   
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
export type contactUpdateProps={
  email:string;
  phone:string;
  country:string;
  city:string;
  state:string;
  page:string; 
}
export type StepFormProps={
    title:string;
    page:string;
    description:string;
    userId:string;
    nextPage:string;
    formId:string;
    trackingNo:string;
    specialities?:specialityResponse[],
    data?:DoctorDetail
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
export type EducationUpdateProps={
  medicalSchool:string;
  graduationYear:string;
  primarySpecialization:string;
  otherSpecialties:any;
  boardCertificates:any;
 
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
export type PracticeUpdateProps={
  hospitalName:string;
  hospitalAddress:string;
  hospitalContactNumber:string;
  hospitalEmailAddress:string;
  hospitalWebsite:string;
  hospitalHoursOfOperation:string;
  servicesOffered:any;
  insuranceAccepted:boolean;
  langaugesSpoken:any;
  // id:string;
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
export type additionalUpdateProps={
  educationHistory:string;
  research:string;
  acoomplisments:string;
  additionalDocs:any;
  
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
export type ServiceData = {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    _count: {
      DoctorProfiles: number;
    };
  };
  
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
export type AvailabilityTimes = {
  
    monday: string[];
    tuesDay: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
    createdAt: string;
    updatedAt: string;
  };
type Availability = {
    id: string;
    doctorId: string;
    monday: string[];
    tuesDay: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
    createdAt: string;
    updatedAt: string;
  };
export  type DoctorProfileAvailability = {
    id: string;
    doctorId: string;
    monday: string[];
    tuesDay: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
    createdAt: string;
    updatedAt: string;
  };
 export type DoctorProfile = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    trackingNumber: string;
    dob: string;
    gender: string | null;
    profilePicture: string;
    bio: string;
    medicalLicense: string;
    medicalLicenseExpiry: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    medicalSchool: string;
    graduationYear: string;
    primarySpecialization: string;
    otherSpecialties: string[];
    boardCertificates: string[];
    hospitalName: string;
    hospitalAddress: string;
    hospitalContactNumber: string;
    hospitalEmailAddress: string;
    hospitalWebsite: string;
    hospitalHoursOfOperation: string;
    servicesOffered: string[];
    insuranceAccepted: boolean | null;
    langaugesSpoken: string[];
    educationHistory: string;
    research: string;
    acoomplisments: string;
    page: string;
    additionalDocs: string[];
    operationMode: string;
    userId: string;
    serviceId: string;
    sepecialityId: string;
    symptomIds: string[];
    createdAt: string;
    updatedAt: string;
    availability: Availability;
  };
  
  
  
 export type Speciality = {
    id: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  
 export type Service = {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    count?:number;
    createdAt: string;
    updatedAt: string;
  };
  
 export type DoctorDetail = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    trackingNumber: string;
    dob: string;
    gender: string | null;
    profilePicture: string;
    bio: string;
    hourlyWage:number;
    medicalLicense: string;
    medicalLicenseExpiry: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    medicalSchool: string;
    graduationYear: string;
    primarySpecialization: string;
    otherSpecialties: string[];
    boardCertificates: string[];
    hospitalName: string;
    hospitalAddress: string;
    hospitalContactNumber: string;
    hospitalEmailAddress: string;
    hospitalWebsite: string;
    hospitalHoursOfOperation: string;
    servicesOffered: string[];
    insuranceAccepted: boolean | null;
    langaugesSpoken: string[];
    educationHistory: string;
    research: string;
    acoomplisments: string;
    page: string;
    additionalDocs: string[];
    operationMode: string;
    userId: string;
    serviceId: string;
    sepecialityId: string;
    symptomIds: string[];
    createdAt: string;
    updatedAt: string;
    availability: Availability;
    sepeciality: Speciality;
    service: Service;
  };
  
  export type AppointmentsProps={
    appointmentDate:string;
    userId:string;
    doctorId:string;
    charge:number;
    appointmentTime:string;
    fullName:string;
    gender:string;
    phoneNumber:string;
    email:string;
    dob:any;
    address:string;
    reason:string;
    medicdoc:string[];
    occupation:string;
  }
  export type  Appointment = {
    id: string;
    appointmentDate: Date;
    doctorId: string;
    charge: number;
    appointmentTime: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    email: string;
    dob: Date;
    address: string;
    reason: string;
    medicdoc: string[];
    occupation: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    status  :        boolean  ;   
  meetingLink  :   string ;       
  meetingProvider: string ;
  };
  export type updateAppointment={
    status  :        boolean  ;   
  meetingLink  :   string ;       
  meetingProvider: string ;       
  }
  export type Message = {
    id: string;
    recieverId: string;
    senderId: string;
    senderName: string;
    senderEmail: string;
    subject: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
  };
  export type InboxProps = {
    
    recieverId: string;
    senderId: string;
    senderName: string;
    senderEmail: string;
    subject: string;
    body: string;

  };
  export type UserResponse = {
    id: string;
    name: string;
    phone: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    role: 'DOCTOR' | 'PATIENT' | 'ADMIN'; // Adjust roles as necessary
    password: string;
    symptomIds: string[]; // Assuming symptom IDs are strings
    isVerified: boolean;
    token: number;
    serviceId: string | null;
    specialityId: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  