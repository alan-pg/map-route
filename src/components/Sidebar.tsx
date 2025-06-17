// src/components/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Map,
  TestTube,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import type { SidebarItem } from '@/types/navigation';
import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/store/sidebarStore'; // 1. Importar a store

const sidebarItems: SidebarItem[] = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/map', icon: Map, label: 'Mapa' },
  { href: '/test', icon: TestTube, label: 'Teste' }
];

export default function Sidebar() {
  // 2. Substituir o useState pela store do Zustand
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3. A função toggleSidebar já vem da store, então não precisa ser definida aqui.

  return (
    <div className={`
      fixed left-0 top-0 h-full bg-background border-r
      transition-all duration-300 ease-in-out z-40
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-foreground">
            Map Route
          </h2>
        )}
        {!isMobile && (
          <Button
            onClick={toggleSidebar} // 4. O onClick agora chama a função da store
            variant="ghost"
            size="icon"
            className="rounded-lg"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Button
                  asChild
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-3"
                  title={isCollapsed ? item.label : undefined}
                  disabled={item.disabled}
                >
                  <Link href={item.href}>
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}