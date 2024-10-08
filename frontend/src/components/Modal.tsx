"use-client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { PlusCircle } from "lucide-react";
import { api } from "@/lib/axios/api-client";

interface ModalProps {
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  slug: string;
}

const createTatooFormSchema = z.object({
  title: z
    .string()
    .min(2, "O título precisa conter no mínimo 2 caracteres")
    .max(24, "O título precisa conter no máximo 24 caracteres"),
  description: z
    .string()
    .min(2, "A descrição precisa conter no mínimo 2 caracteres")
    .max(60, "A descrição precisa conter no máximo 60 caracteres"),
  genre: z.string(),
});

type CreateTattooData = z.infer<typeof createTatooFormSchema>;

export function Modal({ modalIsOpen, handleCloseModal, slug }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<null | string>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTattooData>({
    resolver: zodResolver(createTatooFormSchema),
  });

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

  const userData = localStorage.getItem("@user-data");
  const userDataParsed = JSON.parse(userData || "");
  let userId = userDataParsed.id;

  function handleCreateTattoo(data: CreateTattooData) {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("genre", data.genre);
    formData.append("user_id", userId);

    if (selectedFiles.length > 0) {
      formData.append("image", selectedFiles[0]);
    }

    api
      .post("/create-tattoo", formData)
      .then((response) => {
        if (response.status === 413) {
          toast.warning("Descrição deve conter no máximo 60 caracteres");
          throw new Error("Erro ao cadastrar tatuagem");
        }

        toast.success("Tatuagem cadastrada com sucesso!");
      })
      .catch((err: any) => {
        if (err.response) {
          setApiError(
            err.response.data.message ||
              "Erro inesperado ao cadastrar tatuagem",
          );
        } else {
          setApiError(err.message || "Erro inesperado ao cadastrar tatuagem");
        }
      })
      .finally(() => {
        setLoading(false);
        handleCloseModal();
      });
  }

  return (
    <div className="w-[30rem] h-[46rem] bg-zinc-950 absolute z-20 top-[20%] left-[42%] rounded-lg flex flex-col items-center justify-center">
      <header className="w-full h-8 flex justify-end items-center px-4 py-6 text-red-400 gap-2">
        <button
          className="w-3 h-3 rounded-full bg-red-400"
          onClick={() => handleCloseModal()}
        ></button>
        <button className="w-3 h-3 rounded-full bg-yellow-400"></button>
        <button className="w-3 h-3 rounded-full bg-green-400"></button>
      </header>

      <form
        className="w-full h-full flex flex-col items-center gap-2 mt-8"
        onSubmit={handleSubmit(handleCreateTattoo)} // Formulário correto
      >
        <div>
          <h1 className="font-bold text-xl text-zinc-400">
            Cadastre uma nova arte
          </h1>
        </div>

        <div className="w-[16rem]">
          <label htmlFor="title" className="text-zinc-200">
            Titulo
          </label>
          <input
            id="title"
            type="text"
            className="w-full h-8 bg-zinc-800 text-zinc-400 px-2 rounded-md outline-none"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-500 text-center">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="w-[16rem] mt-4">
          <label htmlFor="description" className="text-zinc-200">
            Descrição
          </label>
          <textarea
            id="description"
            cols={20}
            rows={40}
            className="w-full h-8 bg-zinc-800 text-zinc-400 px-2 rounded-md outline-none"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-center">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="w-[16rem] mt-4">
          <label htmlFor="genre" className="text-zinc-200">
            Gênero
          </label>
          <select
            id="genre"
            className="w-full h-8 bg-zinc-800 text-zinc-400 cursor-pointer px-2 rounded-md outline-none"
            {...register("genre")}
          >
            <option value="abstrato">Abstrato</option>
            <option value="realista">Realista</option>
            <option value="old-school">Old School</option>
            <option value="pontilhismo">Pontilhismo</option>
            <option value="black-work">Black Work</option>
            <option value="geometrico">Geometrico</option>
            <option value="minimalista">Minimalista</option>
            <option value="single-line">Single Line</option>
            <option value="oriental">Oriental</option>
          </select>
          {errors.genre && (
            <span className="text-red-500">{errors.genre.message}</span>
          )}
        </div>

        <div className="w-[16rem] mt-4">
          <label htmlFor="image" className="text-zinc-200">
            Imagem
          </label>
          <div
            className="w-full h-[8rem] bg-zinc-800 border-[1px] border-zinc-800 flex flex-col items-center justify-center rounded-md text-zinc-400 cursor-pointer hover:scale-105 hover:border-green-400"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Solte a imagem aqui...</p>
            ) : (
              <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
            )}
            <PlusCircle />
          </div>
          {selectedFiles.length > 0 && (
            <p className="text-zinc-400 mt-2">
              Arquivo selecionado: {selectedFiles[0].name}
            </p>
          )}
          <p className="text-zinc-600 text-sm mt-2">
            Fomatos suportados: (.jpg, .jpeg, .png)
          </p>
          <span className="text-zinc-600 text-sm mt-2">Tamanho máximo 8Mb</span>
        </div>

        <button
          type="submit"
          className="w-[16rem] h-8 bg-green-600 font-bold text-white rounded-md mt-6"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Cadastrar"}
        </button>

        {apiError && <span className="text-red-500 mt-4">{apiError}</span>}
      </form>
    </div>
  );
}
