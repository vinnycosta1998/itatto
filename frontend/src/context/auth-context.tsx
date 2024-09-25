"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Router } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  password: string;
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
  user: User;
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
  } catch (err) {
    toast.error("Erro ao fazer logout");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user; // transforming state in property boolean

  useEffect(() => {
    const { "@auth-itattoo:token": token } = parseCookies();

    if (token) {
      fetch("/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            toast.error("Erro no servidor");
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  async function signIn({ email, password }: SignInProps): Promise<void> {
    try {
      const response = await fetch("/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast.error("Não foi possível autenticar, tente novamente mais tarde");
        return;
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      toast.error("Credenciais inválidas");
      console.error(err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps): Promise<void> {
    try {
      const response = await fetch("http://localhost:3333/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          toast.warning("Usuário já cadastrado no sistema");
        } else {
          toast.error(
            "Não foi possível realizar o cadastro, tente novamente mais tarde",
          );
        }
        return;
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao tentar realizar o cadastro");
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
