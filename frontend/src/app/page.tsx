"use client";

import { useState, useEffect } from "react";

export default function Home() {
	const [backgroundSlide, setBackgroundSlide] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Verifica a posição de scroll e ativa o texto quando passa de 200px
			if (window.scrollY > 200) {
				setBackgroundSlide(true);
			} else {
				setBackgroundSlide(false);
			}
		};

		// Adiciona o listener de scroll
		window.addEventListener("scroll", handleScroll);

		// Remove o listener quando o componente for desmontado
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="w-[100vw] h-[200vh] bg-black flex flex-col justify-start items-center">
			<div className="w-[100vw] h-[100vh] fixed flex flex-col justify-center items-center">
				{/* Vídeo de fundo */}
				<video
					autoPlay={true}
					loop={true}
					muted
					className="w-screen h-screen absolute top-0 left-0 object-cover"
				>
					<source src="/video.mp4" type="video/mp4" />
				</video>

				{/* Texto que aparece no scroll */}
				<div
					className={`h-[100vh] absolute top-1/2 transform -translate-y-1/2 text-center bg-black flex flex-col items-center justify-center transition-all duration-500 ${
						backgroundSlide ? "opacity-100" : "opacity-0"
					}`}
				>
					<h1 className="font-bold text-8xl text-white">
						Tatuador, mostre o seu talento para o mundo!
					</h1>
				</div>
			</div>
		</div>
	);
}
