import Link from "next/link";
import { Separator } from "./Separator";
import { signOut } from "@/context/auth-context";

interface ProfileCardProps {
  slug: string;
}

export function ProfileCard({ slug }: ProfileCardProps) {
  return (
    <div className="w-40 h-40 bg-zinc-800 absolute right-12 top-[120px] rounded-md flex flex-col items-center justify-around gap-2">
      <div className="text-white">
        <Link href={`/account/${slug}`}>Minha conta</Link>
      </div>
      <Separator />
      <div className="text-white text-center">
        <Link href={`/profile/${slug}`}>Meu perfil</Link>
      </div>
      <Separator />
      <div className="text-white text-center">
        <Link href={`/portfolio/${slug}`}>Portfolio</Link>
      </div>
      <Separator />
      <div className="text-red-400">
        <button onClick={() => signOut()}>Fazer logout</button>
      </div>
    </div>
  );
}
