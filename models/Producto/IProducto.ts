export interface IProducto {
  id: number;
  proUuId?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  imagenUrlLocal?: string;
  categoria?: string;
  stock: number;
  marca?: string;
  modelo?: string;
  tamano?: string;
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
  sincronizado?: boolean;
}

export interface IProductoDBEliminar {
  id: number;
}
