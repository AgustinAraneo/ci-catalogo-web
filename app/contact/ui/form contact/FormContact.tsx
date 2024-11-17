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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { nombre, correo, mensaje } = formData;
    const whatsappMessage = `Hola ${nombre},\n\nMi correo es: ${correo}\n\nQuería consultarles:\n${mensaje}`;
    // TODO: CAMBIAR NUMERO POR EL DEL PRIMO Y QUE LO LLENEN DE MENSAJES 😎
    window.open(
      `https://wa.me/5491171466601?text=${encodeURIComponent(whatsappMessage)}`,
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
    <div className="flex h-[800px] font-lato">
      {/* Sección de Fondo (gris temporal) */}
      <div className="w-1/2 bg-banner-contacto bg-cover bg-left"></div>

      {/* Sección del Formulario */}
      <div className="w-1/2 bg-white p-12 flex items-center justify-center flex-col">
        <h2 className="text-6xl font-bold text-gold pb-6">Escríbenos</h2>
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
