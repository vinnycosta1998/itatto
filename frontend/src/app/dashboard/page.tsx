"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import { TattooCard } from "@/components/TattooCard";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
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
        console.log(result);
        console.log(result.result);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
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
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
              <TattooCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
