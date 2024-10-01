"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import Image from "next/image";

import { setupAPIClient } from "@/lib/axios/api";
import { TattooCard } from "@/components/TattooCard";

export default function Portfolio({ params }: { params: { slug: string } }) {
  const { user } = useContext(AuthContext);
  const [tattoos, setTattoos] = useState([]);

  const fetchTattooData = () => {
    const api = setupAPIClient();

    if (user) {
      api
        .post("/list-tattoos", {
          userId: params.slug,
          page: 1,
        })
        .then((response) => {
          console.log(response.data.tattoos.tattoos);
          setTattoos(response.data.tattoos.tattoos);
        });
    }
  };

  useEffect(() => {
    fetchTattooData();
  }, []);

  return (
    <div className="w-screen h-[140vh] bg-black pt-20 flex flex-col items-center">
      <div className="w-[83rem] flex justify-around items-center">
        <div className="text-white">
          <h1 className="font-bold neon-text text-6xl">
            Vinicius Costa de Almeida
          </h1>
          <span className="text-center">
            Tatuador com 20 anos de experiencia
          </span>
        </div>
        <div>
          <Image
            src="https://github.com/vinnycosta1998.png"
            width={400}
            height={400}
            alt="Imagem de perfil"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <h1 className="font-bold text-2xl text-white">Meu trabalho</h1>
        <div className="grid grid-cols-3 gap-8">
          {tattoos.map((tattoo) => {
            return (
              <TattooCard
                key={tattoo.id}
                greater={true}
                tattooImg={tattoo.image}
                isLoading={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
