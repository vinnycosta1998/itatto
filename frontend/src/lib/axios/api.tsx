import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "@/context/auth-context";
import { AuthTokenError } from "@/errors/AuthTokenError";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@auth-itattoo:token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Verifica se o status é 401 (não autorizado)
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          signOut(); // Desloga o usuário no client-side
        } else {
          return Promise.reject(new AuthTokenError()); // Lança erro customizado no server-side
        }
      }

      return Promise.reject(error); // Retorna o erro para ser tratado em outro lugar, se necessário
    },
  );

  return api;
}
