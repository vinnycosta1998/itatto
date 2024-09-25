import Image from "next/image";
import { LoadingCard } from "./LoadingCard";

interface TattooCardProps {
  tattooImg: string;
  isLoading: boolean;
}

export function TattooCard({ id, tattooImg, isLoading }: TattooCardProps) {
  return (
    <div className="w-36 h-36 bg-slate-100 rounded-md cursor-pointer keen-slider__slide mx-6">
      {isLoading ? (
        <LoadingCard />
      ) : (
        <Image
          src={`http://localhost:3333/public/image.jpeg`}
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
