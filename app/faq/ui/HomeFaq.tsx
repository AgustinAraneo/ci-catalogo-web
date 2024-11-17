"use client";

import { faqs } from "@/app/src/data/data.faq";
import { AltArrowIcon } from "@/components/icons/AltArrowIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion/accordion";

export const HomeFaq = () => {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-8">
      {/*  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 font-lato items-start">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="shadow-redcoach-lg bg-gradient-to-r from-black/90 via-black/80 to-black/90 rounded-lg hover:shadow-xl transition-all duration-300 text-white p-4"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger
                  icon={AltArrowIcon}
                  classNameIcon="text-white -rotate-90"
                  className="text-left hover:no-underline [&[data-state=open]>svg]:!rotate-90 font-bold text-lg xl:text-xl p-6"
                >
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-300 font-medium px-6">
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};
