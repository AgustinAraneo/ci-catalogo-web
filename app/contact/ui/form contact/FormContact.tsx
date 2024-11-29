"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";

type FormData = {
  nombre: string;
  correo: string;
  mensaje: string;
};

export const FormContact = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpia el error si el usuario empieza a escribir
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { nombre, correo, mensaje } = formData;

    // Validar campos
    if (!nombre || !correo || !mensaje) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (mensaje.length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    // Enviar mensaje a WhatsApp
    const whatsappMessage = `Hola soy ${nombre},\n\nMi correo es: ${correo}\n\nQuería consultarles:\n${mensaje}`;
    window.open(
      `https://wa.me/5491134602955?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );

    // Limpia los campos de texto
    setFormData({
      nombre: "",
      correo: "",
      mensaje: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[800px] font-lato">
      <div className="w-full md:w-1/2 h-64 md:h-full bg-banner-contacto bg-cover bg-left"></div>
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex items-center justify-center flex-col">
        <div className="flex flex-col gap-2 pb-6">
          <h2 className="text-4xl md:text-6xl font-bold text-gold text-center">
            Contáctanos
          </h2>
          <h6 className="text-center font-lato mx-auto text-sm md:text-base">
            Llená el formulario y enviá tu mensaje por WhatsApp, te
            responderemos a la brevedad
          </h6>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre:"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-300 text-gray-700"
            required
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico:"
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-300 text-gray-700"
            required
          />

          <textarea
            name="mensaje"
            placeholder="Mensaje:"
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-300 text-gray-700"
            rows={5}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
