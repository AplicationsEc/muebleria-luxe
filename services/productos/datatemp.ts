import { IProducto } from "@/models/Producto/IProducto";

export const data: IProducto[] = [
  {
    id: 1,
    activo: true,
    precio: 150.5,
    stock: 1,
    imagenUrl:
      "https://raw.githubusercontent.com/felipeAlmEspa/luxeApi/main/assets/1.jpg",
    descripcion: "descripcion de prueba",
    alto: 5,
    ancho: 10,
    largo: 10,
    categoria: "sofa",
    favorito: false,
    carrito: false,
    nombre: "sofa de prueba",
    color1: "ROJO",
    color2: "PLOMO",
    color3: "NEGRO",
  },
];
