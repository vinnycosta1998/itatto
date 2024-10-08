"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext, signOut } from "@/context/auth-context";

import { Header } from "@/components/Header";
import { TattooCard } from "@/components/TattooCard";
import { EmpytList } from "@/components/EmpytList";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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

export default function Dashboard({ params }: { params: { slug: string } }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [tattoos, setTattoos] = useState<TattooProps[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const fetchTattooData = () => {
    const api = setupAPIClient();

    if (user) {
      api
        .post("/list-tattoos", {
          userId: params.slug,
          page: 1,
        })
        .then((response) => {
          setTattoos(response.data.tattoos.tattoos);
        });
    }
  };

  useEffect(() => {
    fetchTattooData();
  }, [loading]);

  const userData = localStorage.getItem("@user-data");

  const userName = JSON.parse(userData || "");

  return (
    <div className={"w-screen h-screen bg-black"}>
      <div className="w-full h-full">
        <Header name={userName.name} slug={params.slug} />
        <main className="mt-12 pl-16">
          <div>
            <h1 className="font-bold text-2xl text-white neon-text mb-2">
              Seus uploads
            </h1>
          </div>
          {tattoos.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <EmpytList />
            </div>
          ) : (
            <div className="embla fixed" ref={emblaRef}>
              <div className="embla__container flex gap-2 relative">
                {tattoos.length > 0 &&
                  tattoos.map((tattoo) => {
                    return (
                      <TattooCard
                        key={tattoo.id}
                        id={tattoo.id}
                        greater={false}
                        tattooImg={tattoo.image}
                        isLoading={loading}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
