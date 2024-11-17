import { FaInstagram, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-black-primary text-white py-8 px-6 font-lato"> {/* Añadido `px-6` para margen horizontal */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Columna Izquierda: Dirección */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="font-semibold text-lg text-gold">Ubicación</h2>
          <a
            href="https://maps.app.goo.gl/7Q9uaFfLsEhoqpLE8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Feria “ATLÁNTIDA” Local 30 (LA SALADA)
          </a>
        </div>

        {/* Columna Central: Nombre */}
        <div className="mb-4 md:mb-0 text-center">
          <h2 className="text-2xl font-bold text-gold">Chinitha Fine</h2>
          <p>La ropa que te queda, y el precio que te cierra</p>
        </div>

        {/* Columna Derecha: Redes Sociales e Información de Contacto */}
        <div className="text-center md:text-right">
          <h2 className="font-semibold text-lg text-gold">Contacto</h2>
          <div className="flex flex-col items-center md:items-end space-y-2 mt-2">
            {/* Email */}
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
            {/* Teléfono */}
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
            {/* Instagram */}
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
    </footer>
  );
};
