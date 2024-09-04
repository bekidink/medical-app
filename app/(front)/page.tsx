import Brands from "@/components/user/home/Brands";
import DoctorsList from "@/components/user/home/doctors/DoctorsList";
import Hero from "@/components/user/home/Hero";
import Service from "@/components/user/home/Service";
import { getData } from "@/lib/utils";
import { DoctorProfile } from "@/types/types";



export default async function Home() {
  // const session=await getServerSession(authOptions)
  const alldoctors:DoctorProfile[]=await getData("home/doctors")
  const telehealths=alldoctors.filter((doctor)=>doctor.operationMode==="Tele-health visit")
  const inPersons=alldoctors.filter((doctor)=>doctor.operationMode==="In-person doctor visit")
  console.log(alldoctors)
  return (
    <section className=" ">
      
      
      <Hero/>
<Brands/>
<Service/>
<DoctorsList title="Telehealth visit" isInPerson={false} doctors={telehealths}/>
<DoctorsList doctors={inPersons} className="bg-white px-10 py-8 lg:py-24 dark:bg-slate-950" title="In-person Doctor visit" isInPerson={true}/>
    </section>
  );
}
