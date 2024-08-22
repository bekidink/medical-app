import BioData from "@/components/user/onboarding/BioData";
import { additionalFormProps, BioDataFormProps, contactFormProps, EducationFormProps, PracticeFormProps, profileFormProps } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";


interface IOnBoardingContextData {
    trackingNumber: string;
    doctorProfileId: string;
    setTrackingNumber: (value: string) => void;
    setDoctorProfileId: (value: string) => void;
    bioData:BioDataFormProps;
    setBioData:(data:BioDataFormProps)=>void;
    profileData:profileFormProps;
    setProfileData:(data:profileFormProps)=>void;
    contactData:contactFormProps;
    setContactData:(data:contactFormProps)=>void;
    educationData:EducationFormProps;
    setEducationData:(data:EducationFormProps)=>void;
    practiceData:PracticeFormProps;
    setPracticeData:(data:PracticeFormProps)=>void;
    additionalData:additionalFormProps;
    setAdditionalData:(data:additionalFormProps)=>void;
}
const initialProData={
    profilePicture:'',
    bio:'',
    medicalLicense:'',
    medicalLicenseExpiry:'',
    page:'', 
    id:'', 
}
const initialBioData={
    firstName:'',
    lastName:'',
    middleName:'',
    dob:"",
    gender:'',
    page:'',
    userId:'',
    trackingNumber:''
}
const initialContactData = {
  email: '',
  phone: '',
  country: '',
  city: '',
  state: '',
  page: '',
  id: ''
};
const initialEducationData = {
    medicalSchool: '',
    graduationYear: '',
    primarySpecialization: '',
    otherSpecialties: [],
    boardCertificates: [],
    id: '',
    page: ''
  };
  const initialPracticeData = {
    hospitalName: '',
    hospitalAddress: '',
    hospitalContactNumber: '',
    hospitalEmailAddress: '',
    hospitalWebsite: '',
    hospitalHoursOfOperation: '',
    servicesOffered: null,
    insuranceAccepted: false,
    langaugesSpoken: null,
    id: '',
    page: ''
  };
  const initialAdditionalData = {
    educationHistory: '',
    research: '',
    accomplishments: '',
    additionalDocs: [],
    id: '',
    page: ''
  };
  
const initialData={
    trackingNumber:"",
    doctorProfileId:'',
    setTrackingNumber: () => {},
    setDoctorProfileId: () => {},
    bioData:initialBioData,
    setBioData:()=>{},
    profileData:initialProData,
    setProfileData:()=>{},
    contactData:initialContactData,
    setContactData:()=>{},
    educationData:initialEducationData,
    setEducationData:()=>{},
    practiceData:initialPracticeData,
    setPracticeData:()=>{},
    additionalData:initialAdditionalData,
    setAdditionalData:()=>{}

    
}
const OnBoardingContext = createContext<IOnBoardingContextData >(initialData);

export function OnBoardingContextProvider({ children }: { children: ReactNode }) {
    const [trackingNumber, setTrackingNumber] = useState("");
const [doctorProfileId, setDoctorProfileId] = useState("");
const [bioData, setBioData] = useState(initialBioData);
const [profileData, setProfileData] = useState(initialProData);
const [contactData, setContactData] = useState(initialContactData);
const [educationData, setEducationData] = useState(initialEducationData);
const [practiceData, setPracticeData] = useState(initialPracticeData);
const [additionalData, setAdditionalData] = useState(initialAdditionalData);

    return (
        <OnBoardingContext.Provider
            value={{
                trackingNumber,
                doctorProfileId,
                setTrackingNumber,
                setDoctorProfileId,
                bioData,
                setBioData,
                profileData,
                setProfileData,
                contactData,
                setContactData,
                additionalData,
                setAdditionalData,
                practiceData,
                setPracticeData,
                educationData,
                setEducationData

            }}
        >
            {children}
        </OnBoardingContext.Provider>
    );
}
export function useOnboardingContext(){
    return useContext(OnBoardingContext)
}
export default OnBoardingContext
