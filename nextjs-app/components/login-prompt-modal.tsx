"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { X, LogIn, Shield } from "lucide-react";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  sportName?: string;
}

/**
 * Modernes Login-Popup
 * Zeigt einen ansprechenden Dialog bevor User zum Google-Login weitergeleitet wird
 */
export function LoginPromptModal({ isOpen, onClose, sportName = "Match" }: LoginPromptModalProps) {
  if (!isOpen) return null;

  const handleLogin = () => {
    signIn("google");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header mit Gradient */}
        <div className="bg-gradient-to-r from-primary-navy to-primary-blue text-white px-6 py-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Anmeldung erforderlich</h2>
          <p className="text-white/90 text-sm">
            Um {sportName} beizutreten, melde dich bitte an
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Sichere Anmeldung</p>
                <p className="text-xs text-gray-600 mt-0.5">Mit deinem Google-Account</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Deine Buchungen speichern</p>
                <p className="text-xs text-gray-600 mt-0.5">Verwalte alle deine Match-Teilnahmen</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Schnell & einfach</p>
                <p className="text-xs text-gray-600 mt-0.5">Anmeldung in wenigen Sekunden</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleLogin}
              className="w-full bg-primary-navy hover:bg-primary-blue text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Mit Google anmelden
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full py-6 text-base"
            >
              Abbrechen
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 pt-2">
            Wir speichern nur deinen Namen und E-Mail für die Buchungsverwaltung
          </p>
        </div>
      </div>
    </div>
  );
}
