"use client";
import { useContext } from "react";
import Link from "next/link";
import { Poppins } from "@next/font/google";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AuthContext } from "@/context/auth-context";

// Configurando a fonte Poppins
const poppinsMono = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const signInBodySchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "A senha deve conter no minimo 8 carachteres")
    .max(14, "A senha deve conter no maximo 14 caractheres"),
});

type SignInFormData = z.infer<typeof signInBodySchema>;

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInBodySchema),
  });

  const handleSignInUser = (data: SignInFormData) => {
    signIn({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full h-[100vh] bg-black flex justify-between items-center">
      <div className="h-[90%]">
        <video
          autoPlay={true}
          loop={true}
          muted
          className="w-full h-full rounded-lg ml-8"
        >
          <source src="/video-3.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-[50%] flex flex-col">
        <form
          onSubmit={handleSubmit(handleSignInUser)}
          className="w-full h-full flex flex-col items-center justify-center gap-8"
        >
          <div className="w-[30rem] flex justify-center">
            <h1
              className={`font-bold ${poppinsMono} text-white text-4xl neon-text`}
            >
              Entre com a sua conta
            </h1>
          </div>

          <div className="flex flex-col gap-4 bg-transparent backdrop-blur-xl">
            <label htmlFor="email" className="font-bold text-white">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Digite o seu email"
              {...register("email")}
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
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
              {...register("password")} // Registro do input no useForm
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
            />
            {errors.password && ( // Exibição do erro de validação de senha
              <span className="text-red-400">{errors.password.message}</span>
            )}

            <button
              type="submit"
              className="w-[30rem] h-12 rounded-lg cursor-pointer bg-gray-900 text-zinc-400"
              disabled={loading}
            >
              Entrar
            </button>

            <div className="w-full flex justify-center">
              <Link href="/signup" className="text-zinc-400">
                Não possui uma conta? <u>Clique aqui e cadastre-se</u>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
