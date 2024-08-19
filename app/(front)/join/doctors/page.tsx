import Pricing from '@/components/user/home/Pricing'
import { CustomAccordion } from '@/components/user/shared/CustomAccordion'
import { CustomButton } from '@/components/user/shared/CustomButton'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const features=[
        "EthioMedic brings patients to you",
        'EthioMedic e-prescribing experience',
        'Integrated clinical note-taking'
    ]
    const steps=[
        "List your service",
        "Create competitive offerings",
        "Start seeing patients"
    ]
    const cards=[
        {
            title:"Begin Your Journey",
            description:'Start a new application to join our network of healthcare providers.',

            link:"/",
            linkTitle:'Start a new application'
        },
        {
            title:"Resume Application",
            description:'Pick up where you left off and complete your onboarding process.Schedule for Physical Approval',

            link:"/onboarding/resume",
            linkTitle:'Continue your Application'
        },
        
        {
            title:"Schedule a Call",
            description:'Arrange a time for a call to finalize your application.',

            link:"/",
            linkTitle:'Schedule a Call'
        },
        {
            title:"Truck your Progress",
            description:'Monitor the status of your application and approvals in real time.',

            link:"/",
            linkTitle:'Check status'
        },
    ]
    const faqs = [
        {
          qn: "What is a medical consultation?",
          ans: "A medical consultation is an appointment with a healthcare professional where you discuss your health concerns, receive a diagnosis, and obtain treatment recommendations or a treatment plan."
        },
        {
          qn: "How can I book an appointment?",
          ans: "You can book an appointment through our website by selecting the 'Book Appointment' option and choosing a suitable date and time. Alternatively, you can call our office to schedule an appointment."
        },
        {
          qn: "What should I bring to my appointment?",
          ans: "Please bring a valid ID, your insurance card, and any relevant medical records or previous test results. If you have specific health concerns, bring a list of symptoms or questions you want to discuss."
        },
        {
          qn: "Do you accept insurance?",
          ans: "Yes, we accept most major insurance plans. Please contact our office to verify if we accept your specific insurance provider."
        },
        {
          qn: "What are your office hours?",
          ans: "Our office hours are Monday through Friday, from 9:00 AM to 5:00 PM. We are closed on weekends and public holidays."
        }
      ];
  return (
    <div className='min-h-screen bg-blue-50 dark:bg-slate-900'>
        <section className='py-12 px-4'>
            <div className="max-w-6xl gap-4 mx-auto grid grid-cols-1 md:grid-cols-2">
               <div className="">
                <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 md:text-[3rem] text-[1.5rem] leading-[3.5rem]'>
                    Build a thriving 
                    <span className='text-blue-600 font-semibold'>
                    direct-pay
                    </span>
                     practice with Medical App.
                </h2>
               <p>
               EthioMedic is a full-service platform to help you build and run your practice and care for patients for virtual care,in-person care,or both.
               </p>
               <CustomButton title='List your Service' href='#' className='bg-blue-600 dark:bg-slate-200 hover:bg-blue-800'/>
              
              <p className="py-6">
              {features.map((item,i)=>{
                return(
                    <p key={i} className='flex items-center'>
                        <Check className='w-4 h-4 mr-2 flex-shrink-0 text-blue-500'/>
                        {item}
                    </p>
                )
              })}
              </p>
               </div>
               <Image src={'/doctor.jfif'} alt='' width={1170} height={848} className='w-full'/>
            </div>
        </section>
      <section className='py-12 px-4'>
      <div className="max-w-6xl gap-4 mx-auto grid grid-cols-1 md:grid-cols-2">
     <div className="">
     <Image src={'/doctor.jfif'} alt='' width={1170} height={848} className='w-full hidden md:block mr-4'/>
     </div>
      
        <div className="">
        
        <h2 className='md:text-4xl text-3xl leading-[3.5rem]'>
                    Join EthioMedic to increase your 
                    <span className='text-blue-600 font-semibold'>
                    revenue 
                    </span>
                    today.
                </h2>
                <div className="py-6">
              {/* {steps.map((item,i)=>{
                return(
                    <p key={i} className='flex items-center'>
                        <Check className='w-4 h-4 mr-2 flex-shrink-0 text-blue-500'/>
                        {item}
                    </p>
                )
              })} */}
              </div>
              <div className="grid grid-cols-2 gap-4 text-center py-6">
                {
                    cards.map((item,i)=>{
                        return (
                            <Link href={item.link} key={i} className="bg-blue-900 dark:bg-slate-700 p-4 rounded-lg shadow-2xl">
                    <h3 className="scroll-m-20  tracking-tight text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-xs">
                       {item.description}
                    </p>
                    <CustomButton title={item.linkTitle} href={item.link} className='bg-blue-600 dark:bg-slate-200 hover:bg-blue-800 mr-2'/>
                </Link>
                        )
                    })
                }
              </div>
        </div>

        </div>

      </section>
      
      <section className='py-12 px-4'>
      <div className="max-w-5xl gap-4 mx-auto ">
     <Pricing/>

        </div>

      </section>
      <section className='py-12 px-4'>
      <div className="max-w-2xl gap-4 mx-auto ">
     <CustomAccordion arr={faqs}/>

        </div>

      </section>
    </div>
  )
}
