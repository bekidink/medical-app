import { createContext, ReactNode, useContext, useState } from "react";


interface IOnBoardingContextData {
    trackingNumber: string;
    doctorProfileId: string;
    setTrackingNumber: (value: string) => void;
    setDoctorProfileId: (value: string) => void;
}
const initialData={
    trackingNumber:"",
    doctorProfileId:'',
    setTrackingNumber: () => {},
    setDoctorProfileId: () => {},
    
}
const OnBoardingContext = createContext<IOnBoardingContextData >(initialData);

export function OnBoardingContextProvider({ children }: { children: ReactNode }) {
    const [trackingNumber, setTrackingNumber] = useState("");
const [doctorProfileId, setDoctorProfileId] = useState("");

    return (
        <OnBoardingContext.Provider
            value={{
                trackingNumber,
                doctorProfileId,
                setTrackingNumber,
                setDoctorProfileId,
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
