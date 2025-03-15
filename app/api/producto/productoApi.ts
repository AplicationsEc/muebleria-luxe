import { get } from "../config";

export const productoApi = {
  listado: async () => {
    const response = await get<unknown>("/producto");
    return response.data;
  },
};
