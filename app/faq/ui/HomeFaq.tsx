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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Preguntas Frecuentes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 font-lato items-start">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-r from-black/90 via-black/80 to-black/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger
                  icon={AltArrowIcon}
                  classNameIcon="text-white -rotate-90"
                  className="text-left p-0 hover:no-underline [&[data-state=open]>svg]:!rotate-90 font-bold text-lg xl:text-xl"
                >
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-300 font-medium ">
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
