"use client";

import { useState } from "react";
import { X, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasketballCourt } from "./basketball-court";
import { MatchCalendar } from "./match-calendar";
import { LoginPromptModal } from "./login-prompt-modal";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface Player {
    id: number;
    name: string;
    team: 'home' | 'away' | 'subs';
}

interface MatchDate {
    date: string;
    time: string;
    location: string;
    availableSpots: number;
    type?: 'regular' | 'girls-only' | '6vs6';
}

interface BasketballMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Sample match schedule for basketball
const getMatchSchedule = (): MatchDate[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    return [
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-17`,
            time: "18:00",
            location: "Amman Sports Center",
            availableSpots: 15,
            type: 'regular'
        },
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`,
            time: "19:30",
            location: "Al-Hussein Indoor Hall",
            availableSpots: 15,
            type: 'regular'
        },
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-22`,
            time: "17:00",
            location: "Women's Sports Complex",
            availableSpots: 15,
            type: 'girls-only'
        },
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-24`,
            time: "20:00",
            location: "King Abdullah Sports City",
            availableSpots: 15,
            type: 'regular'
        },
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-27`,
            time: "18:30",
            location: "Amman Sports Center",
            availableSpots: 15,
            type: 'regular'
        },
    ];
};

export function BasketballMatchModal({ isOpen, onClose }: BasketballMatchModalProps) {
    const { data: session } = useSession();
    const [selectedMatch, setSelectedMatch] = useState<MatchDate | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const matches = getMatchSchedule();

    const [myBookedPosition, setMyBookedPosition] = useState<number | null>(null);

    // Simuliere bereits gebuchte Positionen von anderen Spielern (Random für Demo)
    const [otherPlayersPositions] = useState<number[]>(() => {
        const count = Math.floor(Math.random() * 8) + 2; // 2-10 Spieler
        const positions: number[] = [];
        while (positions.length < count) {
            const randomPos = Math.floor(Math.random() * 15) + 1;
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

    const totalPlayers = allBookedPositions.length;
    const minPlayers = 10;
    const maxPlayers = 15;
    const isMatchConfirmed = totalPlayers >= minPlayers;

    const handleJoinMatch = () => {
        // Prüfe ob User eingeloggt ist
        if (!session) {
            setShowLoginPrompt(true);
            return;
        }

        // Finde eine zufällige verfügbare Position
        const availablePositions = Array.from({ length: 15 }, (_, i) => i + 1)
            .filter(id => !otherPlayersPositions.includes(id));

        if (availablePositions.length > 0 && myBookedPosition === null) {
            const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
            setMyBookedPosition(randomPosition);
        }
    };

    const handlePositionClick = (positionId: number) => {
        // Prüfe ob User eingeloggt ist
        if (!session) {
            setShowLoginPrompt(true);
            return;
        }

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
        setMyBookedPosition(null);
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
        <>
            <LoginPromptModal
                isOpen={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                sportName="dem Basketball-Match"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div
                    className={cn(
                        "relative w-full max-h-[95vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden",
                        "animate-in zoom-in-95 duration-300",
                        selectedMatch ? "max-w-7xl" : "max-w-5xl"
                    )}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-700 to-orange-600 text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-white/20">
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
                                    {selectedMatch ? "Join Basketball" : "Basketball Matches"}
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
                            /* Court & Action Panel View */
                            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
                                {/* Left: Court View */}
                                <div className="space-y-3">
                                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border-2 border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-base font-semibold text-orange-700">
                                                Basketball Court
                                            </h3>

                                            {/* Status Indicator */}
                                            <div className={cn(
                                                "px-2 py-1 rounded text-xs font-bold",
                                                isMatchConfirmed
                                                    ? "bg-green-100 text-green-700 border border-green-200"
                                                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                            )}>
                                                {isMatchConfirmed
                                                    ? "Match Confirmed!"
                                                    : `Waiting for players (${totalPlayers}/${minPlayers})`}
                                            </div>
                                        </div>

                                        <BasketballCourt
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
                                    <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-2 border border-orange-200">
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div className="bg-white rounded-lg p-2">
                                                <p className="text-lg font-bold text-orange-600">{totalPlayers}</p>
                                                <p className="text-[9px] text-gray-600">Joined</p>
                                            </div>
                                            <div className="bg-white rounded-lg p-2">
                                                <p className="text-lg font-bold text-blue-600">{maxPlayers - totalPlayers}</p>
                                                <p className="text-[9px] text-gray-600">Available</p>
                                            </div>
                                            <div className={cn(
                                                "rounded-lg p-2",
                                                isMatchConfirmed ? "bg-green-50" : "bg-yellow-50"
                                            )}>
                                                <p className={cn(
                                                    "text-lg font-bold",
                                                    isMatchConfirmed ? "text-green-600" : "text-yellow-600"
                                                )}>
                                                    {isMatchConfirmed ? "GO!" : `${minPlayers - totalPlayers}`}
                                                </p>
                                                <p className="text-[9px] text-gray-600">
                                                    {isMatchConfirmed ? "Confirmed" : "Needed"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Action Panel */}
                                <div className="space-y-4">
                                    {/* Join Button */}
                                    <div className="bg-gradient-to-br from-orange-700 to-orange-800 text-white rounded-lg p-6 text-center shadow-lg">
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
                                                    className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3"
                                                >
                                                    Jetzt beitreten
                                                </Button>
                                            </>
                                        )}
                                    </div>

                                    {/* Match Info Cards */}
                                    <div className="space-y-2">
                                        <div className="bg-white rounded-lg p-4 border-2 border-gray-200 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </>
    );
}
