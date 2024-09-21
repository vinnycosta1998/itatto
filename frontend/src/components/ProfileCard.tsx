import Link from "next/link";

export function ProfileCard() {
  return (
    <div className="w-32 h-32 bg-zinc-800 absolute right-12 top-[120px] rounded-md flex flex-col items-center justify-around">
      <div className="text-white">
        <Link href="#">Minha conta</Link>
      </div>
      <div className="text-red-400">
        <button>Fazer logout</button>
      </div>
    </div>
  );
}
