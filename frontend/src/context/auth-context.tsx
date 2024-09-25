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
  signIn: (credentials: SignInProps) => void;
  signUp: (credentials: SignUpProps) => void;
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
  const isAuthenticated = !!user;

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
            toast.error("Server error");
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

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = fetch("/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            toast.error(
              "Não foi possivel autenticar, tente novamente mais tarde",
            );
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      toast.error("Credenciais invalidas");
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            toast.error(
              "Não foi possivel realizar o cadastro, tente novamente mais tarde",
            );
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signUp, signOut }}
    ></AuthContext.Provider>
  );
}
