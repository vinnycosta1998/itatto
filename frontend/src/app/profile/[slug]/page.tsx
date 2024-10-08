"use client";

import { useDropzone } from "react-dropzone";
import { PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { api } from "@/lib/axios/api-client";
import Link from "next/link";

const profileBodySchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres." })
    .max(24, { message: "O nome deve ter no máximo 24 caracteres." }),
  bio: z
    .string()
    .min(12, { message: "A biografia deve ter no mínimo 12 caracteres." })
    .max(240, { message: "A biografia deve ter no máximo 240 caracteres." }),
  phone: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/, {
    message: "Número de telefone inválido.",
  }),
  cep: z.string().regex(/^\d{5}-\d{3}$/, {
    message: "CEP inválido. Formato esperado: 99999-999.",
  }),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  houseNumber: z.string(),
});

type ProfileData = z.infer<typeof profileBodySchema>;

export default function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileBodySchema),
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [apiError, setApiError] = useState<null | string>(null);

  const userData = localStorage.getItem("@user-data");

  const userDataParsed = JSON.parse(userData || "");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop,
    multiple: false,
  });

  const cepValue = watch("cep") || "";

  useEffect(() => {
    if (cepValue.length === 9) {
      searchCep();
    }
  }, [cepValue]);

  const searchCep = async () => {
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepValue}/json/`,
      );
      const data = await response.json();
      if (!data.erro) {
        // Se não houver erro, atualize os campos do formulário
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
      } else {
        toast.error("CEP não encontrado");
      }
    } catch (error) {
      toast.error("Erro ao buscar o CEP");
    }
  };

  const createTattooArtist: SubmitHandler<ProfileData> = (data) => {
    console.log("Form data:", data); // Verifica se os dados estão corretos

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("phone", data.phone);
    formData.append("cep", data.cep);
    formData.append("street", data.street);
    formData.append("neighborhood", data.neighborhood);
    formData.append("city", data.city);
    formData.append("houseNumber", data.houseNumber);

    if (selectedFiles.length > 0) {
      formData.append("image", selectedFiles[0]);
    }

    api
      .post("/create-tattoo-artist", formData)
      .then((response) => {
        if (response.status === 400) {
          toast.error("Não foi possivel cadastrar, tente novamente mais tarde");
        } else {
          toast.success("Perfil cadastrado com sucesso");
          console.log("data", response);
        }
      })
      .catch((err: any) => {
        if (err.response) {
          setApiError(
            err.response.data.message || "Erro inesperado ao cadastrar perfil",
          );
        } else {
          setApiError(err.message || "Erro inesperado ao cadastrar perfil");
        }
      });
  };

  return (
    <div className="w-full h-[120vh] bg-black flex flex-col items-center justify-center overflow-x-hidden">
      <h1 className="font-bold neon-text text-3xl text-white">
        Preencha seus dados
      </h1>
      <form
        className="text-zinc-400 flex flex-col"
        onSubmit={handleSubmit(createTattooArtist)}
      >
        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">Nome</label>
        </div>
        <input
          type="text"
          className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite o seu nome"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-400 block">{errors.name.message}</span>
        )}

        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">Bio</label>
        </div>
        <textarea
          rows={40}
          className="w-[26rem] h-32 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite a sua bio"
          {...register("bio")}
        />
        {errors.bio && (
          <span className="text-red-400 block">{errors.bio.message}</span>
        )}

        <div className="w-[26rem] mt-4">
          <label htmlFor="image" className="font-bold text-zinc-200">
            Imagem
          </label>
          <div
            className="w-[26rem] h-[8rem] bg-zinc-800 border-[1px] border-zinc-800 flex flex-col items-center justify-center rounded-md text-zinc-400 cursor-pointer hover:scale-105 hover:border-green-400"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Solte a imagem aqui...</p>
            ) : (
              <p className="w-full text-center">
                Arraste e solte uma imagem aqui, ou clique para selecionar
              </p>
            )}
            <PlusCircle />
          </div>
          {selectedFiles.length > 0 && (
            <p className="text-zinc-400 mt-2">
              Arquivo selecionado: {selectedFiles[0].name}
            </p>
          )}
          <p className="text-zinc-600 text-sm mt-2">
            Formatos suportados: (.jpg, .jpeg, .png)
          </p>
          <span className="text-zinc-600 text-sm mt-2">Tamanho máximo 8Mb</span>
        </div>

        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">Telefone</label>
        </div>
        <input
          type="tel"
          className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite o seu telefone"
          {...register("phone")}
        />
        {errors.phone && (
          <span className="text-red-400 block">{errors.phone.message}</span>
        )}

        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">CEP</label>
        </div>
        <input
          type="text"
          className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite o seu CEP"
          {...register("cep")}
        />
        {errors.cep && (
          <span className="text-red-400 block">{errors.cep.message}</span>
        )}

        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">Rua</label>
        </div>
        <input
          type="text"
          className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite a sua rua"
          {...register("street")}
        />

        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">Bairro</label>
        </div>
        <input
          type="text"
          className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite o seu bairro"
          {...register("neighborhood")}
        />

        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">Cidade</label>
        </div>
        <input
          type="text"
          className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite a sua cidade"
          {...register("city")}
        />

        <div className="w-[26rem] flex justify-start mt-4">
          <label className="font-bold text-white">Complemento</label>
        </div>
        <input
          type="text"
          className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
          placeholder="Digite o numero do complemento"
          {...register("houseNumber")}
        />

        <button
          className="w-[26rem] h-12 border-[1px] border-white rounded-md mt-8"
          type="submit"
        >
          Salvar
        </button>

        <Link
          href={`/dashboard/${userDataParsed.id}`}
          className="text-center mt-4"
        >
          <u>Clique aqui</u> para voltar para o inicio
        </Link>
      </form>
    </div>
  );
}
