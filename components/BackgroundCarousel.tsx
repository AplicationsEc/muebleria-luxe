"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "https://raw.githubusercontent.com/felipeAlmEspa/luxeApi/main/assets/fondo-1.jpg",

  "https://raw.githubusercontent.com/felipeAlmEspa/luxeApi/main/assets/fondo-2.jpg",
];

export function BackgroundCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`fondo-${index}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-58" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      {/* opcional: oscurecer fondo */}
    </div>
  );
}
