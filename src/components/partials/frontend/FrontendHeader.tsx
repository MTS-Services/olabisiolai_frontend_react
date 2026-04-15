import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  CircleUserRound,
  Home,
  LogIn,
  LogOut,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const LOGO_HEADER = "/images/landing/gidira-logo-header.svg";

function HeaderToolbar({
  isLightHeader,
  showTradeNav,
}: {
  isLightHeader: boolean;
  showTradeNav: boolean;
}) {
  const { isAuthenticated, logout } = useAuth();

  const regionTrigger = cn(
    "gap-1.5 rounded-lg border-0 bg-transparent font-medium text-ink-heading",
    "hover:bg-muted",
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" className={regionTrigger}>
            Nigeria
            <ChevronDown className="size-4 opacity-70" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Region</DropdownMenuLabel>
            <DropdownMenuItem>Nigeria</DropdownMenuItem>
            <DropdownMenuItem disabled>More regions soon</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {showTradeNav ? (
        <Button
          asChild
          type="button"
          variant="secondary"
          className="h-11 rounded-lg bg-brand-red px-6 text-base font-medium text-ice shadow-none hover:bg-brand-red/90"
        >
          <Link to="/trade" className="inline-flex items-center gap-2">
            <TrendingUp className="size-5 shrink-0" aria-hidden />
            Trade
          </Link>
        </Button>
      ) : null}

      {isAuthenticated ? (
        <Button
          type="button"
          variant={isLightHeader ? "outline" : "default"}
          className={cn(
            "rounded-lg px-5 font-medium",
            isLightHeader && "border-border-gray bg-white text-ink-heading hover:bg-muted",
          )}
          onClick={() => {
            void logout();
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          asChild
          type="button"
          variant="outline"
          className={cn(
            "h-11 rounded-lg border-border-gray bg-white px-5 text-base font-medium text-ink-heading shadow-none",
            "hover:border-brand hover:bg-brand hover:text-ice",
          )}
        >
          <Link to="/user-type">Login / Sign Up</Link>
        </Button>
      )}
    </div>
  );
}

function MobileMenu({
  showTradeNav,
  isAuthenticated,
  logout,
}: {
  showTradeNav: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-10 w-10 rounded-xl bg-brand-red p-0 text-ice shadow-md hover:bg-brand-red/90 hover:text-ice"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <CircleUserRound className="size-5" aria-hidden />
          )}
        </Button>
      </DropdownMenuTrigger>
      {open ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <DropdownMenuContent
        align="end"
        collisionPadding={8}
        sideOffset={10}
        className="z-50 w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] rounded-2xl border-border-light p-3 shadow-xl md:hidden mr-1"
      >
        <div className="mb-1 flex items-center px-2 py-1">
          <DropdownMenuLabel className="p-0 text-sm font-semibold text-ink-heading">
            Quick Menu
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="rounded-lg">
            <Link to="/" className="flex items-center gap-2 py-2">
              <Home className="size-4" aria-hidden />
              Home
            </Link>
          </DropdownMenuItem>
          {showTradeNav ? (
            <DropdownMenuItem asChild className="rounded-lg">
              <Link to="/trade" className="flex items-center gap-2 py-2">
                <TrendingUp className="size-4" aria-hidden />
                Trade
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem asChild className="rounded-lg">
            <Link to="/filters" className="flex items-center gap-2 py-2">
              <Search className="size-4" aria-hidden />
              Browse Businesses
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {isAuthenticated ? (
          <DropdownMenuItem
            onSelect={() => {
              void logout();
            }}
            className="rounded-lg text-brand-red focus:text-brand-red"
          >
            <LogOut className="size-4" aria-hidden />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild className="rounded-lg">
            <Link to="/user-type" className="flex items-center gap-2 py-2">
              <LogIn className="size-4" aria-hidden />
              Login / Sign Up
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FrontendHeader() {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isLightHeader =
    pathname === "/" ||
    pathname === "/trade" ||
    pathname === "/service" ||
    pathname === "/messages" ||
    pathname === "/reviews";
  const showTradeNav = pathname !== "/trade";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b",
        isLightHeader
          ? "border-border-light bg-white text-foreground shadow-[0_1px_0_0_rgb(0_0_0_/0.04)]"
          : "border-border bg-background/90 text-foreground backdrop-blur-md",
      )}
    >
      <div className={cn(container, "flex flex-col gap-3 py-3 md:hidden")}>
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="inline-flex shrink-0 items-center">
            <img
              src={LOGO_HEADER}
              alt="Gidira"
              width={155}
              height={48}
              decoding="async"
              className="block h-8 w-auto"
            />
          </Link>
          <MobileMenu
            showTradeNav={showTradeNav}
            isAuthenticated={isAuthenticated}
            logout={logout}
          />
        </div>
        {/* <HeaderSearch /> */}
      </div>

      <div
        className={cn(
          container,
          "hidden py-3 md:flex md:items-center md:gap-4 lg:gap-6 lg:py-4",
        )}
      >
        <Link to="/" className="inline-flex shrink-0 items-center">
          <img
            src={LOGO_HEADER}
            alt="Gidira"
            width={155}
            height={48}
            decoding="async"
            className="block h-9 w-auto lg:h-10"
          />
        </Link>

        <div className="flex min-w-0 flex-1 justify-center px-2">
          {/* <HeaderSearch className="max-w-xl lg:max-w-2xl" /> */}
        </div>

        <HeaderToolbar isLightHeader={isLightHeader} showTradeNav={showTradeNav} />
      </div>
    </header>
  );
}
