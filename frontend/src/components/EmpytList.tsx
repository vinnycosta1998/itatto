import { CirclePlus } from "lucide-react";

export function EmpytList() {
  return (
    <div className="w-[20rem] h-full border-[1px] border-zinc-700 rounded-md flex flex-col items-center justify-center gap-8 mt-64 p-8">
      <CirclePlus size={40} color="#fff" />
      <span className="text-white text-center">
        Registre novas tatuagens e vizualize o seu trabalho
      </span>
    </div>
  );
}
