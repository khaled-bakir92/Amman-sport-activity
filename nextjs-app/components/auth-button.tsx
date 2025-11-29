"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User } from "lucide-react";

/**
 * Auth-Button Komponente
 * Zeigt Login-Button (wenn nicht eingeloggt) oder Profilbild mit Dropdown (wenn eingeloggt)
 */
export function AuthButton() {
  const { data: session, status } = useSession();

  // Ladezustand
  if (status === "loading") {
    return (
      <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
    );
  }

  // Nicht eingeloggt: Login-Button anzeigen
  if (!session) {
    return (
      <Button
        onClick={() => signIn("google")}
        variant="default"
        className="bg-primary-navy hover:bg-primary-blue text-white text-sm"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Anmelden
      </Button>
    );
  }

  // Eingeloggt: Profilbild mit Dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none focus:ring-2 focus:ring-accent-orange rounded-full transition-transform hover:scale-105">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-10 h-10 rounded-full border-2 border-white/50 cursor-pointer"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer">
              <User className="w-6 h-6 text-white" />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Abmelden
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
