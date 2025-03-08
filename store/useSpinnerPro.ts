import { create } from "zustand";

export type IProcesandoSpiner = {
  procesando: boolean;
  iniciar: (estado: boolean) => void;
};

export const useSpinnerPro = create<IProcesandoSpiner>((set) => ({
  procesando: false,
  iniciar: (estado: boolean) => set({ procesando: estado }),
}));
