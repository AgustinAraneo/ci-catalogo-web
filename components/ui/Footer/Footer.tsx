"use client";

import React from "react";
import {
  FaInstagram,
  FaPhone,
  FaCcVisa,
  FaCcMastercard,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-black-primary text-white py-8 px-6 font-lato">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center pb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-6 items-center justify-center md:justify-start">
            <a
              href="mailto:izquierdoceleste65@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              <MdEmail className="h-6 w-6 text-gold" />
            </a>
            <a
              href="https://wa.me/5491134602955"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              <FaPhone className="h-6 w-6 text-gold rotate-90" />
            </a>
            <a
              href="https://www.instagram.com/chinitha_fine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              <FaInstagram className="h-6 w-6 text-gold" />
            </a>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gold">Chinitha Fine</h1>
            <p className="text-center md:text-left">
              &ldquo;La ropa que te queda, y el precio que te cierra&rdquo;
            </p>
          </div>

          {/* Métodos de Pago */}
          <div className="flex space-x-4 items-center justify-center md:justify-end">
            <FaCcVisa className="h-6 w-6" />
            <FaCcMastercard className="h-6 w-6" />
            <FaRegMoneyBillAlt className="h-6 w-6" />
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col md:flex-row relative justify-between items-center w-full text-center md:text-left space-y-4 md:space-y-0">
          <div className="mb-4 md:mb-0">
            <h2 className="font-semibold text-lg text-gold">Ubicación</h2>
            <a
              href="https://maps.app.goo.gl/7Q9uaFfLsEhoqpLE8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline block"
            >
              Feria “ATLÁNTIDA” - Local 30
            </a>
          </div>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <img className="w-40" src="/assets/img/logos/blanco.png" />
          </div>

          <div className="mb-4 md:mb-0">
            <h2 className="font-semibold text-lg text-gold">Contacto</h2>
            <div className="flex flex-col items-center md:items-start space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <MdEmail className="h-5 w-5 text-gold" />
                <a
                  href="mailto:izquierdoceleste65@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  izquierdoceleste65@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="h-5 w-5 text-gold rotate-90" />
                <a
                  href="https://wa.me/5491134602955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  +54 9 1134602955
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaInstagram className="h-5 w-5 text-gold" />
                <a
                  href="https://www.instagram.com/chinitha_fine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @chinitha_fine
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mt-4" />
        <div className="text-center mt-4">
          <h5>
            © All rights reserved by
            <a
              href="https://www.nehros.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hover:underline text-[#9747FF] font-medium"
            >
              Nehros
            </a>
          </h5>
        </div>
      </div>
    </footer>
  );
};
