"use client";

import { Modal } from "@/components/Modal";
import { ProfileCard } from "@/components/ProfileCard";
import { User } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileCardIsOpen, setProfileCardIsOpen] = useState(false);

  function handleOpenOrCloseModal(modalIsOpen: boolean) {
    setModalIsOpen(!modalIsOpen);
  }

  function handleOpenProfileCard(profileCardIsOpen: boolean) {
    setProfileCardIsOpen(!profileCardIsOpen);
  }

  return (
    <div className="w-screen h-screen bg-black">
      <div className="w-full h-full absolute">
        {modalIsOpen ? <Modal modalIsOpen={modalIsOpen} /> : null}
        <header className="flex justify-between p-16">
          <h1 className="text-2xl text-white">
            Seja bem vindo <strong>Vinicius</strong>
          </h1>
          <div className="w-[12rem] flex justify-between">
            <button
              className="w-[8rem] h-10 border-[1px] border-zinc-400 cursor-pointer rounded-md flex items-center justify-center text-zinc-300"
              onClick={() => handleOpenOrCloseModal(modalIsOpen)}
            >
              Novo registro
            </button>
            {profileCardIsOpen ? <ProfileCard /> : null}
            <button
              className="w-10 h-10  rounded-full border-[1px] border-zinc-400 flex justify-center items-center"
              onClick={() => handleOpenProfileCard(profileCardIsOpen)}
            >
              <User size={30} color="#fff" />
            </button>
          </div>
        </header>
        <main></main>
      </div>
    </div>
  );
}
