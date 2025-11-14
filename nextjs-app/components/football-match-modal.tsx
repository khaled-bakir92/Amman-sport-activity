"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FootballPitch } from "./football-pitch";
import { FootballPitch6vs6 } from "./football-pitch-6vs6";
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
  const [myBookedPosition, setMyBookedPosition] = useState<number | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchDate | null>(null);
  const matches = getMatchSchedule();

  // Simuliere bereits gebuchte Positionen von anderen Spielern (Random für Demo)
  const [otherPlayersPositions] = useState<number[]>(() => {
    // Generiere zufällig 3-5 bereits gebuchte Positionen
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 Spieler
    const positions: number[] = [];
    while (positions.length < count) {
      const randomPos = Math.floor(Math.random() * 22) + 1;
      if (!positions.includes(randomPos)) {
        positions.push(randomPos);
      }
    }
    return positions;
  });

  // Alle gebuchten Positionen (meine + andere)
  const allBookedPositions = myBookedPosition
    ? [...otherPlayersPositions, myBookedPosition]
    : otherPlayersPositions;

  const handleJoinMatch = () => {
    // Finde eine zufällige verfügbare Position
    const maxPositions = selectedMatch?.type === '6vs6' ? 18 : 22;
    const availablePositions = Array.from({ length: maxPositions }, (_, i) => i + 1)
      .filter(id => !otherPlayersPositions.includes(id));

    if (availablePositions.length > 0 && myBookedPosition === null) {
      const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      setMyBookedPosition(randomPosition);
    }
  };

  const handlePositionClick = (positionId: number) => {
    // Wenn Position bereits von anderem Spieler gebucht ist, nichts tun
    if (otherPlayersPositions.includes(positionId)) {
      return;
    }

    // Wenn dies meine Position ist, entfernen
    if (positionId === myBookedPosition) {
      setMyBookedPosition(null);
      return;
    }

    // Wenn ich noch keine Position habe, diese Position buchen
    if (myBookedPosition === null) {
      setMyBookedPosition(positionId);
    }
  };

  const handleReset = () => {
    setMyBookedPosition(null);
  };

  const handleDateSelect = (match: MatchDate) => {
    setSelectedMatch(match);
    setMyBookedPosition(null); // Reset bookings when selecting new date
  };

  const handleBackToCalendar = () => {
    setSelectedMatch(null);
    setMyBookedPosition(null);
  };

  const handleClose = () => {
    setSelectedMatch(null);
    setMyBookedPosition(null);
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
            /* 6vs6 Stadium & Action Panel */
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6 max-w-6xl mx-auto">
              {/* Left: Stadium */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-green-600">
                      6vs6 Football Pitch
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-primary-navy"></div>
                        <span className="text-gray-600">Team 1</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-accent-orange"></div>
                        <span className="text-gray-600">Team 2</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        <span className="text-gray-600">Team 3</span>
                      </div>
                    </div>
                  </div>
                  <FootballPitch6vs6
                    bookedPositions={allBookedPositions}
                    onPositionClick={handlePositionClick}
                    myPosition={myBookedPosition}
                    otherPlayersPositions={otherPlayersPositions}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {myBookedPosition
                      ? '✓ Position gebucht! Klicke zum Entfernen'
                      : 'Klicke auf eine freie Position'}
                  </p>
                </div>

                {/* Compact Booking Statistics - 6vs6 */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2 border border-green-200">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-lg font-bold text-green-600">{allBookedPositions.length}</p>
                      <p className="text-[9px] text-gray-600">Gebucht</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-lg font-bold text-orange-600">{18 - allBookedPositions.length}</p>
                      <p className="text-[9px] text-gray-600">Verfügbar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Action Panel */}
              <div className="space-y-4">
                {/* Join Button */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-6 text-center shadow-lg">
                  {myBookedPosition ? (
                    <>
                      <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center mb-3 animate-pulse">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-lg font-bold">Du bist dabei!</p>
                        <p className="text-sm opacity-90 mt-1">Position {myBookedPosition}</p>
                      </div>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Platz freigeben
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <p className="text-lg font-bold">Match beitreten</p>
                        <p className="text-sm opacity-90 mt-1">Zufällige Position</p>
                      </div>
                      <Button
                        onClick={handleJoinMatch}
                        className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white font-bold py-3"
                      >
                        Jetzt beitreten
                      </Button>
                    </>
                  )}
                </div>

                {/* Match Info Cards */}
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Datum</p>
                      <p className="font-semibold text-gray-900 truncate">
                        {new Date(selectedMatch.date).toLocaleDateString('de-DE', {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Zeit</p>
                      <p className="font-semibold text-gray-900">{selectedMatch.time} Uhr</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Ort</p>
                      <p className="font-semibold text-gray-900 text-sm truncate">{selectedMatch.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 11vs11 Stadium & Action Panel */
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6 max-w-6xl mx-auto">
              {/* Left: Stadium */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-primary-navy">
                      Football Stadium
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-primary-navy"></div>
                        <span className="text-gray-600">Home</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-accent-orange"></div>
                        <span className="text-gray-600">Away</span>
                      </div>
                    </div>
                  </div>
                  <FootballPitch
                    bookedPositions={allBookedPositions}
                    onPositionClick={handlePositionClick}
                    myPosition={myBookedPosition}
                    otherPlayersPositions={otherPlayersPositions}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {myBookedPosition
                      ? '✓ Position gebucht! Klicke zum Entfernen'
                      : 'Klicke auf eine freie Position'}
                  </p>
                </div>

                {/* Compact Booking Statistics */}
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-2 border border-blue-200">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-lg font-bold text-blue-900">{allBookedPositions.length}</p>
                      <p className="text-[9px] text-gray-600">Gebucht</p>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <p className="text-lg font-bold text-orange-600">{22 - allBookedPositions.length}</p>
                      <p className="text-[9px] text-gray-600">Verfügbar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Action Panel */}
              <div className="space-y-4">
                {/* Join Button */}
                <div className="bg-gradient-to-br from-primary-navy to-primary-blue text-white rounded-lg p-6 text-center shadow-lg">
                  {myBookedPosition ? (
                    <>
                      <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center mb-3 animate-pulse">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-lg font-bold">Du bist dabei!</p>
                        <p className="text-sm opacity-90 mt-1">Position {myBookedPosition}</p>
                      </div>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Platz freigeben
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <p className="text-lg font-bold">Match beitreten</p>
                        <p className="text-sm opacity-90 mt-1">Zufällige Position</p>
                      </div>
                      <Button
                        onClick={handleJoinMatch}
                        className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white font-bold py-3"
                      >
                        Jetzt beitreten
                      </Button>
                    </>
                  )}
                </div>

                {/* Match Info Cards */}
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Datum</p>
                      <p className="font-semibold text-gray-900 truncate">
                        {new Date(selectedMatch.date).toLocaleDateString('de-DE', {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Zeit</p>
                      <p className="font-semibold text-gray-900">{selectedMatch.time} Uhr</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Ort</p>
                      <p className="font-semibold text-gray-900 text-sm truncate">{selectedMatch.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
