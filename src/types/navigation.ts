// src/types/navigation.ts

export interface SidebarItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface NavigationState {
  currentPath: string;
  isLoading: boolean;
  previousPath?: string;
}