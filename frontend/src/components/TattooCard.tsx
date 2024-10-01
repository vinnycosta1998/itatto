import Image from "next/image";
import { LoadingCard } from "./LoadingCard";

interface TattooCardProps {
  greater: boolean;
  tattooImg: string;
  isLoading: boolean;
}

export function TattooCard({ greater, tattooImg, isLoading }: TattooCardProps) {
  const cardWidth = greater ? 400 : 144;
  return (
    <div
      className={`${
        greater ? "w-[25rem] h-[25rem]" : "w-36 h-36"
      } bg-slate-100 rounded-md cursor-pointer keen-slider__slide`}
    >
      {isLoading ? (
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
