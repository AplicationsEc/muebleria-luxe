import axios from "axios";
import { URL_SERVER_API } from "../helper/constants";

const server = URL_SERVER_API;

const defaultOptions = {
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
};

const _axios = axios.create(defaultOptions);

const { get, post, put, delete: destroy, patch } = _axios;
export { get, post, put, destroy, patch };
