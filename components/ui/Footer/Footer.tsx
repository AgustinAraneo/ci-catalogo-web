import { FaInstagram, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-black-primary text-white py-8 px-6 font-lato">
      <div className="container mx-auto">
        {/* Sección Superior: Logo, Iconos de Contacto y Métodos de Pago */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-6 space-y-4 md:space-y-0">
          {/* Iconos de Contacto */}
          <div className="flex space-x-6 items-center">
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

          {/* Logo */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gold">Chinitha Fine</h1>
          </div>

          {/* Métodos de Pago */}
          <div className="flex space-x-4 items-center">
            <img src="assets/img/icons/visa.svg" alt="Visa" className="h-8 w-auto" />
            <img src="assets/img/icons/master.svg" alt="MasterCard" className="h-8 w-auto" />
            <img src="assets/img/icons/efectivo.png" alt="Efectivo" className="h-8 w-auto" />
          </div>
        </div>

        {/* Línea Separadora */}
        <hr className="border-gray-700 mb-6" />

        {/* Contenido Principal */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Columna Izquierda: Ubicación */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="font-semibold text-lg text-gold">Ubicación</h2>
            <a
              href="https://maps.app.goo.gl/7Q9uaFfLsEhoqpLE8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Feria “ATLÁNTIDA” - Local 30 </a>
          </div>

          {/* Columna Central: Descripción */}
          <div className="mb-4 md:mb-0 text-center">
            <p>"La ropa que te queda, y el precio que te cierra"</p>
          </div>

          {/* Columna Derecha: Contacto (iconos alineados horizontalmente) */}
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
      </div>
    </footer>
  );
};
