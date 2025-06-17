// src/app/dashboard/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewRouteForm } from "@/components/NewRouteForm"; // Supondo que você criou o arquivo acima

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const recentRoutes = [
  {
    id: 1,
    origin: "Cristo Redentor",
    destination: "Pão de Açúcar",
    status: "Concluída",
  },
  {
    id: 2,
    origin: "Copacabana",
    destination: "Ipanema",
    status: "Em Andamento",
  },
  { id: 3, origin: "Maracanã", destination: "Lapa", status: "Planejada" },
  {
    id: 4,
    origin: "Jardim Botânico",
    destination: "Museu do Amanhã",
    status: "Concluída",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de Rotas</CardTitle>
            <CardDescription>
              Número total de rotas cadastradas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rotas Ativas</CardTitle>
            <CardDescription>Rotas em andamento no momento.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distância Total</CardTitle>
            <CardDescription>
              Soma da distância de todas as rotas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">147 km</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Rotas Recentes</CardTitle>
              <CardDescription>
                Visualização das últimas rotas adicionadas.
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Adicionar Rota</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nova Rota</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar uma nova rota.
                  </DialogDescription>
                </DialogHeader>
                <NewRouteForm />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Origem</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRoutes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">
                      {route.origin}
                    </TableCell>
                    <TableCell>{route.destination}</TableCell>
                    <TableCell>{route.status}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>Visualizar</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Ver Todas as Rotas</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
