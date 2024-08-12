import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FAQ } from "@/types/types"
  
  export function CustomAccordion({arr}:{arr:FAQ[]}) {
    return (
      <Accordion type="single" collapsible className="w-full">
       {arr.map((item,i)=>{
        return (
<AccordionItem value={item.qn} key={i}>
          <AccordionTrigger>{item.qn}?</AccordionTrigger>
          <AccordionContent>
            {item.ans}
          </AccordionContent>
        </AccordionItem>
        )
       })}
        
        
      </Accordion>
    )
  }
  