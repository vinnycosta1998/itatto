import Link from "next/link";
import { Separator } from "./Separator";
import { signOut } from "@/context/auth-context";

interface ProfileCardProps {
  slug: string;
}

export function ProfileCard({ slug }: ProfileCardProps) {
  return (
    <div className="w-32 h-32 bg-zinc-800 absolute right-12 top-[120px] rounded-md flex flex-col items-center justify-around">
      <div className="text-white">
        <Link href={`/profile/${slug}`}>Minha conta</Link>
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
