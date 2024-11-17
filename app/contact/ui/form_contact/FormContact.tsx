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
    <div className="bg-white p-8 rounded-lg shadow-md">
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

      {/* Línea Divisoria */}
      <hr className="my-8 border-t border-gray-300" />

      {/* Mapa */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13117.257740590632!2d-58.4765305!3d-34.7224678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcce884591aab1%3A0xcaefb23d746cefed!2sFeria%20Atlantida!5e0!3m2!1ses!2sar!4v1731880961654!5m2!1ses!2sar"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
