import { Breadcrumb } from "@/components/ui/Breadcrum/Breadcrumb";
import React from "react";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const HomeContact = () => {
  return (
    <div>
      <Breadcrumb page="Contacto" />
      <div className="container mx-auto py-12 px-6 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center bg-black-primary p-6 rounded-lg shadow-md">
            <FaMapMarkerAlt className="h-8 w-8 text-gold mr-4" />
            <div className="text-white">
              <h3 className="text-lg font-semibold">
                <a
                  href="https://maps.app.goo.gl/7Q9uaFfLsEhoqpLE8"
                  target="_blank"
                >
                  Feria “ATLÁNTIDA” - Local 30
                </a>
              </h3>
            </div>
          </div>

          <div className="flex items-center bg-black-primary p-6 rounded-lg shadow-md">
            <div className="mr-4">
              <MdEmail className="h-8 w-8 text-gold" />
            </div>
            <div className="text-white">
              <h3 className="text-lg font-semibold">+54 9 1134602955</h3>
              <p className="text-gray-400">izquierdoceleste65@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center bg-black-primary p-6 rounded-lg shadow-md">
            <FaRegClock className="h-8 w-8 text-gold mr-4" />
            <div className="text-white">
              <h3 className="text-lg font-semibold">Lunes - Viernes: 9 ~ 18</h3>
              <p className="text-gray-400"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
