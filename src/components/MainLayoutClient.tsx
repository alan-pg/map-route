// src/components/MainLayoutClient.tsx
'use client';

import { useSidebarStore } from '@/store/sidebarStore';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';

export default function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const [isMounted, setIsMounted] = useState(false);

  // Este efeito garante que o código que depende do estado persistido
  // só execute no cliente, após a montagem do componente.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Evita o erro de hidratação renderizando o layout com o estado padrão no servidor
  // e o estado persistido no cliente.
  const mainMargin = isMounted && !isCollapsed ? 'md:ml-64' : 'ml-16';

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 ${mainMargin}`}>
        {children}
      </main>
    </div>
  );
}