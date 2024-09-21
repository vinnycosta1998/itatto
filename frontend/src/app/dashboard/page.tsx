"use client";

import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { ProfileCard } from "@/components/ProfileCard";

export default function Dashboard() {
  return (
    <div className="w-screen h-screen bg-black">
      <div className="w-full h-full absolute">
        <Header />
        <main></main>
      </div>
    </div>
  );
}
