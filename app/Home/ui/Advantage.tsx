import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdvantageSection = () => {
  return (
    <section className="bg-white py-16 px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center text-center">
          <div className="bg-pink-100 p-4 rounded-full mb-4">
            <FontAwesomeIcon icon="leaf" size="2x" className="text-pink-300" />
          </div>
          <h3 className="text-[24px] font-bold text-black-primary leading-[24px] mb-2">
            Comodidad
          </h3>
          <p className="text-gray-600 max-w-[400px]">
            Diseñamos prendas siempre pensando primero en vos.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-pink-100 p-4 rounded-full mb-4">
            <FontAwesomeIcon icon="star" size="2x" className="text-pink-300" />
          </div>
          <h3 className="text-[24px] font-bold text-black-primary leading-[24px] mb-2">
            Calidad
          </h3>
          <p className="text-gray-600 max-w-[400px]">
            Cada prenda está confeccionada con atención al detalle, garantizando
            un acabado excepcional y durabilidad.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-pink-100 p-4 rounded-full mb-4">
            <FontAwesomeIcon
              icon="tshirt"
              size="2x"
              className="text-pink-300"
            />
          </div>
          <h3 className="text-[24px] font-bold text-black-primary leading-[24px] mb-2">
            Estilo único
          </h3>
          <p className="text-gray-600 max-w-[400px]">
            Nuestras prendas combinan diseño moderno y versatilidad para que
            encuentres el estilo que mejor refleja tu personalidad.
          </p>
        </div>
      </div>
    </section>
  );
};
