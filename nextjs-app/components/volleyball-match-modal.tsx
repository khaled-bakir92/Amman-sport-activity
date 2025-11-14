"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VolleyballCourt } from "./volleyball-court";
import { VolleyballPlayerList } from "./volleyball-player-list";
import { MatchCalendar } from "./match-calendar";
import { cn } from "@/lib/utils";

interface Player {
  id: number;
  name: string;
  team: 'left' | 'right' | 'substitute';
}

interface MatchDate {
  date: string;
  time: string;
  location: string;
  availableSpots: number;
  type?: 'regular' | 'girls-only' | '6vs6';
}

interface VolleyballMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample match schedule for volleyball
const getMatchSchedule = (): MatchDate[] => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return [
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-16`,
      time: "17:00",
      location: "Amman Sports Center",
      availableSpots: 18,
      type: 'regular'
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-19`,
      time: "18:30",
      location: "Al-Hussein Indoor Hall",
      availableSpots: 18,
      type: 'regular'
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-21`,
      time: "16:00",
      location: "Women's Sports Complex",
      availableSpots: 18,
      type: 'girls-only'
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-23`,
      time: "19:00",
      location: "Beach Volleyball Court",
      availableSpots: 18,
      type: 'regular'
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-26`,
      time: "17:30",
      location: "King Abdullah Sports City",
      availableSpots: 18,
      type: 'regular'
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-28`,
      time: "18:00",
      location: "Women's Sports Complex",
      availableSpots: 18,
      type: 'girls-only'
    },
    {
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-30`,
      time: "17:00",
      location: "Amman Sports Center",
      availableSpots: 18,
      type: 'regular'
    },
  ];
};

// Generate 18 players (6 left team, 6 right team, 6 substitutes)
const initialPlayers: Player[] = [
  // Left team (positions 1-6)
  { id: 1, name: "Spieler 1", team: 'left' },
  { id: 2, name: "Spieler 2", team: 'left' },
  { id: 3, name: "Spieler 3", team: 'left' },
  { id: 4, name: "Spieler 4", team: 'left' },
  { id: 5, name: "Spieler 5", team: 'left' },
  { id: 6, name: "Spieler 6", team: 'left' },
  // Right team (positions 7-12)
  { id: 7, name: "Spieler 7", team: 'right' },
  { id: 8, name: "Spieler 8", team: 'right' },
  { id: 9, name: "Spieler 9", team: 'right' },
  { id: 10, name: "Spieler 10", team: 'right' },
  { id: 11, name: "Spieler 11", team: 'right' },
  { id: 12, name: "Spieler 12", team: 'right' },
  // Substitutes (positions 13-18)
  { id: 13, name: "Spieler 13", team: 'substitute' },
  { id: 14, name: "Spieler 14", team: 'substitute' },
  { id: 15, name: "Spieler 15", team: 'substitute' },
  { id: 16, name: "Spieler 16", team: 'substitute' },
  { id: 17, name: "Spieler 17", team: 'substitute' },
  { id: 18, name: "Spieler 18", team: 'substitute' },
];

export function VolleyballMatchModal({ isOpen, onClose }: VolleyballMatchModalProps) {
  const [bookedPositions, setBookedPositions] = useState<number[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchDate | null>(null);
  const matches = getMatchSchedule();

  const handleJoinClick = (playerId: number) => {
    if (!bookedPositions.includes(playerId)) {
      setBookedPositions([...bookedPositions, playerId]);
    }
  };

  const handlePositionClick = (positionId: number) => {
    // Remove from booked positions when clicking on court
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={cn(
          "relative w-full max-h-[95vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden",
          "animate-in zoom-in-95 duration-300",
          selectedMatch ? "max-w-7xl" : "max-w-5xl"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
            {selectedMatch && (
              <button
                onClick={handleBackToCalendar}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                aria-label="Back to calendar"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-xl md:text-2xl font-bold truncate">
                {selectedMatch ? "Join Volleyball" : "Volleyball Matches"}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1 hidden sm:block">
                {selectedMatch
                  ? "Wähle deine Position auf dem Spielfeld"
                  : "Wähle ein Match-Datum aus dem Kalender"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {selectedMatch && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm px-2 sm:px-3 hidden sm:inline-flex"
              >
                Reset
              </Button>
            )}
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-70px)] sm:max-h-[calc(90vh-88px)]">
          {!selectedMatch ? (
            /* Calendar View */
            <div className="flex items-center justify-center py-1 sm:py-2">
              <MatchCalendar matches={matches} onDateSelect={handleDateSelect} />
            </div>
          ) : (
            /* Court & Player List View */
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-3 sm:gap-4 md:gap-6">
              {/* Left: Court View */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200 sm:border-2">
                  <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-orange-600">
                      Volleyball Court
                    </h3>
                  </div>
                  <VolleyballCourt
                    bookedPositions={bookedPositions}
                    onPositionClick={handlePositionClick}
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 text-center">
                    Klicke auf eine gebuchte Position, um sie zu entfernen
                  </p>
                </div>

                {/* Match Info */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-2 sm:p-3 md:p-4 rounded-lg text-center">
                    <p className="text-xs sm:text-sm opacity-90">Datum</p>
                    <p className="text-sm sm:text-base md:text-lg font-bold mt-0.5 sm:mt-1">
                      {new Date(selectedMatch.date).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-2 sm:p-3 md:p-4 rounded-lg text-center">
                    <p className="text-xs sm:text-sm opacity-90">Zeit</p>
                    <p className="text-sm sm:text-base md:text-lg font-bold mt-0.5 sm:mt-1">{selectedMatch.time}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-2 sm:p-3 md:p-4 rounded-lg text-center">
                    <p className="text-xs sm:text-sm opacity-90">Ort</p>
                    <p className="text-[10px] sm:text-xs md:text-sm font-bold mt-0.5 sm:mt-1 truncate">{selectedMatch.location}</p>
                  </div>
                </div>

                {/* Booking Progress */}
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-orange-200 sm:border-2">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Buchungsfortschritt</h4>
                    <span className="text-base sm:text-lg font-bold text-orange-600">
                      {bookedPositions.length}/18
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${(bookedPositions.length / 18) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2 text-center">
                    {18 - bookedPositions.length} Positionen verfügbar
                  </p>
                </div>
              </div>

              {/* Right: Player List */}
              <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200 sm:border-2">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-orange-600 mb-2 sm:mb-3 md:mb-4">
                  Verfügbare Spieler
                </h3>
                <VolleyballPlayerList
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
