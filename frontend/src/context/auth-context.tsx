"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "sonner";
import { api } from "@/lib/axios/api-client";

type User = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthContextData = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@auth-itattoo:token");
    toast.success("Logout realizado com sucesso");
  } catch (err) {
    console.log(err);
    toast.error("Erro ao fazer logout");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;
  const router = useRouter();

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/authenticate", {
        email,
        password,
      });

      console.log("login", response);

      const { id, name, token } = response.data;

      setCookie(undefined, "@auth-itattoo:token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      setUser({
        id,
        name,
        email,
      });

      localStorage.setItem("@user-data", JSON.stringify({ id, name, email }));

      router.push(`/dashboard/${id}`);
    } catch (err) {
      toast.error("Erro ao tentar fazer login");
      console.error(err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      toast.success("Cadastro realizado com sucesso!");
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 409) {
          toast.warning("Usuário já cadastrado no sistema");
        } else {
          toast.error(
            "Não foi possível realizar o cadastro, tente novamente mais tarde",
          );
        }
      } else {
        console.error(err);
        toast.error("Erro ao tentar realizar o cadastro");
      }
    }
  }

  useEffect(() => {
    const { "@auth-itattoo:token": token } = parseCookies();

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      api
        .get("/me")
        .then((response) => {
          console.log(response);
          const { id, name, email } = response.data;
          setUser({ id, name, email });
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário", error);
          signOut();
          router.push("/signin");
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
