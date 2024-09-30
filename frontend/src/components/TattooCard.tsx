import Image from "next/image";
import { LoadingCard } from "./LoadingCard";

interface TattooCardProps {
  tattooImg: string;
  isLoading: boolean;
}

export function TattooCard({ tattooImg, isLoading }: TattooCardProps) {
  return (
    <div className="w-36 h-36 bg-slate-100 rounded-md cursor-pointer keen-slider__slide mx-6">
      {isLoading ? (
        <LoadingCard />
      ) : (
        <Image
          src={`http://localhost:3333/${tattooImg.slice(6, tattooImg.length)}`}
          width={144}
          height={144}
          alt="tatuagem"
          quality={100}
          priority
        />
      )}
    </div>
  );
}
