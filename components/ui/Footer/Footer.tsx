export const Footer = () => {
  return (
    <footer className="bg-pink-200 text-gray-800 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Columna Izquierda: Dirección */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="font-semibold text-lg">Ubicación</h2>
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
          <h2 className="text-2xl font-bold">Chinitha Fine</h2>
        </div>

        {/* Columna Derecha: Redes Sociales e Información de Contacto */}
        <div className="text-center md:text-right">
          <h2 className="font-semibold text-lg">Contacto</h2>
          <div className="flex flex-col items-center md:items-end space-y-2 mt-2">
            {/* Email */}
            <div className="flex items-center space-x-2">
              <img
                src="/assets/img/icons/mail.svg"
                alt="Email Icon"
                className="w-5 h-5"
              />
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
              <img
                src="/assets/img/icons/phone.svg"
                alt="Phone Icon"
                className="w-5 h-5"
              />
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
              <img
                src="/assets/img/icons/instagram.svg"
                alt="Instagram Icon"
                className="w-5 h-5"
              />
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
