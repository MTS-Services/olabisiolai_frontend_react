import { Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FrontendHeader() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="">
          <Link to="/" className="font-semibold tracking-tight">
            {/* React + Vite + Laravel */}
            <img
              src="src/assets/Gidira_Logo_final_2.png"
              alt="Logo"
              className="w-full h-auto"
            />
          </Link>
        </div>

        <div className="">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex items-center gap-2">
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-none bg-transparent"
                >
                  Nigeria
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="">
            <Button
              type="button"
              variant="secondary"
              className="bg-primary text-primary-foreground hover:bg-primary"
            >
              Trade
            </Button>
          </div>
          <div className="">
            {isAuthenticated ? (
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  void logout();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button asChild type="button">
                <Link
                  to="/login"
                  className="font-inter bg-white text-text-primary! border border-text-primary hover:bg-primary hover:text-text-tertiary hover:border-primary"
                >
                  Login / Sign Up
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
