"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import Image from "next/image";

import { setupAPIClient } from "@/lib/axios/api";
import { TattooCard } from "@/components/TattooCard";

export default function Portfolio({ params }: { params: { slug: string } }) {
  const { user } = useContext(AuthContext);
  const [tattoos, setTattoos] = useState([]);
  const [artist, setArtist] = useState({});

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

  const fetchTattooArtistData = () => {
    const api = setupAPIClient();

    if (user) {
      api
        .post("/list-tattoo-artist", {
          userId: params.slug,
        })
        .then((response) => {
          console.log(response.data.artist);
          setArtist(response.data.artist);
        });
    }
  };

  useEffect(() => {
    fetchTattooData();
    fetchTattooArtistData();
  }, []);

  return (
    <div className="w-screen h-[140vh] bg-black pt-20 flex flex-col items-center">
      <div className="w-[83rem] flex justify-around items-center">
        <div className="text-white">
          <h1 className="font-bold neon-text text-6xl">{artist.name}</h1>
          <div className="flex flex-col items-start">
            <span className="text-center">{artist.bio}</span>
            <span className="text-center text-zinc-400">
              {artist.city} - {artist.state} {artist.neighborhood}-{" "}
              {artist.street}-{artist.houseNumber}{" "}
              <u className="cursor-pointer  ">{artist.phone}</u>{" "}
            </span>
          </div>
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
