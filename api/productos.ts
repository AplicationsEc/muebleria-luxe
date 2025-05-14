import { IProducto } from "@/models/Producto/IProducto";

// URL directa al archivo JSON raw de GitHub
const baseUrl =
  "https://raw.githubusercontent.com/felipeAlmEspa/luxeApi/master/data.json";

export const productosApi = {
  getProductos: async (): Promise<IProducto[]> => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error("Error al obtener los productos");

      const res = await response.json();
      console.log("res => ", res);
      return res ?? []; // Ajustá esto si tu JSON no usa clave "data"
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  },

  getProductoById: async (id: number): Promise<IProducto | null> => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error("Error al obtener el producto");

      const data = await response.json();
      const productos: IProducto[] = data ?? [];

      return productos.find((item) => item.id === id) || null;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return null;
    }
  },

  getProductoByUuid: async (uuid: string): Promise<IProducto | null> => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error("Error al obtener el producto");

      const data = await response.json();
      const productos: IProducto[] = data ?? [];

      return productos.find((item) => item.proUuId === uuid) || null;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return null;
    }
  },
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error("Error al obtener las categorías");

      const data = await response.json();
      const productos: IProducto[] = data ?? [];

      const categories = [...new Set(productos.map((p) => p.categoria))];
      return categories.filter((c): c is string => !!c);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      return [];
    }
  },
};
