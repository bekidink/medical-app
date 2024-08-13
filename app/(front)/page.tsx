import Brands from "@/components/user/home/Brands";
import DoctorsList from "@/components/user/home/doctors/DoctorsList";
import Hero from "@/components/user/home/Hero";
import Service from "@/components/user/home/Service";
import { authOptions } from "@/lib/auth";



export default async function Home() {
  // const session=await getServerSession(authOptions)
  return (
    <section className=" ">
      
      
      <Hero/>
<Brands/>
<Service/>
<DoctorsList title="Telehealth visit" isInPerson={false}/>
<DoctorsList className="bg-white px-10 py-8 lg:py-24 dark:bg-slate-950" title="In-person Doctor visit" isInPerson={true}/>
    </section>
  );
}
