import { IUserLogin, IUserParamsLogin } from "@/models/IUser";
import { post } from "./config";

export const authApi = {
  login: async (data: IUserParamsLogin) => {
    const res = await post<IUserLogin>("/auth/login", data);
    return res.data;
  },
};
