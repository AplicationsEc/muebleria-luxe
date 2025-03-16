"use client";

import { useEffect } from "react";
import Lottie from "lottie-react";
import chargin from "@/public/assets/animations/chargin.json";

export default function LoadingInicial() {
  useEffect(() => {
    // Mostrar el contenido después de 3 segundos
    const timer = setTimeout(() => {}, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
      <strong className="text-6xl text-gray-400">PRIME APP</strong>
      <strong className="text-gray-500 text-4xl">Bienvienido</strong>
      <Lottie animationData={chargin} style={{ width: 150, height: 150 }} />
      <label className="roboto.className text-gray-500 text-md">
        Cargando nueva experiencia de usuario
      </label>
    </div>
  );
}
