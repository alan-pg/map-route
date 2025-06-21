// src/components/TrackableItemsSidebar.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrackableItem, TrackableItemType, Route, GoogleRoute } from "@/types/map";
import {
  Car,
  Smartphone,
  Tag,
  Battery,
  GaugeCircle,
  Clock,
  User,
  Calendar,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Tipos para as props dos sub-componentes ---
interface ItemsTabProps {
  items: TrackableItem[];
  selectedItemId: number | null;
  onItemSelect: (item: TrackableItem) => void;
}

interface RoutesTabProps {
  routes: Route[];
  onRouteSelect: (route: Route) => void;
}

interface MapSidebarProps extends ItemsTabProps, RoutesTabProps {}

// --- Componentes Auxiliares ---
const itemIcons: Record<TrackableItemType, React.ReactNode> = {
  vehicle: <Car className="h-5 w-5" />,
  smartphone: <Smartphone className="h-5 w-5" />,
  tag: <Tag className="h-5 w-5" />,
};

const getStatusVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  const lowerCaseStatus = status.toLowerCase();
  if (lowerCaseStatus.includes("movimento")) return "default";
  if (lowerCaseStatus.includes("parado")) return "secondary";
  if (lowerCaseStatus.includes("bateria fraca")) return "destructive";
  return "outline";
};

// --- Sub-Componente da Aba de Itens ---
function ItemsTab({ items, selectedItemId, onItemSelect }: ItemsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <Input
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemSelect(item)}
              className={cn(
                "flex items-center p-3 rounded-md cursor-pointer transition-colors",
                selectedItemId === item.id
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50"
              )}
            >
              <div className="mr-4 text-muted-foreground">
                {itemIcons[item.type]}
              </div>
              <div className="flex-1">
                <p className="font-semibold leading-none">{item.name}</p>
                <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-1.5 gap-x-3 gap-y-1">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.lastUpdate}
                  </div>
                  {item.speed !== undefined && (
                    <div className="flex items-center">
                      <GaugeCircle className="w-3 h-3 mr-1" />
                      {item.speed} km/h
                    </div>
                  )}
                  {item.battery !== undefined && (
                    <div className="flex items-center">
                      <Battery className="w-3 h-3 mr-1" />
                      {item.battery}%
                    </div>
                  )}
                </div>
              </div>
              <Badge variant={getStatusVariant(item.status)}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

// --- Sub-Componente da Aba de Rotas ---
function RoutesTab({ routes, onRouteSelect }: { routes: GoogleRoute[], onRouteSelect: (route: GoogleRoute) => void }) {
  const handleSelection = (value: string) => {
    if (!value) return;
    const selectedRoute = routes.find((r) => `route-${r.id_rota}` === value);
    if (selectedRoute) {
      onRouteSelect(selectedRoute);
    }
  }

  return (
    <ScrollArea className="h-full">
      <Accordion type="single" collapsible onValueChange={handleSelection} className="w-full p-2">
        {routes.map((route) => (
          <AccordionItem key={route.id_rota} value={`route-${route.id_rota}`}>
            <AccordionTrigger className='p-3 text-left hover:bg-accent/50 rounded-md'>
              <div>
                <p className='font-semibold'>{`${route.paradas[0].nome} para ${route.paradas[route.paradas.length - 1].nome}`}</p>
                <div className='flex items-center text-sm text-muted-foreground mt-1'>
                  <Clock className='w-3 h-3 mr-2' />{route.resumo.duracao_total.texto}
                  <span className='mx-2'>•</span>
                  {route.resumo.distancia_total.texto}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='p-4 border-l-2 border-primary ml-3 text-sm'>
              <div className='space-y-3'>
                <h4 className='font-semibold'>Paradas:</h4>
                <ul className='space-y-2'>
                  {route.paradas.map(parada => (
                    <li key={parada.sequencia} className='flex items-start'>
                      <span className='flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold mr-3 mt-0.5'>{parada.sequencia}</span>
                      {parada.nome}
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}

// --- Componente Principal da Barra Lateral ---
export default function MapSidebar({
  items,
  routes,
  selectedItemId,
  onItemSelect,
  onRouteSelect,
}: MapSidebarProps) {
  return (
    <div className="h-full w-96 border-l bg-background flex flex-col">
      <Tabs defaultValue="items" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 m-2">
          <TabsTrigger value="items">Itens</TabsTrigger>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="flex-1 overflow-y-auto">
          <ItemsTab
            items={items}
            selectedItemId={selectedItemId}
            onItemSelect={onItemSelect}
          />
        </TabsContent>
        <TabsContent value="routes" className="flex-1 overflow-y-auto">
          <RoutesTab routes={routes} onRouteSelect={onRouteSelect} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
