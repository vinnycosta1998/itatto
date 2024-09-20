"use client";

import Link from "next/link";
import { Poppins } from "@next/font/google";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

const poppinsMono = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const signUpBodySchema = z
  .object({
    name: z.string().min(2, "O nome deve conter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .max(14, "A senha deve conter no máximo 14 caracteres"),
    password_confirmation: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .max(14, "A senha deve conter no máximo 14 caracteres"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas precisam ser iguais",
    path: ["password_confirmation"],
  });

type SignUpFormData = z.infer<typeof signUpBodySchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpBodySchema) });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Função que chama a API sem usar async/await diretamente
  function handleRegisterUser(data: SignUpFormData) {
    setLoading(true);
    setApiError(null);

    fetch("http://localhost:3333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 409) {
            toast.warning("Usúario já cadastrado no sistema");
          }
        }
        return response;
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setApiError(
          error.message || "Erro inesperado ao tentar cadastrar o usuário"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-[100vh] bg-black flex justify-between">
      <div className="w-[50%] h-full">
        <video autoPlay loop muted className="w-full h-full">
          <source src="/video-3.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-[50%]">
        <form
          className="w-full h-full flex flex-col items-center justify-center gap-8"
          onSubmit={handleSubmit(handleRegisterUser)}
        >
          <div>
            <h1
              className={`font-bold ${poppinsMono} text-white text-6xl neon-text`}
            >
              Crie a sua conta
            </h1>
          </div>

          <div className="flex flex-col gap-4 bg-transparent backdrop-blur-xl">
            <label htmlFor="name" className="font-bold text-white">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Digite o seu nome"
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-400">{errors.name.message}</span>
            )}

            <label htmlFor="email" className="font-bold text-white">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Digite o seu email"
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-400">{errors.email.message}</span>
            )}

            <label htmlFor="password" className="font-bold text-white">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite a sua senha"
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-400">{errors.password.message}</span>
            )}

            <label htmlFor="password-confirm" className="font-bold text-white">
              Confirme a Senha
            </label>
            <input
              id="password-confirm"
              type="password"
              placeholder="Confirme a sua senha"
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
              {...register("password_confirmation")}
            />
            {errors.password_confirmation && (
              <span className="text-red-400">
                {errors.password_confirmation.message}
              </span>
            )}

            {/* Mostrar erro da API se houver */}
            {apiError && <span className="text-red-400">{apiError}</span>}

            <button
              className="w-[30rem] h-12 rounded-lg cursor-pointer bg-gray-900 text-zinc-400"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastre-se"}
            </button>
            <div className="w-full flex justify-center">
              <Link href="/signin" className="text-zinc-400">
                Já possui uma conta? <u>Clique aqui</u>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
