"use client";

import Link from "next/link";
import { InfoCard } from "@/components/InfoCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { infoText } from "@/repositories/info-text";

export default function Home() {
  const [backgroundSlide, setBackgroundSlide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 200) {
        setBackgroundSlide(true);
      } else {
        setBackgroundSlide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, x: -500 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="w-[100vw] h-[200vh] bg-black flex flex-col justify-start items-center">
      <div className="w-[100vw] h-[100vh] fixed flex flex-col justify-center items-center">
        <video
          autoPlay={true}
          loop={true}
          muted
          className="w-screen h-screen absolute top-0 left-0 object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div
          className={`h-[100vh] absolute top-1/2 transform -translate-y-1/2 text-center bg-black flex flex-col items-center justify-around transition-all duration-500 ${
            backgroundSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="w-[100vw] font-bold text-8xl text-white neon-text px-64">
            Mostre a sua arte na pele e o seu talento para o mundo!
          </h1>

          <div className="grid grid-cols-2 gap-8">
            {infoText.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial="hidden"
                animate={backgroundSlide ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
              >
                <InfoCard description={repo.description} logo={repo.logo} />
              </motion.div>
            ))}
          </div>
          <Link href="/signup" className="text-zinc-500">
            <u>Clique aqui</u> e cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
