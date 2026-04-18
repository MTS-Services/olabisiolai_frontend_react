import { LayoutGrid, Heart, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

export type UserSidebarActiveKey = "overview" | "favorites" | "messages" | "settings";

type SidebarItem = {
  label: string;
  to: string;
  icon: typeof LayoutGrid;
  key: UserSidebarActiveKey;
};

const sidebarItems: SidebarItem[] = [
  { key: "overview", label: "Overview", to: "/user/dashboard", icon: LayoutGrid },
  { key: "favorites", label: "Favorites", to: "/user/favorites", icon: Heart },
  { key: "messages", label: "Messages", to: "/user/messages", icon: MessageSquare },
  { key: "settings", label: "Settings", to: "/user/settings", icon: Settings },
];

type UserSidebarProps = {
  active: UserSidebarActiveKey;
  mobileOpen?: boolean;
  onNavigate?: () => void;
};

export function UserSidebar({ active, mobileOpen = false, onNavigate }: UserSidebarProps) {
  return (
    <aside
      id="user-sidebar-nav"
      className={cn(
        "flex w-[min(18rem,calc(100vw-2.5rem))] flex-col bg-surface-soft p-3 sm:w-64 sm:p-4",
        "fixed left-3 top-[4.5rem] z-50 max-h-[calc(100dvh-5.5rem)] -translate-x-[120%] overflow-y-auto rounded-2xl shadow-lg transition-transform duration-200 ease-out sm:left-4 sm:top-24 lg:top-20",
        "lg:sticky lg:z-auto lg:max-h-[calc(100dvh-7rem)] lg:w-64 lg:translate-x-0 lg:self-start lg:rounded-none lg:shadow-none",
        mobileOpen && "translate-x-0",
      )}
    >
      <div className="px-1 pb-3 sm:px-2 sm:pb-4 lg:pb-8">
        <h2 className="text-base font-semibold leading-7 text-ink-heading sm:text-lg">Dashboard</h2>
        <p className="text-xs leading-4 text-chat-meta">Manage your account</p>
      </div>

      <nav className="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-2 lg:flex lg:flex-col lg:space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active;

          return (
            <Link
              key={item.key}
              to={item.to}
              onClick={() => onNavigate?.()}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:justify-center lg:justify-start lg:gap-3",
                isActive
                  ? "bg-card text-chat-accent shadow-sm lg:bg-surface-soft"
                  : "text-body-secondary hover:bg-muted",
              )}
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.8} aria-hidden />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
