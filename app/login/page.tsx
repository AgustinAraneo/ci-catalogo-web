"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin");
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) {
      setError(""); // Limpia el mensaje de error si existe
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      setError(""); // Limpia el mensaje de error si existe
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-300 to-white">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        {error && (
          <div className="mb-4 text-red-500 border border-red-500 p-2 rounded">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={handleUsernameChange}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 p-3 mb-6 w-full rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleLogin}
          className="bg-pink-500 text-white py-3 w-full rounded hover:bg-pink-600 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
