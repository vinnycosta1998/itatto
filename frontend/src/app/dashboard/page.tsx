"use client";

import { useState, useEffect, useContext } from "react";
import { Header } from "@/components/Header";
import { TattooCard } from "@/components/TattooCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";
import { parseCookies } from "nookies";
import { AuthContext, signOut } from "@/context/auth-context";
import { setupAPIClient } from "@/lib/axios/api";

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
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [tattoos, setTattoos] = useState<TattooProps[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  function validateUser() {
    const { "@auth-itattoo:token": token } = parseCookies();

    if (!token) {
      signOut();
    }
  }

  const fetchTattooData = () => {
    const api = setupAPIClient();

    api
      .post("/list-tattoos", {
        userId: "9c41d21e-95aa-4a02-b2a6-b313104bf842",
        page: 1,
      })
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    validateUser();
    fetchTattooData();
  }, []);

  return (
    <div className={"w-screen h-screen bg-black"}>
      <div className="w-full h-full">
        <Header name={user.name} />
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
