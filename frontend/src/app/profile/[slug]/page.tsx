"use client";

import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";

export default function Profile() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="font-bold neon-text text-4xl text-white">
        Preencha seus dados
      </h1>
      <div className="w-[30rem] h-[60rem]">
        <form className="text-zinc-400">
          <div className="w-[26rem] flex justify-start mt-4">
            <label className="font-bold text-white">Nome</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Digite o seu nome"
          />
          <div className="w-[26rem] flex justify-start mt-4">
            <label className="font-bold text-white">Bio</label>
          </div>
          <textarea
            rows={40}
            className="w-[26rem] h-32 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Digite a sua bio"
          />
          <div className="w-[16rem] mt-4">
            <label htmlFor="image" className="text-zinc-200">
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
              Fomatos suportados: (.jpg, .jpeg, .png)
            </p>
            <span className="text-zinc-600 text-sm mt-2">
              Tamanho máximo 8Mb
            </span>
          </div>
          <div className="w-[26rem] flex justify-start mt-4">
            <label className="font-bold text-white">Telefone</label>
          </div>
          <input
            type="tel"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Digite o seu telefone"
          />
          <div className="w-[26rem] flex justify-start mt-4">
            <label className="font-bold text-white">CEP</label>
          </div>
          <input
            type="number"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Digite o seu CEP"
          />
          <div className="w-[26rem] flex justify-start mt-4">
            <label className="font-bold text-white">Rua</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Digite a sua rua"
          />
          <div className="w-[26rem] flex justify-start mt-4">
            <label className="font-bold text-white">Bairro</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Digite o seu bairro"
          />
          <div className="w-[26rem] flex justify-start mt-4">
            <label className="font-bold text-white">Cidade</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none placeholder:text-zinc-600"
            placeholder="Digite a sua cidade"
          />
          <button
            className="w-[26rem] h-12 border-[1px] border-white rounded-md mt-4"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
