import { useEffect, useState } from "react";
import Image from "next/image";
import { LoadingCard } from "./LoadingCard";
import { BackgroundCardTattoo } from "./BackgroundCardTattoo";

interface TattooCardProps {
  id: string;
  greater: boolean;
  tattooImg: string;
  isLoading: boolean;
}

export function TattooCard({
  id,
  greater,
  tattooImg,
  isLoading,
}: TattooCardProps) {
  const [mouseInOver, setMouseInOver] = useState(false);
  const [tattooDeleted, setTattooDeleted] = useState(false);
  const cardWidth = greater ? 400 : 144;

  useEffect(() => {}, [tattooDeleted]);

  return (
    <div
      className={`${
        greater ? "w-[25rem] h-[25rem]" : "w-36 h-36"
      } bg-slate-100 rounded-md cursor-pointer keen-slider__slide`}
      onMouseOver={() => setMouseInOver(true)}
      onMouseLeave={() => setMouseInOver(false)}
    >
      {mouseInOver ? (
        <BackgroundCardTattoo id={id} tattooDeleted={() => tattooDeleted} />
      ) : isLoading ? (
        <LoadingCard />
      ) : (
        <Image
          src={`http://localhost:3333/${tattooImg.slice(6, tattooImg.length)}`}
          width={cardWidth}
          height={cardWidth}
          alt="tatuagem"
          quality={100}
          priority
        />
      )}
    </div>
  );
}
