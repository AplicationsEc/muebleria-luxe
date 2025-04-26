"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { first, isNil } from "lodash";

interface ModalFinalizarCompraProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (datos: {
    nombre: string;
    email?: string;
    telefono?: string;
  }) => void;
  total: number;
}

export function ModalFinalizarCompra({
  isOpen,
  onClose,
  onConfirm,
  total,
}: ModalFinalizarCompraProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre) {
      toast.error("El nombre es requerido");
      return;
    }
    if (email.length === 0 && telefono.length === 0) {
      console.log("entro a isNil");
      toast.error(
        "Debe proporcionar al menos un correo electrónico o teléfono"
      );
      return;
    }

    onConfirm({
      nombre,
      email: email || undefined,
      telefono: telefono || undefined,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
          <small className="text-[10px] text-gray-500">
            Necesitamos tus datos para poder enviar tu compra e información del
            estado de tu compra.
          </small>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo *</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ingrese su teléfono"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center font-medium">
              <span>Total a pagar:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar compra</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
