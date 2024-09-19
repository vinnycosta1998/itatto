"use client";

import { InfoCard } from "@/components/InfoCard";
import { useState, useEffect } from "react";
import { ArrowDownFromLine } from "lucide-react";
import { motion } from "framer-motion";
import { infoText } from "@/repositories/info-text";

export default function Home() {
  const [backgroundSlide, setBackgroundSlide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Verifica a posição de scroll e ativa o texto quando passa de 200px
      if (window.scrollY > 200) {
        setBackgroundSlide(true);
      } else {
        setBackgroundSlide(false);
      }
    };

    // Adiciona o listener de scroll
    window.addEventListener("scroll", handleScroll);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Variantes de animação
  const itemVariants = {
    hidden: { opacity: 0, x: -500 }, // Inicia à esquerda com opacidade 0
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 }, // Transição suave
    },
  };

  return (
    <div className="w-[100vw] h-[200vh] bg-black flex flex-col justify-start items-center">
      <div className="w-[100vw] h-[100vh] fixed flex flex-col justify-center items-center">
        {/* Vídeo de fundo */}
        <video
          autoPlay={true}
          loop={true}
          muted
          className="w-screen h-screen absolute top-0 left-0 object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
		  <button className="absolute z-10 bg-orange-300">
            <ArrowDownFromLine size={40} color="#FFF" />
          </button>
        </video>

        <div
          className={`h-[100vh] absolute top-1/2 transform -translate-y-1/2 text-center bg-black flex flex-col items-center justify-around transition-all duration-500 ${
            backgroundSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="w-[100vw] font-bold text-8xl text-white neon-text px-64">
            Mostre a sua arte na pele e o seu talento para o mundo!
          </h1>
          
          {/* Grid de InfoCards */}
          <div className="grid grid-cols-2 gap-8">
            {infoText.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial="hidden"
                animate={backgroundSlide ? "visible" : "hidden"} // Condicional de animação
                variants={itemVariants} // Aplicação dos variants
                transition={{ delay: index * 0.2 }} // Delay em cascata
              >
                <InfoCard description={repo.description} logo={repo.logo} />
              </motion.div>
            ))}
          </div>

          <button>
            <ArrowDownFromLine size={40} color="#FFF" />
          </button>
        </div>
      </div>
    </div>
  );
}