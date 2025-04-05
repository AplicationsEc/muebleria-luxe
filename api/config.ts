import axios from "axios";
const server = process.env.NEXT_PUBLIC_API || "http://localhost:3000";
const defaultOptions = {
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
};

const _axios = axios.create(defaultOptions);
// console.log("_axios => ", _axios);

const { get, post, put, delete: destroy, patch } = _axios;
export { get, post, put, destroy, patch };
