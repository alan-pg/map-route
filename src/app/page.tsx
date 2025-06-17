// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <main className="flex flex-col gap-8 items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Bem-vindo ao Map Route
            </h1>
            <p className="text-lg text-muted-foreground">
              Um projeto moderno construído com Next.js, Leaflet, e estilizado com TailwindCSS & ShadCN/UI.
            </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Ir para o Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/map">
              Ver o Mapa
            </Link>
          </Button>
        </div>
      </main>
      <footer className="absolute bottom-8 text-muted-foreground">
        Desenvolvido com as tecnologias mais modernas.
      </footer>
    </div>
  );
}