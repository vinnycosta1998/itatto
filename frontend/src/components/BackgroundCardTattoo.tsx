import { setupAPIClient } from "@/lib/axios/api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface BackgroundCardTattooProps {
  id: string;
  tattooDeleted: (isDeleted: boolean) => void;
}

export function BackgroundCardTattoo({
  id,
  tattooDeleted,
}: BackgroundCardTattooProps) {
  const deleteTattoo = () => {
    const api = setupAPIClient();

    api
      .post("/delete-tattoo", {
        id,
      })
      .then((response) => {
        toast.success("Arquivo removido com sucesso");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        tattooDeleted(true);
      });
  };

  return (
    <div className="w-36 h-36 bg-zinc-950 transition-all duration-1000 flex justify-around items-center">
      <button
        className="w-6 h-6 text-zinc-400 hover:text-red-400"
        onClick={() => deleteTattoo()}
      >
        <Trash2 />
      </button>
    </div>
  );
}
