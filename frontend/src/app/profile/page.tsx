"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const updateProfileBodySchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve conter no minimo 8 caractheres")
      .max(14, "A senha deve conter no máximo 14 caractheres"),
    password_confirmation: z
      .string()
      .min(8, "A senha deve conter no minimo 8 caractheres")
      .max(14, "A senha deve conter no máximo 14 caractheres"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas precisam ser iguais",
    path: ["password_confirmation"],
  });

type UpdateProfileData = z.infer<typeof updateProfileBodySchema>;

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileBodySchema),
  });

  function handleUpdatePassword(data: UpdateProfileData) {
    console.log(data);
  }
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-[30rem] h-[40rem] rounded-lg">
        <form className="w-full h-full flex flex-col items-center gap-4 text-zinc-400">
          <h1 className="text-4xl neon-text">Altere os seus dados </h1>
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Nome</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Vinicius Costa de Almeida"
            readOnly
          />

          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Email</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none  placeholder:text-zinc-600"
            placeholder="viniciuscostadealmeida98@gmail.com"
            readOnly
          />
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Senha</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="Digite a sua senha"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Confirme a senha</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="Confirme a sua senha"
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <span className="text-red-400">
              {errors.password_confirmation.message}
            </span>
          )}
          <button className="w-[26rem] h-12 bg-zinc-900 font-bold text-white rounded-md">
            Alterar dados
          </button>

          <Link href="/dashboard" className="font-bold text-white mt-8">
            Volte para o início
          </Link>
        </form>
      </div>
    </div>
  );
}
