"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { nombre, correo, mensaje } = formData;
    const whatsappMessage = `Hola ${nombre},\n\nMi correo es: ${correo}\n\nQuería consultarles:\n${mensaje}`;
    window.open(
      `https://wa.me/5491124003292?text=${encodeURIComponent(whatsappMessage)}`,
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
    <div className="flex">
      {/* Sección de Fondo (gris temporal) */}
      <div className="w-1/2 bg-gray-400"></div>

      {/* Sección del Formulario */}
      <div className="w-1/2 bg-white p-12">
        <h2 className="text-4xl font-bold text-gold mb-2">Escríbenos</h2>
        <p className="text-gray-700 mb-8">
          Dejanos un mensaje. Definitivamente nos pondremos en contacto con usted y responderemos todas sus consultas!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <input
            type="text"
            name="nombre"
            placeholder="Ingrese su nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-300 text-gray-700"
            required
          />

          {/* Correo */}
          <input
            type="email"
            name="correo"
            placeholder="Ingrese su correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-300 text-gray-700"
            required
          />

          {/* Mensaje */}
          <textarea
            name="mensaje"
            placeholder="Ingrese su mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-300 text-gray-700"
            rows={5}
            required
          ></textarea>

          {/* Botón Enviar */}
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
