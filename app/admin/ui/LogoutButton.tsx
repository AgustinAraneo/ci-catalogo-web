import { Button } from "@/components/ui/Button/button";
import type { LogoutButtonProps } from "@/types/type";
import React from "react";

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => (
  <Button onClick={onLogout} className="mt-4 bg-red-500 text-white p-2 rounded">
    Cerrar Sesión
  </Button>
);
