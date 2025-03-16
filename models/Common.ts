import { AxiosError } from "axios";

export type ErrorType = {
  message: string;
  statusCode: number;
};
export type AxiosErrorType = AxiosError<ErrorType>;

export type MenuItem = {
  etiqueta: string;
  url: string;
};
