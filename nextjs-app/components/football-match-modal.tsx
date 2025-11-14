"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FootballPitch } from "./football-pitch";
import { PlayerList } from "./player-list";
import { FootballPitch6vs6 } from "./football-pitch-6vs6";
import { PlayerList6vs6 } from "./player-list-6vs6";
import { MatchCalendar } from "./match-calendar";
import { cn } from "@/lib/utils";

interface Player {
  id: number;
  name: string;
  team: 'home' | 'away';
}

interface Player6vs6 {
  id: number;
  name: string;
  team: 'team1' | 'team2' | 'team3';
}

interface MatchDate {
  date: string;
  time: string;
  location: string;
  availableSpots: number;
  type?: 'regular' | 'girls-only' | '6vs6';
}

interface FootballMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample match schedule for current month
const getMatchSchedule = (): MatchDate[] => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return [
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`,
      time: "18:00",
      location: "Amman Sports Center",
      availableSpots: 22,
      type: 'regular' // Orange - 11vs11
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-18`,
      time: "19:00",
      location: "Al-Hussein Stadium",
      availableSpots: 12,
      type: '6vs6' // Green - 6vs6
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`,
      time: "17:00",
      location: "Women's Sports Complex",
      availableSpots: 22,
      type: 'girls-only' // Red - Girls Only
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-22`,
      time: "17:30",
      location: "Amman Sports Center",
      availableSpots: 22,
      type: 'regular' // Orange - 11vs11
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-25`,
      time: "18:00",
      location: "King Abdullah Stadium",
      availableSpots: 12,
      type: '6vs6' // Green - 6vs6
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-27`,
      time: "16:00",
      location: "Women's Sports Complex",
      availableSpots: 18,
      type: 'girls-only' // Red - Girls Only
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-29`,
      time: "19:00",
      location: "Amman Sports Center",
      availableSpots: 22,
      type: 'regular' // Orange - 11vs11
    },
  ];
};

// Generate 22 players (11 home, 11 away) for 11vs11
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

// Generate 18 players (6 per team) for 6vs6
const initialPlayers6vs6: Player6vs6[] = [
  // Team 1 (positions 1-6)
  { id: 1, name: "Player 1", team: 'team1' },
  { id: 2, name: "Player 2", team: 'team1' },
  { id: 3, name: "Player 3", team: 'team1' },
  { id: 4, name: "Player 4", team: 'team1' },
  { id: 5, name: "Player 5", team: 'team1' },
  { id: 6, name: "Player 6", team: 'team1' },
  // Team 2 (positions 7-12)
  { id: 7, name: "Player 7", team: 'team2' },
  { id: 8, name: "Player 8", team: 'team2' },
  { id: 9, name: "Player 9", team: 'team2' },
  { id: 10, name: "Player 10", team: 'team2' },
  { id: 11, name: "Player 11", team: 'team2' },
  { id: 12, name: "Player 12", team: 'team2' },
  // Team 3 (positions 13-18)
  { id: 13, name: "Player 13", team: 'team3' },
  { id: 14, name: "Player 14", team: 'team3' },
  { id: 15, name: "Player 15", team: 'team3' },
  { id: 16, name: "Player 16", team: 'team3' },
  { id: 17, name: "Player 17", team: 'team3' },
  { id: 18, name: "Player 18", team: 'team3' },
];

export function FootballMatchModal({ isOpen, onClose }: FootballMatchModalProps) {
  const [bookedPositions, setBookedPositions] = useState<number[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchDate | null>(null);
  const matches = getMatchSchedule();

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

  const handleDateSelect = (match: MatchDate) => {
    setSelectedMatch(match);
    setBookedPositions([]); // Reset bookings when selecting new date
  };

  const handleBackToCalendar = () => {
    setSelectedMatch(null);
    setBookedPositions([]);
  };

  const handleClose = () => {
    setSelectedMatch(null);
    setBookedPositions([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={cn(
          "relative w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden",
          "animate-in zoom-in-95 duration-300",
          selectedMatch ? "max-w-7xl" : "max-w-5xl"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-navy to-primary-blue text-white px-6 py-4 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-4">
            {selectedMatch && (
              <button
                onClick={handleBackToCalendar}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Back to calendar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold">
                {selectedMatch ? "Join Football Match" : "Football Matches"}
              </h2>
              <p className="text-sm text-white/80 mt-1">
                {selectedMatch
                  ? "Wähle deine Position auf dem Spielfeld"
                  : "Wähle ein Match-Datum aus dem Kalender"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {selectedMatch && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Reset All
              </Button>
            )}
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          {!selectedMatch ? (
            /* Calendar View */
            <div className="flex items-center justify-center py-2">
              <MatchCalendar matches={matches} onDateSelect={handleDateSelect} />
            </div>
          ) : selectedMatch.type === '6vs6' ? (
            /* 6vs6 Stadium & Player List View */
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
              {/* Left: Stadium View */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-600">
                      6vs6 Football Pitch
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-primary-navy"></div>
                        <span className="text-gray-600">Team 1</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-accent-orange"></div>
                        <span className="text-gray-600">Team 2</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-green-600"></div>
                        <span className="text-gray-600">Team 3</span>
                      </div>
                    </div>
                  </div>
                  <FootballPitch6vs6
                    bookedPositions={bookedPositions}
                    onPositionClick={handlePositionClick}
                  />
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Klicke auf eine gebuchte Position, um sie zu entfernen
                  </p>
                </div>

                {/* Match Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-4 rounded-lg text-center">
                    <p className="text-sm opacity-90">Datum</p>
                    <p className="text-lg font-bold mt-1">
                      {new Date(selectedMatch.date).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-4 rounded-lg text-center">
                    <p className="text-sm opacity-90">Zeit</p>
                    <p className="text-lg font-bold mt-1">{selectedMatch.time}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-4 rounded-lg text-center">
                    <p className="text-sm opacity-90">Ort</p>
                    <p className="text-lg font-bold mt-1">{selectedMatch.location}</p>
                  </div>
                </div>
              </div>

              {/* Right: Player List */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <h3 className="text-lg font-semibold text-green-600 mb-4">
                  Verfügbare Spieler (6vs6)
                </h3>
                <PlayerList6vs6
                  players={initialPlayers6vs6}
                  bookedPositions={bookedPositions}
                  onJoinClick={handleJoinClick}
                />
              </div>
            </div>
          ) : (
            /* 11vs11 Stadium & Player List View */
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
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
                    Klicke auf eine gebuchte Position, um sie zu entfernen
                  </p>
                </div>

                {/* Match Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-primary-navy to-primary-blue text-white p-4 rounded-lg text-center">
                    <p className="text-sm opacity-90">Datum</p>
                    <p className="text-lg font-bold mt-1">
                      {new Date(selectedMatch.date).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-navy to-primary-blue text-white p-4 rounded-lg text-center">
                    <p className="text-sm opacity-90">Zeit</p>
                    <p className="text-lg font-bold mt-1">{selectedMatch.time}</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent-orange to-accent-orange/80 text-white p-4 rounded-lg text-center">
                    <p className="text-sm opacity-90">Ort</p>
                    <p className="text-lg font-bold mt-1">{selectedMatch.location}</p>
                  </div>
                </div>
              </div>

              {/* Right: Player List */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <h3 className="text-lg font-semibold text-primary-navy mb-4">
                  Verfügbare Spieler
                </h3>
                <PlayerList
                  players={initialPlayers}
                  bookedPositions={bookedPositions}
                  onJoinClick={handleJoinClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
