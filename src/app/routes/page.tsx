// src/app/routes/page.tsx
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockRoutes } from "@/data/mockRoutes"; // Usaremos os dados de mock mais completos
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

const getStatusVariant = (status: 'Planejada' | 'Em Andamento' | 'Concluída'): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'Em Andamento':
            return 'default';
        case 'Planejada':
            return 'secondary';
        case 'Concluída':
            return 'outline';
        default:
            return 'outline';
    }
};

export default function RoutesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Rotas</h1>
        <Button asChild>
            <Link href="/routes/new">Criar Nova Rota</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Rotas</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as rotas cadastradas no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rota</TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Distância</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRoutes.map((route) => (
                <TableRow key={route.id_rota}>
                  <TableCell className="font-medium">
                    {`${route.paradas[0].nome} para ${route.paradas[route.paradas.length - 1].nome}`}
                  </TableCell>
                  <TableCell>{route.motorista}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(route.status)}>{route.status}</Badge>
                  </TableCell>
                  <TableCell>{route.resumo.distancia_total.texto}</TableCell>
                  <TableCell>{route.resumo.duracao_total.texto}</TableCell>
                  <TableCell className="text-right">
                  <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>Visualizar no Mapa</DropdownMenuItem>
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
      </Card>
    </div>
  );
}