// src/components/CreateRouteForm.tsx
'use client';

import { useCreateRouteStore } from '@/store/createRouteStore';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, Trash2Icon, Clock, Route as RouteIcon, Loader2, CalendarClock } from "lucide-react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableStop } from "./SortableStop";

export function CreateRouteForm() {
    const { 
        name, driver, departureTime, details, waypoints, polyline,
        setFormField, addWaypoint, reorderWaypoints, calculateRoute,
        routeSummary, isCalculatingRoute
    } = useCreateRouteStore();
    
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = waypoints.findIndex((item) => item.id === active.id);
            const newIndex = waypoints.findIndex((item) => item.id === over.id);
            reorderWaypoints(oldIndex, newIndex);
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        calculateRoute();
    }
    
    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col h-full bg-background">
            {/* CABEÇALHO (FIXO) */}
            <div className="p-6 border-b">
                <header>
                    <h2 className="text-xl font-bold">Criar Nova Rota</h2>
                    <p className="text-sm text-muted-foreground">Preencha os detalhes e arraste os pontos para reordenar.</p>
                </header>
            </div>
            
            {/* ÁREA DE CONTEÚDO (COM ROLAGEM) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                    <div> <Label htmlFor="name">Nome da Rota</Label> <Input id="name" value={name} onChange={e => setFormField('name', e.target.value)} placeholder="Ex: Entregas de Sábado" /> </div>
                    <div> <Label htmlFor="driver">Motorista</Label> <Input id="driver" value={driver} onChange={e => setFormField('driver', e.target.value)} placeholder="Nome do motorista" /> </div>
                    <div> <Label htmlFor="departureTime">Data e Hora de Partida</Label> <Input id="departureTime" value={departureTime} type="datetime-local" onChange={e => setFormField('departureTime', e.target.value)} /> </div>
                </div>
                <Separator />
                
                <div className="space-y-2">
                    <Label>Pontos da Rota</Label>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={waypoints.map(w => w.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-1">
                                {waypoints.map((waypoint, index) => (
                                    <SortableStop key={waypoint.id} id={waypoint.id} index={index} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                <Button type="button" variant="outline" className="w-full" onClick={addWaypoint}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Adicionar Parada
                </Button>
                
                <Separator />
                <div>
                    <Label htmlFor="details">Detalhes Adicionais</Label>
                    <Textarea id="details" value={details} onChange={e => setFormField('details', e.target.value)} placeholder="Informações extras sobre a rota ou carga..." />
                </div>
                
                {(isCalculatingRoute || routeSummary) && <Separator />}
                
                {isCalculatingRoute && (
                    <div className='flex items-center justify-center text-muted-foreground p-4'>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Calculando a melhor rota...
                    </div>
                )}
                
                {routeSummary && !isCalculatingRoute && (
                    <div className='space-y-3'>
                        <h3 className='font-medium'>Resumo da Rota</h3>
                        <div className='grid grid-cols-3 gap-2 bg-muted rounded-lg p-3 text-center'>
                            <div className='flex flex-col items-center gap-1'> <Clock className='h-5 w-5 text-muted-foreground' /> <span className='font-bold text-lg'>{routeSummary.duration}</span> <span className='text-xs text-muted-foreground'>Duração</span> </div>
                            <div className='flex flex-col items-center gap-1'> <RouteIcon className='h-5 w-5 text-muted-foreground' /> <span className='font-bold text-lg'>{routeSummary.distance}</span> <span className='text-xs text-muted-foreground'>Distância</span> </div>
                            <div className='flex flex-col items-center gap-1'> <CalendarClock className='h-5 w-5 text-muted-foreground' /> <span className='font-bold text-lg'>{routeSummary.arrivalTime}</span> <span className='text-xs text-muted-foreground'>Chegada</span> </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RODAPÉ (FIXO) - A classe 'mt-auto' foi removida */}
            <div className="p-6 bg-muted/50 border-t">
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="ghost">Cancelar</Button>
                    <Button type="submit" disabled={isCalculatingRoute || waypoints.filter(w => w.lat).length < 2}>
                        {isCalculatingRoute && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                        {polyline.length > 0 ? "Recalcular Rota" : "Salvar Rota"}
                    </Button>
                </div>
            </div>
        </form>
    );
}