import React from "react";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => (
  <button onClick={onLogout} className="mt-4 bg-red-500 text-white p-2 rounded">
    Cerrar Sesión
  </button>
);
