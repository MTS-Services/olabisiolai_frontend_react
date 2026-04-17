import { LayoutGrid, Heart, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  to: string;
  icon: typeof LayoutGrid;
  key: "overview" | "favorites" | "messages" | "settings";
};

const sidebarItems: SidebarItem[] = [
  { key: "overview", label: "Overview", to: "/user/dashboard", icon: LayoutGrid },
  { key: "favorites", label: "Favorites", to: "/user/favorites", icon: Heart },
  { key: "messages", label: "Messages", to: "/user/messages", icon: MessageSquare },
  { key: "settings", label: "Settings", to: "/account", icon: Settings },
];

export function UserSidebar({ active }: { active: SidebarItem["key"] }) {
  return (
    <aside className="w-full rounded-2xl bg-surface-soft p-4 lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)] lg:w-64 lg:self-start lg:overflow-y-auto lg:rounded-none">
      <div className="px-2 pb-4 lg:pb-8">
        <h2 className="text-lg font-semibold leading-7 text-ink-heading">Dashboard</h2>
        <p className="text-xs leading-4 text-chat-meta">Manage your account</p>
      </div>

      <nav className="grid grid-cols-2 gap-1 pt-2 sm:grid-cols-4 lg:flex lg:flex-col lg:space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active;

          return (
            <Link
              key={item.key}
              to={item.to}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors lg:justify-start lg:gap-3",
                isActive
                  ? "bg-surface-soft text-chat-accent"
                  : "text-body-secondary hover:bg-muted",
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
