import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { productosKeys } from "./productosKeys";
import { productosApi } from "@/api/productos";
import { IProducto } from "@/models/Producto/IProducto";

export const useProductoById = (
  id: number,
  queryOptions?: UseQueryOptions<
    IProducto | null,
    AxiosError,
    IProducto | null,
    ReturnType<(typeof productosKeys)["proFilterById"]>
  >
) => {
  const obtenerCategoriaByUuid = async () => {
    return await productosApi.getProductoById(id);
  };
  return useQuery({
    queryKey: ["productos", "pro", id],
    queryFn: obtenerCategoriaByUuid,
    ...queryOptions,
  });
};
