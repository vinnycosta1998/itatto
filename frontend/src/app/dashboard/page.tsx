"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { TattooCard } from "@/components/TattooCard";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";

interface TattooProps {
  id: string;
  title: string;
  description: string;
  genre: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
}
[];

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tattoos, setTattoos] = useState<TattooProps[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  function fetchTattoData() {
    setLoading(true);
    fetch("http://localhost:3333/list-tattoos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "9c41d21e-95aa-4a02-b2a6-b313104bf842",
        page: 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Não foi possível carregar as imagens");
        }
        return response.json();
      })
      .then((result) => {
        setTattoos(result.tattoos.tattoos);
        console.log(result.tattoos.tattoos);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(true);
      });
  }

  useEffect(() => {
    fetchTattoData();
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <div className="w-full h-full">
        <Header />
        <main className="mt-12 pl-16">
          <div>
            <h1 className="font-bold text-2xl text-white neon-text mb-2">
              Realista
            </h1>
          </div>
          <div className="embla fixed" ref={emblaRef}>
            <div className="embla__container flex gap-2 relative">
              {tattoos.map((tattoo) => {
                return (
                  <TattooCard
                    key={tattoo.id}
                    tattooImg={tattoo.image}
                    isLoading={loading}
                  />
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
