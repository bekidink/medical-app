import { Check, HelpCircle } from "lucide-react";
import { CustomTooltip } from "../shared/CustomToolTip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Pricing ()  {

    const plans = [
        {
            name: "Free Forever",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 0,
            fee:5,
            isMostPop: false,
            path:'/register?role=DOCTOR&plan=free',
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",

            ],
        },
        {
            name: "Professional",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 35,
            fee:5,
            isMostPop: true,
            path:'/register?role=DOCTOR&plan=professional',
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
        {
            name: "Enterprise",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 60,
            fee:5,
            isMostPop: false,
            path:'/register?role=DOCTOR&plan=enterprise',
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
    ];

    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='scroll-m-20  tracking-tight text-gray-800 dark:text-gray-200 text-3xl font-semibold sm:text-4xl'>
                        Pricing for all sizes
                    </h3>
                    <div className='mt-3 max-w-xl'>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
                        </p>
                    </div>
                </div>
                <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {
                                    item.isMostPop ? (
                                        <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">Most popular</span>
                                    ) : ""
                                }
                                <div className="p-8 space-y-4 border-b">
                                    <span className='text-indigo-600 font-medium uppercase tracking-widest'>
                                        {item.name}
                                    </span>
                                    <div className='text-gray-800 text-3xl font-semibold'>
                                        ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
                                    </div>
                                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                                        {item.desc}
                                    </p>
                                    <div className="flex">
                                        <p className="text-xs leading-7 [&:not(:first-child)]:mt-6">+5% transaction fee</p>
                                        {/* <button>
                                            <HelpCircle className="w-4 h-4 ms-2"/>
                                        </button> */}
                                        <CustomTooltip title="" className="w-4 h-4 ms-2"  hover="Paypal/Stripe will charge their regular transaction Fee" Icon={HelpCircle}/>
                                    </div>
                                    <Button asChild>
                                    <Link href={item.path} className='px-3 py-3 block text-center  rounded-lg w-full font-semibold text-sm duration-150 text-white dark:bg-gray-900 bg-indigo-600 dark:bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                                        Get Started
                                    </Link>
                                    </Button>
                                    
                                </div>
                                <ul className='p-8 space-y-3'>
                                    <li className="pb-2 text-gray-800 dark:text-gray-200 font-medium">
                                        <p className="leading-7 [&:not(:first-child)]:mt-6 ">Features</p>
                                    </li>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex items-center gap-5'>
                                                <Check className='h-5 w-5 text-indigo-600 flex-shrink-0'/>
                                              
                                                {featureItem}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};
