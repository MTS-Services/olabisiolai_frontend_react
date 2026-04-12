import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, TrendingUp } from "lucide-react";

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

const LOGO_HEADER = "/images/landing/gidira-logo-header.svg";

/** Figma-style light nav: soft search field on white. */
function HeaderSearch({ className }: { className?: string }) {
  return (
    <InputGroup
      className={cn(
        "h-11 w-full rounded-lg border border-border-light bg-bg-section shadow-sm transition-[box-shadow,border-color]",
        "focus-within:border-brand/35 focus-within:ring-2 focus-within:ring-brand/15",
        className,
      )}
    >
      <InputGroupInput
        placeholder="Search for businesses, services, or location…"
        className="text-base text-foreground placeholder:text-placeholder-text md:text-sm"
      />
      <InputGroupAddon align="inline-end" className="text-placeholder-text">
        <Search className="size-5 shrink-0" aria-hidden />
      </InputGroupAddon>
    </InputGroup>
  );
}

function HeaderToolbar({
  isLightHeader,
  showTrendNav,
}: {
  isLightHeader: boolean;
  showTrendNav: boolean;
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

      {showTrendNav ? (
        <Button
          asChild
          type="button"
          variant="secondary"
          className="h-11 rounded-lg bg-brand px-6 text-base font-medium text-ice shadow-none hover:bg-brand/90"
        >
          <Link to="/trend" className="inline-flex items-center gap-2">
            <TrendingUp className="size-5 shrink-0" aria-hidden />
            Trend
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
          <Link to="/login">Login / Sign Up</Link>
        </Button>
      )}
    </div>
  );
}

export function FrontendHeader() {
  const { pathname } = useLocation();
  const isLightHeader =
    pathname === "/" ||
    pathname === "/trend" ||
    pathname === "/service" ||
    pathname === "/messages";
  const showTrendNav = pathname !== "/trend";

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
          <HeaderToolbar isLightHeader={isLightHeader} showTrendNav={showTrendNav} />
        </div>
        <HeaderSearch />
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
          <HeaderSearch className="max-w-xl lg:max-w-2xl" />
        </div>

        <HeaderToolbar isLightHeader={isLightHeader} showTrendNav={showTrendNav} />
      </div>
    </header>
  );
}
