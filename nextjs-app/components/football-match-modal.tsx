"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FootballPitch } from "./football-pitch";
import { PlayerList } from "./player-list";
import { cn } from "@/lib/utils";

interface Player {
  id: number;
  name: string;
  team: 'home' | 'away';
}

interface FootballMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate 22 players (11 home, 11 away)
const initialPlayers: Player[] = [
  // Home team (positions 1-11)
  { id: 1, name: "Player 1", team: 'home' },
  { id: 2, name: "Player 2", team: 'home' },
  { id: 3, name: "Player 3", team: 'home' },
  { id: 4, name: "Player 4", team: 'home' },
  { id: 5, name: "Player 5", team: 'home' },
  { id: 6, name: "Player 6", team: 'home' },
  { id: 7, name: "Player 7", team: 'home' },
  { id: 8, name: "Player 8", team: 'home' },
  { id: 9, name: "Player 9", team: 'home' },
  { id: 10, name: "Player 10", team: 'home' },
  { id: 11, name: "Player 11", team: 'home' },
  // Away team (positions 12-22)
  { id: 12, name: "Player 12", team: 'away' },
  { id: 13, name: "Player 13", team: 'away' },
  { id: 14, name: "Player 14", team: 'away' },
  { id: 15, name: "Player 15", team: 'away' },
  { id: 16, name: "Player 16", team: 'away' },
  { id: 17, name: "Player 17", team: 'away' },
  { id: 18, name: "Player 18", team: 'away' },
  { id: 19, name: "Player 19", team: 'away' },
  { id: 20, name: "Player 20", team: 'away' },
  { id: 21, name: "Player 21", team: 'away' },
  { id: 22, name: "Player 22", team: 'away' },
];

export function FootballMatchModal({ isOpen, onClose }: FootballMatchModalProps) {
  const [bookedPositions, setBookedPositions] = useState<number[]>([]);

  const handleJoinClick = (playerId: number) => {
    if (!bookedPositions.includes(playerId)) {
      setBookedPositions([...bookedPositions, playerId]);
    }
  };

  const handlePositionClick = (positionId: number) => {
    // Remove from booked positions when clicking on pitch
    setBookedPositions(bookedPositions.filter(id => id !== positionId));
  };

  const handleReset = () => {
    setBookedPositions([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={cn(
          "relative w-full max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden",
          "animate-in zoom-in-95 duration-300"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-navy to-primary-blue text-white px-6 py-4 flex items-center justify-between border-b border-white/20">
          <div>
            <h2 className="text-2xl font-bold">Join Football Match</h2>
            <p className="text-sm text-white/80 mt-1">
              Select a player from the list to book their position on the field
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Reset All
            </Button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6 p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          {/* Left: Stadium View */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-navy">
                  Football Stadium
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary-navy"></div>
                    <span className="text-gray-600">Home Team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent-orange"></div>
                    <span className="text-gray-600">Away Team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-white/20 border-2 border-white/40"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
                </div>
              </div>
              <FootballPitch
                bookedPositions={bookedPositions}
                onPositionClick={handlePositionClick}
              />
              <p className="text-sm text-gray-500 mt-3 text-center">
                Click on a booked position to remove it from the field
              </p>
            </div>

            {/* Match Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-primary-navy to-primary-blue text-white p-4 rounded-lg text-center">
                <p className="text-sm opacity-90">Date</p>
                <p className="text-lg font-bold mt-1">Dec 20, 2025</p>
              </div>
              <div className="bg-gradient-to-br from-primary-navy to-primary-blue text-white p-4 rounded-lg text-center">
                <p className="text-sm opacity-90">Time</p>
                <p className="text-lg font-bold mt-1">18:00</p>
              </div>
              <div className="bg-gradient-to-br from-accent-orange to-accent-orange/80 text-white p-4 rounded-lg text-center">
                <p className="text-sm opacity-90">Location</p>
                <p className="text-lg font-bold mt-1">Amman</p>
              </div>
            </div>
          </div>

          {/* Right: Player List */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
            <h3 className="text-lg font-semibold text-primary-navy mb-4">
              Available Players
            </h3>
            <PlayerList
              players={initialPlayers}
              bookedPositions={bookedPositions}
              onJoinClick={handleJoinClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
