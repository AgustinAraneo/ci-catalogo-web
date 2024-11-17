"use client";

import React from "react";

export const MapEmbed = () => {
  return (
    <div className="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.314611108181!2d-58.47910542558664!3d-34.72246336377677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcce884591aab1%3A0xcaefb23d746cefed!2sFeria%20Atlantida!5e0!3m2!1ses!2sar!4v1731882249253!5m2!1ses!2sar"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
