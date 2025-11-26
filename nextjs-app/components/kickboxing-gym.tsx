"use client";

import { cn } from "@/lib/utils";

interface Position {
    id: number;
    x: number;
    y: number;
    label: string;
}

interface KickboxingGymProps {
    bookedPositions: number[];
    onPositionClick?: (positionId: number) => void;
    myPosition?: number | null;
    otherPlayersPositions?: number[];
}

// 10 positions arranged in a gym layout
const positions: Position[] = [
    // Row 1
    { id: 1, x: 20, y: 30, label: "Bag 1" },
    { id: 2, x: 40, y: 30, label: "Bag 2" },
    { id: 3, x: 60, y: 30, label: "Bag 3" },
    { id: 4, x: 80, y: 30, label: "Bag 4" },

    // Row 2
    { id: 5, x: 30, y: 50, label: "Mat 1" },
    { id: 6, x: 50, y: 50, label: "Ring" },
    { id: 7, x: 70, y: 50, label: "Mat 2" },

    // Row 3
    { id: 8, x: 20, y: 70, label: "Bag 5" },
    { id: 9, x: 50, y: 70, label: "Bag 6" },
    { id: 10, x: 80, y: 70, label: "Bag 7" },
];

export function KickboxingGym({ bookedPositions, onPositionClick, myPosition, otherPlayersPositions = [] }: KickboxingGymProps) {
    return (
        <div className="relative w-full aspect-[16/10] bg-zinc-800 rounded-lg shadow-2xl overflow-hidden border-4 border-zinc-900">
            {/* Gym Floor */}
            <div className="absolute inset-0 w-full h-full opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
            </div>

            {/* Ring Area (Center) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-red-600 rounded-lg opacity-30"></div>

            {/* Positions */}
            {positions.map((pos) => {
                const isBooked = bookedPositions.includes(pos.id);
                const isMyPosition = pos.id === myPosition;
                const isOtherPlayer = otherPlayersPositions.includes(pos.id);
                const isAvailable = !isBooked;
                const isClickable = (isAvailable || isMyPosition) && onPositionClick;

                return (
                    <div
                        key={pos.id}
                        className={cn(
                            "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                            isClickable && "cursor-pointer hover:scale-110"
                        )}
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                        }}
                        onClick={() => isClickable && onPositionClick && onPositionClick(pos.id)}
                    >
                        {/* Equipment/Player Indicator */}
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-full border-4 transition-all duration-300 flex items-center justify-center shadow-lg",
                                    isMyPosition
                                        ? "bg-yellow-400 border-yellow-500 animate-pulse"
                                        : isOtherPlayer
                                            ? "bg-red-900 border-red-950"
                                            : "bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                                )}
                            >
                                {isBooked ? (
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )}
                            </div>

                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                isMyPosition ? "bg-yellow-400 text-black" : "bg-black/50 text-white"
                            )}>
                                {pos.label}
                            </span>
                        </div>

                        {/* Tooltip */}
                        <div className={cn(
                            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200",
                            "group-hover:opacity-100",
                            "z-10"
                        )}>
                            {pos.label}
                            {isMyPosition && " (Gebucht)"}
                            {isOtherPlayer && " (Belegt)"}
                        </div>
                    </div>
                );
            })}

            {/* Decor */}
            <div className="absolute top-4 left-4 text-zinc-600 font-black text-4xl opacity-20 select-none">
                GYM
            </div>
        </div>
    );
}
