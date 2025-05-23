import { AxiosErrorType } from "@/models/Common";
import { IProducto } from "@/models/Producto/IProducto";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { productosKeys } from "./productosKeys";
import { productosApi } from "@/api/productos";

export const useProudctosList = (
  queryOptions?: UseQueryOptions<
    IProducto[],
    AxiosErrorType,
    IProducto[],
    ReturnType<(typeof productosKeys)["list"]>
  >
) => {
  const getProductos = async () => {
    const data = await productosApi.getProductos();
    console.log("data => ssssssssssssaaaaaaa", data);
    return data;
  };
  return useQuery({
    queryKey: ["productos", "list"],
    queryFn: getProductos,
    ...queryOptions, // si tienes más config
  });
};
