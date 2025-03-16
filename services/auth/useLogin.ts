import { authApi } from "@/api/auth";
import { AxiosErrorType } from "@/models/Common";
import { IUserLogin, IUserParamsLogin } from "@/models/IUser";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
export const useLogin = (
  mutationOptions?: UseMutationOptions<
    IUserLogin,
    AxiosErrorType,
    IUserParamsLogin,
    unknown
  >
) => {
  return useMutation({
    mutationFn: authApi.login,
    onError: (err) => {
      toast.error("Error al eliminar", {
        description: err.response?.data.message || err.message,
      });
    },
    onSettled: () => {
      toast.success("Eliminado con exito");
    },
    ...mutationOptions,
  });
};
