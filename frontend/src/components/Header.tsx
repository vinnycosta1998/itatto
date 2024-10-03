import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { Divide, User } from "lucide-react";
import { Modal } from "./Modal";
import Typewriter from "typewriter-effect";

interface HeaderProps {
  name: string;
  slug: string;
}

export function Header({ name, slug }: HeaderProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileCardIsOpen, setProfileCardIsOpen] = useState(false);

  function handleOpenProfileCard(profileCardIsOpen: boolean) {
    setProfileCardIsOpen(!profileCardIsOpen);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  return (
    <header className={`w-full flex justify-between p-16`}>
      <h1 className="text-2xl text-white flex gap-2">
        Seja bem vindo
        <strong className="neon-text">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(`${name}`)
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
          />
        </strong>
      </h1>

      <div className="w-[12rem] flex justify-between">
        <button
          className="w-[8rem] h-10 border-[1px] border-zinc-500 cursor-pointer rounded-md flex items-center justify-center text-zinc-500 hover:border-green-400"
          onClick={() => setModalIsOpen(true)}
        >
          Novo registro
        </button>
        {modalIsOpen ? (
          <Modal
            modalIsOpen={modalIsOpen}
            handleCloseModal={handleCloseModal}
            slug={slug}
          />
        ) : null}
        {profileCardIsOpen ? <ProfileCard slug={slug} /> : null}
        <button
          className="w-10 h-10 rounded-full border-[1px] border-zinc-400 flex justify-center items-center"
          onClick={() => handleOpenProfileCard(profileCardIsOpen)}
        >
          <User size={30} color="#fff" />
        </button>
      </div>
    </header>
  );
}
