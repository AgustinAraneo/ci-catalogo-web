"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id?: string;
  title: string;
  price: number;
  sizes: string[];
  quantity: number | null;
}

export const HomeAdmin = () => {
  const router = useRouter();
  const [isLoggedTrue, setIsLoggedTrue] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]); // Asegura que 'products' sea un arreglo
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    price: 0,
    sizes: [],
    quantity: null,
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsLoggedTrue(true);
    }
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/v1/db/get-products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []); // Verifica que 'data' sea un arreglo
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const handleAddProduct = async () => {
    const priceNumber =
      typeof newProduct.price === "string"
        ? parseFloat(newProduct.price)
        : newProduct.price;

    const res = await fetch("/api/v1/db/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newProduct,
        price: priceNumber, // Asegura que el precio se pase como número
      }),
    });

    if (res.ok) {
      const addedProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]); // Usa la función de actualización de estado para evitar el error
      setNewProduct({ title: "", price: 0, sizes: [], quantity: null });
    } else {
      alert("Error al agregar el producto");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    setNewProduct({
      ...newProduct,
      sizes: newProduct.sizes.includes(size)
        ? newProduct.sizes.filter((s) => s !== size)
        : [...newProduct.sizes, size],
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      quantity: e.target.value ? parseInt(e.target.value) : null,
    });
  };

  if (!isLoggedTrue) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <button
        onClick={() =>
          setNewProduct({
            title: "",
            price: 0,
            sizes: [],
            quantity: null,
          })
        }
        className="mb-4 bg-green-500 text-white p-2 rounded"
      >
        Agregar Nuevo Producto
      </button>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Nuevo Producto</h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newProduct.title}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <div className="mb-2">
          <label className="block">Talles</label>
          {["S", "M", "L", "XL"].map((size) => (
            <label key={size} className="mr-4">
              <input
                type="checkbox"
                value={size}
                checked={newProduct.sizes.includes(size)}
                onChange={handleSizeChange}
                className="mr-1"
              />
              {size}
            </label>
          ))}
        </div>
        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={newProduct.quantity ?? ""}
          onChange={handleQuantityChange}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Agregar Producto
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Talles</th>
              <th className="px-4 py-2 border">Cantidad</th>
              <th className="px-4 py-2 border">Link</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="px-4 py-2 border">{product.id}</td>
                  <td className="px-4 py-2 border">{product.title}</td>
                  <td className="px-4 py-2 border">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    {product.sizes.join(", ")}
                  </td>
                  <td className="px-4 py-2 border">
                    {product.quantity !== null
                      ? product.quantity
                      : "No definido"}
                  </td>
                  <td className="px-4 py-2 border">
                    <a className="text-blue-500" href={`/shop/${product.id}`}>
                      Link
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <p>No hay productos disponibles</p>
            )}
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
