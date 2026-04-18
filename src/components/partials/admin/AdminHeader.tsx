import { ChevronDown, LogOut, UserRound, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "@/auth/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminHeader() {
  const { logout, user } = useAuth();
  const displayName = user?.name?.trim() || "Admin User";
  const displayEmail = user?.email?.trim() || "admin@gidira.com";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-chat-border-subtle bg-card px-6">
      <div>
        <p className="text-3xl font-semibold leading-9 text-ink">Gidira</p>
        <p className="text-sm text-chat-meta">Admin Dashboard</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-muted"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-ink text-ice">
              <UserRound className="size-4" aria-hidden />
            </span>
            <span className="text-left">
              <span className="block text-sm font-medium text-ink">{displayName}</span>
              <span className="block text-xs text-chat-meta">{displayEmail}</span>
            </span>
            <ChevronDown className="size-4 shrink-0 text-chat-meta" aria-hidden />
            <span className="sr-only">Open account menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/admin/dashboard" className="flex cursor-pointer items-center gap-2">
              <User className="size-4" aria-hidden />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              void logout();
            }}
            className="text-brand-red focus:text-brand-red"
          >
            <LogOut className="size-4" aria-hidden />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
