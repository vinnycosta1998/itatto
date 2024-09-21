export default function Profile() {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-[30rem] h-[30rem] rounded-lg">
        <form className="w-full h-full flex flex-col items-center gap-4">
          <h1 className="text-4xl neon-text">Altere os seus dados </h1>
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Nome</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="Vinicius Costa de Almeida"
            readOnly
          />
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Email</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="viniciuscostadealmeida98@gmail.com"
            readOnly
          />
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Senhas</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="Digite a sua senha"
          />
          <div className="w-[26rem] flex justify-start">
            <label className="font-bold text-white">Confirme a senha</label>
          </div>
          <input
            type="text"
            className="w-[26rem] h-12 bg-zinc-900 px-2 rounded-md outline-none"
            placeholder="Confirme a sua senha"
          />
          <button className="w-[26rem] h-12 bg-zinc-900 font-bold text-white rounded-md">
            Alterar dados
          </button>
        </form>
      </div>
    </div>
  );
}
