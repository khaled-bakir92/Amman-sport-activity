"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

/**
 * Auth-Button Komponente
 * Zeigt Login-Button (wenn nicht eingeloggt) oder User-Info mit Logout (wenn eingeloggt)
 */
export function AuthButton() {
  const { data: session, status } = useSession();

  // Ladezustand
  if (status === "loading") {
    return (
      <Button variant="outline" disabled className="text-sm">
        Laden...
      </Button>
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
        Login
      </Button>
    );
  }

  // Eingeloggt: User-Info und Logout-Button
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-8 h-8 rounded-full border-2 border-white/50"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <span className="font-medium text-white">
          {session.user?.name}
        </span>
      </div>
      <Button
        onClick={() => signOut()}
        variant="outline"
        size="sm"
        className="text-sm bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Abmelden
      </Button>
    </div>
  );
}
