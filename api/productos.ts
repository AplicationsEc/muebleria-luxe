import { URL_SERVER_API } from "@/helper/constants";
import { IProducto } from "@/models/Producto/IProducto";

const baseUrl = URL_SERVER_API;

export const productosApi = {
  getProductos: async () => {
    try {
      const response = await fetch(baseUrl);
      let res: IProducto[] = [];
      const text = await response.text();
      // Extraer contenido del <pre>
      const jsonMatch = text.match(/<pre>([\s\S]*?)<\/pre>/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          // Intentar convertir a JSON
          const jsonData = JSON.parse(jsonMatch[1]);
          res = jsonData.data;
        } catch (parseError) {
          console.error("Error al parsear JSON:", parseError);
          res = [];
        }
      } else {
        console.error("No se encontró contenido JSON válido en el <pre>");
        alert("Error");
        res = [];
      }
      return res;
    } catch (error) {
      alert("Error" + JSON.stringify(error));
      console.error("Error al obtener los datos:", error);
      return [];
    }
  },
  getProductoById: async (id: number) => {
    try {
      const response = await fetch(baseUrl);
      let res: IProducto | null = null;
      const text = await response.text();
      // Extraer contenido del <pre>
      const jsonMatch = text.match(/<pre>([\s\S]*?)<\/pre>/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          // Intentar convertir a JSON
          const jsonData = JSON.parse(jsonMatch[1]);
          const listaPro: IProducto[] = jsonData.data;
          res = listaPro.find((item) => item.id === id) || null;
        } catch (parseError) {
          console.error("Error al parsear JSON:", parseError);
          res = null;
        }
      } else {
        console.error("No se encontró contenido JSON válido en el <pre>");
        alert("Error");
        res = null;
      }
      return res;
    } catch (error) {
      alert("Error" + JSON.stringify(error));
      console.error("Error al obtener los datos:", error);
      return null;
    }
  },
  getCategories: async () => {
    try {
      const response = await fetch(baseUrl);
      let res: IProducto[] = [];
      const text = await response.text();
      // Extraer contenido del <pre>
      const jsonMatch = text.match(/<pre>([\s\S]*?)<\/pre>/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          // Intentar convertir a JSON
          const jsonData = JSON.parse(jsonMatch[1]);
          res = jsonData.data;
        } catch (parseError) {
          console.error("Error al parsear JSON:", parseError);
          res = [];
        }
      } else {
        console.error("No se encontró contenido JSON válido en el <pre>");
        alert("Error");
        res = [];
      }
      const categories = [...new Set(res.map((product) => product.categoria))];
      const restFinal = categories.filter((item) => item !== undefined);
      return Promise.resolve(restFinal);
    } catch (error) {
      alert("Error" + JSON.stringify(error));
      console.error("Error al obtener los datos:", error);
      return [];
    }
  },
};

// Mock data for demonstration purposes
// const mockProducts: IProducto[] = [
//   {
//     id: 1,
//     nombre: "Smartphone Galaxy S23",
//     descripcion:
//       "Smartphone de última generación con cámara de alta resolución y batería de larga duración.",
//     precio: 799.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=Galaxy+S23",
//     categoria: "Electrónicos",
//     stock: 15,
//     marca: "Samsung",
//     modelo: "S23",
//     peso: 0.168,
//     alto: 14.6,
//     ancho: 7.1,
//     largo: 0.8,
//   },
//   {
//     id: 2,
//     nombre: "Laptop ProBook X5",
//     descripcion:
//       "Laptop potente para trabajo y entretenimiento con procesador de última generación.",
//     precio: 1299.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=ProBook+X5",
//     categoria: "Electrónicos",
//     stock: 8,
//     marca: "ProTech",
//     modelo: "X5",
//     peso: 1.8,
//     alto: 1.5,
//     ancho: 32.5,
//     largo: 22.0,
//   },
//   {
//     id: 3,
//     nombre: "Zapatillas Running Pro",
//     descripcion:
//       "Zapatillas deportivas con tecnología de amortiguación avanzada para corredores.",
//     precio: 129.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=Running+Pro",
//     categoria: "Deportes",
//     stock: 25,
//     marca: "SportFlex",
//     modelo: "Running Pro 2023",
//     tamaño: "42 EU",
//   },
//   {
//     id: 4,
//     nombre: "Cámara DSLR 4K",
//     descripcion:
//       "Cámara profesional con sensor de alta resolución y grabación de video en 4K.",
//     precio: 899.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=DSLR+4K",
//     categoria: "Electrónicos",
//     stock: 5,
//     marca: "PhotoPro",
//     modelo: "DSLR-X4000",
//     peso: 0.75,
//     alto: 10.5,
//     ancho: 14.0,
//     largo: 7.8,
//   },
//   {
//     id: 5,
//     nombre: "Silla Ergonómica Office Pro",
//     descripcion:
//       "Silla de oficina con diseño ergonómico para mayor comodidad durante largas jornadas de trabajo.",
//     precio: 249.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=Office+Pro",
//     categoria: "Muebles",
//     stock: 12,
//     marca: "ComfortPlus",
//     modelo: "Office Pro 2023",
//     peso: 15.5,
//     alto: 120,
//     ancho: 65,
//     largo: 65,
//   },
//   {
//     id: 6,
//     nombre: "Auriculares Bluetooth NoiseCancel",
//     descripcion:
//       "Auriculares inalámbricos con cancelación de ruido activa y batería de larga duración.",
//     precio: 179.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=NoiseCancel",
//     categoria: "Electrónicos",
//     stock: 20,
//     marca: "SoundMaster",
//     modelo: "NC-500",
//     peso: 0.28,
//   },
//   {
//     id: 7,
//     nombre: "Reloj Inteligente FitTrack",
//     descripcion:
//       "Smartwatch con monitoreo de actividad física, ritmo cardíaco y notificaciones.",
//     precio: 149.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=FitTrack",
//     categoria: "Electrónicos",
//     stock: 18,
//     marca: "TechFit",
//     modelo: "FitTrack 3",
//     peso: 0.045,
//     alto: 4.2,
//     ancho: 3.6,
//     largo: 1.2,
//   },
//   {
//     id: 8,
//     nombre: "Licuadora Profesional BlendMaster",
//     descripcion:
//       "Licuadora de alta potencia con múltiples velocidades y vaso de gran capacidad.",
//     precio: 89.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=BlendMaster",
//     categoria: "Hogar",
//     stock: 10,
//     marca: "KitchenPro",
//     modelo: "BlendMaster 2000",
//     peso: 3.2,
//     alto: 45,
//     ancho: 20,
//     largo: 18,
//   },
//   {
//     id: 9,
//     nombre: "Mochila Impermeable TrekPro",
//     descripcion:
//       "Mochila resistente al agua con múltiples compartimentos y sistema de ventilación.",
//     precio: 79.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=TrekPro",
//     categoria: "Accesorios",
//     stock: 30,
//     marca: "OutdoorGear",
//     modelo: "TrekPro 35L",
//     peso: 0.95,
//     alto: 50,
//     ancho: 30,
//     largo: 20,
//   },
//   {
//     id: 10,
//     nombre: "Tablet Education Plus",
//     descripcion:
//       "Tablet diseñada para estudiantes con pantalla resistente y batería de larga duración.",
//     precio: 299.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=Education+Plus",
//     categoria: "Electrónicos",
//     stock: 7,
//     marca: "LearnTech",
//     modelo: "Education Plus 10",
//     peso: 0.48,
//     alto: 24.5,
//     ancho: 17.0,
//     largo: 0.8,
//   },
//   {
//     id: 11,
//     nombre: "Cafetera Automática BrewMaster",
//     descripcion:
//       "Cafetera programable con molinillo integrado y sistema de filtración avanzado.",
//     precio: 129.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=BrewMaster",
//     categoria: "Hogar",
//     stock: 9,
//     marca: "CoffeePro",
//     modelo: "BrewMaster 5000",
//     peso: 4.2,
//     alto: 35,
//     ancho: 25,
//     largo: 20,
//   },
//   {
//     id: 12,
//     nombre: "Altavoz Bluetooth SoundWave",
//     descripcion:
//       "Altavoz portátil con sonido envolvente y resistencia al agua.",
//     precio: 69.99,
//     imagenUrl: "/placeholder.svg?height=400&width=400&text=SoundWave",
//     categoria: "Electrónicos",
//     stock: 22,
//     marca: "AudioTech",
//     modelo: "SoundWave Mini",
//     peso: 0.35,
//     alto: 8,
//     ancho: 8,
//     largo: 8,
//   },
// ];

// // Get all products
// export async function getProducts(): Promise<IProducto[]> {
//   // In a real application, this would fetch from an API or database
//   return Promise.resolve(mockProducts);
// }

// // Get a single product by ID
// export async function getProductById(
//   id: number
// ): Promise<IProducto | undefined> {
//   // In a real application, this would fetch from an API or database
//   return Promise.resolve(mockProducts.find((product) => product.id === id));
// }

// Get all unique categories
// export async function getCategories(): Promise<string[]> {
//   // In a real application, this would fetch from an API or database
//   const categories = [
//     ...new Set(mockProducts.map((product) => product.categoria)),
//   ];
//   const restFinal = categories.filter((item) => item !== undefined);
//   return Promise.resolve(restFinal);
// }
