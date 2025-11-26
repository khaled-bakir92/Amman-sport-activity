"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KickboxingGym } from "./kickboxing-gym";
import { MatchCalendar } from "./match-calendar";
import { LoginPromptModal } from "./login-prompt-modal";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface MatchDate {
    date: string;
    time: string;
    location: string;
    availableSpots: number;
    type?: 'regular' | 'girls-only' | '6vs6';
}

interface KickboxingGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
}

// Sample schedule for Kickboxing
const getMatchSchedule = (): MatchDate[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    return [
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-18`,
            time: "18:00",
            location: "Robeen Gym Main Hall",
            availableSpots: 10,
            type: 'regular'
        },
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-21`,
            time: "19:00",
            location: "Robeen Gym Main Hall",
            availableSpots: 10,
            type: 'regular'
        },
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-25`,
            time: "17:30",
            location: "Robeen Gym Studio B",
            availableSpots: 10,
            type: 'girls-only'
        },
        {
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-28`,
            time: "18:00",
            location: "Robeen Gym Main Hall",
            availableSpots: 10,
            type: 'regular'
        },
    ];
};

export function KickboxingGroupModal({ isOpen, onClose, onBack }: KickboxingGroupModalProps) {
    const { data: session } = useSession();
    const [selectedMatch, setSelectedMatch] = useState<MatchDate | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const matches = getMatchSchedule();

    const [myBookedPosition, setMyBookedPosition] = useState<number | null>(null);

    // Simulate other players
    const [otherPlayersPositions] = useState<number[]>(() => {
        const count = Math.floor(Math.random() * 5) + 2; // 2-6 players
        const positions: number[] = [];
        while (positions.length < count) {
            const randomPos = Math.floor(Math.random() * 10) + 1;
            if (!positions.includes(randomPos)) {
                positions.push(randomPos);
            }
        }
        return positions;
    });

    const allBookedPositions = myBookedPosition
        ? [...otherPlayersPositions, myBookedPosition]
        : otherPlayersPositions;

    const totalPlayers = allBookedPositions.length;
    const maxPlayers = 10;

    const handleJoinMatch = () => {
        if (!session) {
            setShowLoginPrompt(true);
            return;
        }

        const availablePositions = Array.from({ length: 10 }, (_, i) => i + 1)
            .filter(id => !otherPlayersPositions.includes(id));

        if (availablePositions.length > 0 && myBookedPosition === null) {
            const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
            setMyBookedPosition(randomPosition);
        }
    };

    const handlePositionClick = (positionId: number) => {
        if (!session) {
            setShowLoginPrompt(true);
            return;
        }

        if (otherPlayersPositions.includes(positionId)) {
            return;
        }

        if (positionId === myBookedPosition) {
            setMyBookedPosition(null);
            return;
        }

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

    if (!isOpen) return null;

    return (
        <>
            <LoginPromptModal
                isOpen={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                sportName="dem Kickboxing-Training"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div
                    className={cn(
                        "relative w-full max-h-[95vh] sm:max-h-[90vh] bg-zinc-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-zinc-800",
                        "animate-in zoom-in-95 duration-300",
                        selectedMatch ? "max-w-6xl" : "max-w-4xl"
                    )}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-zinc-950 text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-zinc-800">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                            <button
                                onClick={selectedMatch ? handleBackToCalendar : onBack}
                                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                                aria-label="Back"
                            >
                                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            <div className="min-w-0 flex-1">
                                <h2 className="text-base sm:text-xl md:text-2xl font-bold truncate text-red-500">
                                    {selectedMatch ? "Group Session" : "Select Date"}
                                </h2>
                                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 sm:mt-1 hidden sm:block">
                                    {selectedMatch
                                        ? "Wähle deinen Platz im Gym"
                                        : "Wähle einen Termin für das Gruppentraining"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <button
                                onClick={onClose}
                                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-70px)] sm:max-h-[calc(90vh-88px)] bg-zinc-900">
                        {!selectedMatch ? (
                            /* Calendar View */
                            <div className="flex items-center justify-center py-1 sm:py-2">
                                <MatchCalendar matches={matches} onDateSelect={handleDateSelect} />
                            </div>
                        ) : (
                            /* Gym & Action Panel View */
                            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
                                {/* Left: Gym View */}
                                <div className="space-y-3">
                                    <div className="bg-zinc-800 rounded-lg p-2 sm:p-3 border border-zinc-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-base font-semibold text-red-500">
                                                Training Area
                                            </h3>
                                            <div className="px-2 py-1 rounded text-xs font-bold bg-zinc-900 text-zinc-300 border border-zinc-700">
                                                Max 10 Participants
                                            </div>
                                        </div>

                                        <KickboxingGym
                                            bookedPositions={allBookedPositions}
                                            onPositionClick={handlePositionClick}
                                            myPosition={myBookedPosition}
                                            otherPlayersPositions={otherPlayersPositions}
                                        />
                                        <p className="text-xs text-zinc-500 mt-2 text-center">
                                            {myBookedPosition
                                                ? '✓ Platz reserviert! Klicke zum Entfernen'
                                                : 'Klicke auf einen freien Platz'}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="bg-zinc-800 rounded-lg p-2 border border-zinc-700">
                                        <div className="grid grid-cols-2 gap-2 text-center">
                                            <div className="bg-zinc-900 rounded-lg p-2">
                                                <p className="text-lg font-bold text-red-500">{totalPlayers}</p>
                                                <p className="text-[9px] text-zinc-400">Teilnehmer</p>
                                            </div>
                                            <div className="bg-zinc-900 rounded-lg p-2">
                                                <p className="text-lg font-bold text-green-500">{maxPlayers - totalPlayers}</p>
                                                <p className="text-[9px] text-zinc-400">Frei</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Action Panel */}
                                <div className="space-y-4">
                                    {/* Join Button */}
                                    <div className="bg-gradient-to-br from-red-900 to-red-950 text-white rounded-lg p-6 text-center shadow-lg border border-red-900">
                                        {myBookedPosition ? (
                                            <>
                                                <div className="mb-4">
                                                    <div className="w-16 h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center mb-3 animate-pulse">
                                                        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-lg font-bold">Angemeldet!</p>
                                                    <p className="text-sm opacity-70 mt-1">Viel Spaß beim Training</p>
                                                </div>
                                                <Button
                                                    onClick={handleReset}
                                                    variant="outline"
                                                    className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                                                >
                                                    Abmelden
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="mb-4">
                                                    <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-3 border border-white/10">
                                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-lg font-bold">Training buchen</p>
                                                    <p className="text-sm opacity-70 mt-1">Sichere dir deinen Platz</p>
                                                </div>
                                                <Button
                                                    onClick={handleJoinMatch}
                                                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3"
                                                >
                                                    Jetzt buchen
                                                </Button>
                                            </>
                                        )}
                                    </div>

                                    {/* Info Cards */}
                                    <div className="space-y-2">
                                        <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-zinc-500">Datum</p>
                                                <p className="font-semibold text-zinc-200 truncate">
                                                    {new Date(selectedMatch.date).toLocaleDateString('de-DE', {
                                                        weekday: 'short',
                                                        day: '2-digit',
                                                        month: 'short'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-zinc-500">Zeit</p>
                                                <p className="font-semibold text-zinc-200">{selectedMatch.time} Uhr</p>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-zinc-500">Ort</p>
                                                <p className="font-semibold text-zinc-200 text-sm truncate">{selectedMatch.location}</p>
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
