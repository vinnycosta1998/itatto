import Link from "next/link";
import { Poppins } from "@next/font/google";

const poppinsMono = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function SignIn() {
  return (
    <div className="w-full h-[100vh] bg-black flex justify-between">
      <div className="w-[50%] h-full">
        <video autoPlay={true} loop={true} muted className="w-full h-full">
          <source src="/video-3.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="w-[50%]">
        <form
          action=""
          className="w-full h-full flex flex-col items-center justify-center gap-8"
        >
          <div>
            <h1
              className={`font-bold ${poppinsMono} text-white text-6xl neon-text`}
            >
              Crie a sua conta
            </h1>
          </div>
          <div className="flex flex-col gap-4 bg-transparent backdrop-blur-xl">
            <label htmlFor="email" className="font-bold text-white">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Digite o seu email"
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
            />

            <label htmlFor="password" className="font-bold text-white">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite a sua senha"
              className="w-[30rem] h-12 rounded-md outline-none px-2 bg-gray-950 text-zinc-400 backdrop-blur-3xl"
            />

            <button className="w-[30rem] h-12 rounded-lg cursor-pointer bg-gray-900 text-zinc-400">
              Entrar
            </button>
            <div className="w-full flex justify-center">
              <Link href="/signup" className="text-zinc-400">
                Não possui uma conta? <u>Clique aqui e cadastre-se</u>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
