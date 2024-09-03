import React from "react";
import HomeTabs from "./Tabs";
import { getData } from "@/lib/utils";
import { serviceResponse, specialityResponse, symptomResponse } from "@/types/types";

export default async function Service() {
  const allservices=await (await getData("admin/services")).data
    const allspecialities= await(await getData("admin/specialities")).data
    const allsymptoms=await (await getData("admin/symptoms")).data
    
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
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <HomeTabs services={services} specialities={specialities} symptoms={symptoms}/>
        
      </div>
    </section>
  );
};



