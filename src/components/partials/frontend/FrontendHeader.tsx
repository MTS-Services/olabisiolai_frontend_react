import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Search, TrendingUp, User, X } from "lucide-react";

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
  isMobile = false,
}: {
  isLightHeader: boolean;
  showTrendNav: boolean;
  isMobile?: boolean;
}) {
  const { isAuthenticated, logout } = useAuth();

  const regionTrigger = cn(
    "gap-1.5 rounded-lg border-0 bg-transparent font-medium text-ink-heading",
    "hover:bg-muted",
    isMobile && "w-full justify-between px-4 h-12 bg-bg-section"
  );

  const toolbarClasses = cn(
    "flex items-center gap-2 sm:gap-3",
    isMobile ? "flex-col items-stretch w-full" : "justify-end"
  );

  return (
    <div className={toolbarClasses}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" className={regionTrigger}>
            <span className="flex items-center gap-2">Nigeria</span>
            <ChevronDown className="size-4 opacity-70" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMobile ? "center" : "end"} className="min-w-48">
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
          className={cn(
            "h-11 rounded-lg bg-destructive px-6 text-base font-medium text-ice shadow-none hover:bg-brand/90",
            isMobile && "w-full"
          )}
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
            "rounded-lg px-5 font-medium h-11",
            isLightHeader && "border-border-gray bg-white text-ink-heading hover:bg-muted",
            isMobile && "w-full"
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
            "h-full rounded-lg border-border-gray bg-white px-5 text-base font-medium text-ink-heading shadow-none",
            "hover:border-brand bg-brand hover:text-ice",
            isMobile && "w-full"
          )}
        >
          <Link to="/login" className="inline-flex items-center gap-2">
            <svg
              className="w-24 h-24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#ffffff"/>
              <circle cx="12" cy="12" r="8.25" fill="none" stroke="#A5D6A7" strokeWidth="0.75"/>
              <circle cx="12" cy="9.375" r="2.25" fill="#A5D6A7" />
              <path
                d="M7.5 16.125c0-2.4375 1.875-4.125 4.5-4.125s4.5 1.6875 4.5 4.125 Z"
                fill="#A5D6b3 "
              />
            </svg>
          </Link>
          
        </Button>
      )}
    </div>
  );
}

export function FrontendHeader() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLightHeader =
    pathname === "/" ||
    pathname === "/trade" ||
    pathname === "/service" ||
    pathname === "/messages" ||
    pathname === "/reviews";
  const showTrendNav = pathname !== "/trade";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        isLightHeader
          ? "border-border-light bg-white text-foreground shadow-[0_1px_0_0_rgb(0_0_0_/0.04)]"
          : "border-border bg-background/90 text-foreground backdrop-blur-md",
      )}
    >
      {/* Mobile Navigation Layout */}
      <div className={cn(container, "flex flex-col gap-3 py-3 md:hidden")}>
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex shrink-0 items-center">
            <img
              src={LOGO_HEADER}
              alt="Gidira"
              width={130}
              height={40}
              className="h-7 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-2">
             <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="size-6" /> : <User className="size-6" />}
             </Button>
          </div>
        </div>

        {/* Search stays prominent on mobile */}
        {/* <HeaderSearch /> */}

        {/* Expandable Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-4 pb-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-200 fixed top-16 left-0 right-0 bg-white shadow-lg z-50">
             <div className="h-px bg-border-light w-full " />
             <HeaderToolbar 
                isLightHeader={isLightHeader} 
                showTrendNav={showTrendNav} 
                isMobile={true} 
             />
          </div>
        )}
      </div>

      {/* Desktop Navigation Layout */}
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
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        <div className=" flex min-w-0 flex-1 justify-center px-2">
          {/* <HeaderSearch className="max-w-xl lg:max-w-2xl" /> */}
        </div>

        <HeaderToolbar isLightHeader={isLightHeader} showTrendNav={showTrendNav} />
      </div>
    </header>
  );
}