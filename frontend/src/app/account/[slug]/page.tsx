"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { setupAPIClient } from "@/lib/axios/api";
import { toast } from "sonner";

const updateProfileBodySchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve conter no minimo 8 caractheres")
      .max(14, "A senha deve conter no máximo 14 caractheres"),
    new_password: z
      .string()
      .min(8, "A senha deve conter no minimo 8 caractheres")
      .max(14, "A senha deve conter no máximo 14 caractheres"),
    new_password_confirmation: z
      .string()
      .min(8, "A senha deve conter no minimo 8 caractheres")
      .max(14, "A senha deve conter no máximo 14 caractheres"),
  })
  .refine((data) => data.password === data.new_password_confirmation, {
    message: "As senhas precisam ser iguais",
    path: ["password_confirmation"],
  });

type UpdateProfileData = z.infer<typeof updateProfileBodySchema>;

export default function Profile({ params }: { params: { slug: string } }) {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileBodySchema),
  });

  const userData = localStorage.getItem("@user-data");

  const userName = JSON.parse(userData || "");

  function handleUpdatePassword(data: UpdateProfileData) {
    const api = setupAPIClient();

    if (user) {
      try {
        api
          .post("/update-password", {
            email: user.email,
            password: data.password,
          })
          .then((response) => {
            console.log(response);
          });
        toast.success("Senha atualizadas com sucesso");
      } catch (err) {
        toast.error("não foi possível atualizar a senha");
      }
    }
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-[30rem] h-[40rem] rounded-lg">
        <form
          className="w-full h-full flex flex-col items-center gap-4 text-zinc-400"
          onSubmit={handleSubmit(handleUpdatePassword)}
        >
          <h1 className="text-4xl neon-text">Altere os seus dados </h1>
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Nome</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder={userName.name}
            readOnly
          />

          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Email</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none  placeholder:text-zinc-600"
            placeholder={userName.email}
            readOnly
          />
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Senha atual</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none  placeholder:text-zinc-400"
            placeholder="Digite a sua senha atual"
            {...register("password")}
          />
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Nova senha</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="Digite a sua senha"
            {...register("new_password")}
          />
          {errors.new_password && (
            <span className="text-red-400">{errors.new_password.message}</span>
          )}
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Confirme a senha</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="Confirme a sua senha"
            {...register("new_password_confirmation")}
          />
          {errors.new_password_confirmation && (
            <span className="text-red-400">
              {errors.new_password_confirmation.message}
            </span>
          )}
          <button className="w-[26rem] h-12 bg-zinc-900 font-bold text-white rounded-md">
            Alterar dados
          </button>

          <Link
            href={`/dashboard/${params.slug}`}
            className="font-bold text-white mt-8"
          >
            Volte para o início
          </Link>
        </form>
      </div>
    </div>
  );
}
