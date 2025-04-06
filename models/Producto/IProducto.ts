export interface IProducto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  categoria?: string;
  stock: number;
  marca?: string;
  modelo?: string;
  tamaño?: string;
  peso?: number;
  alto?: number;
  ancho?: number;
  largo?: number;
  activo?: boolean;
  descuento?: number;
  favorito?: boolean;
  carrito?: boolean;
  color1?: string;
  color2?: string;
  color3?: string;
}
