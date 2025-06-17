// src/components/NewRouteForm.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewRouteForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Nova Rota:", data);
    // Aqui você adicionaria a lógica para salvar a rota
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="origin" className="text-right">
          Origem
        </Label>
        <Input id="origin" name="origin" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="destination" className="text-right">
          Destino
        </Label>
        <Input id="destination" name="destination" className="col-span-3" />
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit">Salvar Rota</Button>
      </div>
    </form>
  );
}