import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "@/context/auth-context";
import { env } from "@/env";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: env.baseURL,
    headers: {
      Authorization: `Bearer ${cookies["@auth-itattoo:token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response ? error.response.status === 400 : null) {
        if (typeof window !== undefined) {
        }
        signOut();
      } else {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );

  return api;
}
