'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  colores: string[];
  talles: string[];
}

const AdminPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      nombre: 'Camiseta Deportiva',
      descripcion: 'Camiseta de alta calidad para deportes',
      precio: 25.99,
      colores: ['Rojo', 'Azul', 'Negro'],
      talles: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      nombre: 'Zapatillas de Running',
      descripcion: 'Zapatillas cómodas para correr largas distancias',
      precio: 75.5,
      colores: ['Blanco', 'Negro'],
      talles: ['38', '40', '42']
    }
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const handleAddProduct = () => {
    alert('Funcionalidad para agregar un nuevo producto');
  };

  const handleEditProduct = (id: number) => {
    alert(`Editar producto con ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4 mt-20"> {/* Agregué `mt-20` para margen superior */}
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <button
        onClick={handleAddProduct}
        className="mb-4 bg-green-500 text-white p-2 rounded"
      >
        Agregar Nuevo Producto
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Colores</th>
              <th className="px-4 py-2 border">Talles</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.nombre}</td>
                <td className="px-4 py-2 border">{product.descripcion}</td>
                <td className="px-4 py-2 border">${product.precio.toFixed(2)}</td>
                <td className="px-4 py-2 border">
                  {product.colores.join(', ')}
                </td>
                <td className="px-4 py-2 border">{product.talles.join(', ')}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="bg-blue-500 text-white p-1 rounded"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default AdminPage;
