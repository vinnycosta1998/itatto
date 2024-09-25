import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black gap-8">
      <h1 className="text-6xl text-white font-bold neon-text">Erro 404</h1>
      <span className="text-xl text-white">Recurso não encontrado</span>
      <Link href="/dashboard" className="text-blue-100">
        <u>Clique aqui</u>
        {"  "} para voltar à pagina inicial
      </Link>
    </div>
  );
}
