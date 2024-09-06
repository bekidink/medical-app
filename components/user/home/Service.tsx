import React from "react";
import HomeTabs from "./Tabs";
import { getData } from "@/lib/utils";
import { serviceResponse, specialityResponse, symptomResponse } from "@/types/types";

export default async function Service() {
  const allservices=await getData("admin/services")
    const allspecialities= await getData("admin/specialities")
    const allsymptoms=await getData("admin/symptoms")
    
const symptoms:symptomResponse[]=allsymptoms 
const services:serviceResponse[]=allservices
const specialities:specialityResponse[]=allspecialities 
  return (
    <section className="pb-12 pt-20 dark:bg-slate-950 lg:pb-[90px] lg:py-[60px] ">
      <div className=" mx-auto max-w-6xl">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
             
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px] scroll-m-20 border-b pb-2   tracking-tight first:mt-0">
              Browse your doctors By.
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-base text-body-color dark:text-dark-6">
              The "Browse by Doctor" feature enables users to easily search and explore doctor profiles based on specific criteria such as specialization, location, and availability. Each profile includes key details like the doctor’s name, specialization, years of experience, services offered, and patient reviews.
              </p>
            </div>
          </div>
        </div>
        <HomeTabs services={services} specialities={specialities} symptoms={symptoms}/>
        
      </div>
    </section>
  );
};



