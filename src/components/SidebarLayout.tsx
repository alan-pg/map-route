// src/components/SidebarLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Em mobile, colapsar sidebar por padrão
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main 
        className={`
          flex-1 transition-all duration-300
          ${isMobile ? 'ml-16' : 'ml-64'}
        `}
      >
        {children}
      </main>
    </div>
  );
}