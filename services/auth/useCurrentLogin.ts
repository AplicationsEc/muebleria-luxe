import { AxiosErrorType } from "@/models/Common";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { authUserLoginKeys } from "./authUserLogin";
import { cookiesApi } from "@/api/cookies";

export const useCurrentLogin = (
  queryOptions?: UseQueryOptions<
    string,
    AxiosErrorType,
    string,
    ReturnType<(typeof authUserLoginKeys)["token"]>
  >
) => {
  return useQuery({
    queryKey: ["cookies", "token"],
    queryFn: cookiesApi.getCookieToken,
    ...queryOptions,
  });
};
