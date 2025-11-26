"use client";

import { cn } from "@/lib/utils";

interface Position {
  id: number;
  x: number;
  y: number;
  team: 'home' | 'away' | 'subs';
  role: string;
}

interface BasketballCourtProps {
  bookedPositions: number[];
  onPositionClick?: (positionId: number) => void;
  myPosition?: number | null;
  otherPlayersPositions?: number[];
}

// 15 positions: 5 Home, 5 Away, 5 Subs
const positions: Position[] = [
  // Home Team (Left side - Blue)
  { id: 1, x: 15, y: 50, team: 'home', role: 'PG' },
  { id: 2, x: 25, y: 20, team: 'home', role: 'SG' },
  { id: 3, x: 25, y: 80, team: 'home', role: 'SF' },
  { id: 4, x: 35, y: 35, team: 'home', role: 'PF' },
  { id: 5, x: 35, y: 65, team: 'home', role: 'C' },

  // Away Team (Right side - Red)
  { id: 6, x: 85, y: 50, team: 'away', role: 'PG' },
  { id: 7, x: 75, y: 20, team: 'away', role: 'SG' },
  { id: 8, x: 75, y: 80, team: 'away', role: 'SF' },
  { id: 9, x: 65, y: 35, team: 'away', role: 'PF' },
  { id: 10, x: 65, y: 65, team: 'away', role: 'C' },

  // Substitutes / Next Team (Bottom/Bench area)
  { id: 11, x: 20, y: 95, team: 'subs', role: 'Sub 1' },
  { id: 12, x: 35, y: 95, team: 'subs', role: 'Sub 2' },
  { id: 13, x: 50, y: 95, team: 'subs', role: 'Sub 3' },
  { id: 14, x: 65, y: 95, team: 'subs', role: 'Sub 4' },
  { id: 15, x: 80, y: 95, team: 'subs', role: 'Sub 5' },
];

export function BasketballCourt({ bookedPositions, onPositionClick, myPosition, otherPlayersPositions = [] }: BasketballCourtProps) {
  return (
    <div className="relative w-full aspect-[16/10] bg-orange-100 rounded-lg shadow-2xl overflow-hidden border-4 border-orange-800">
      {/* Court markings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Floor pattern/wood texture simulation */}
        <rect x="0" y="0" width="100" height="100" fill="#f0d9b5" />
        
        {/* Outer boundary */}
        <rect x="2" y="5" width="96" height="80" fill="none" stroke="#ea580c" strokeWidth="0.5" />

        {/* Center line */}
        <line x1="50" y1="5" x2="50" y2="85" stroke="#ea580c" strokeWidth="0.5" />

        {/* Center circle */}
        <circle cx="50" cy="45" r="8" fill="none" stroke="#ea580c" strokeWidth="0.5" />

        {/* Left key/paint */}
        <rect x="2" y="30" width="15" height="30" fill="none" stroke="#ea580c" strokeWidth="0.5" />
        <circle cx="17" cy="45" r="5" fill="none" stroke="#ea580c" strokeWidth="0.5" clipPath="url(#left-key-circle)" />
        
        {/* Right key/paint */}
        <rect x="83" y="30" width="15" height="30" fill="none" stroke="#ea580c" strokeWidth="0.5" />
        
        {/* Left 3-point line (simplified arc) */}
        <path d="M 2 10 Q 30 45 2 80" fill="none" stroke="#ea580c" strokeWidth="0.5" />

        {/* Right 3-point line (simplified arc) */}
        <path d="M 98 10 Q 70 45 98 80" fill="none" stroke="#ea580c" strokeWidth="0.5" />

        {/* Hoops */}
        <line x1="4" y1="45" x2="5" y2="45" stroke="black" strokeWidth="0.5" />
        <circle cx="5.5" cy="45" r="1.5" fill="none" stroke="orange" strokeWidth="0.2" />
        
        <line x1="96" y1="45" x2="95" y2="45" stroke="black" strokeWidth="0.5" />
        <circle cx="94.5" cy="45" r="1.5" fill="none" stroke="orange" strokeWidth="0.2" />

        {/* Bench Area Divider */}
        <line x1="0" y1="88" x2="100" y2="88" stroke="#ea580c" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="50" y="92" textAnchor="middle" fontSize="3" fill="#ea580c" opacity="0.7">Bench / Substitutes</text>
      </svg>

      {/* Player positions */}
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
              isClickable && "cursor-pointer hover:scale-125"
            )}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            onClick={() => isClickable && onPositionClick && onPositionClick(pos.id)}
          >
            {/* Player circle */}
            <div className="relative group">
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full border-3 transition-all duration-300 flex items-center justify-center",
                  isMyPosition
                    ? "bg-yellow-400 border-yellow-500 shadow-xl animate-pulse"
                    : isOtherPlayer
                    ? "bg-gray-400 border-gray-500 shadow-lg"
                    : pos.team === 'home' 
                      ? "bg-blue-600/80 border-blue-700 backdrop-blur-sm hover:bg-blue-600"
                      : pos.team === 'away'
                        ? "bg-red-600/80 border-red-700 backdrop-blur-sm hover:bg-red-600"
                        : "bg-gray-600/80 border-gray-700 backdrop-blur-sm hover:bg-gray-600"
                )}
              >
                {isBooked ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-white text-xs font-bold">{pos.role}</span>
                )}
              </div>

              {/* Tooltip */}
              <div className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200",
                "group-hover:opacity-100",
                "z-10"
              )}>
                {pos.role} - Player {pos.id}
                {isMyPosition && " (Deine Position)"}
                {isOtherPlayer && " (Gebucht)"}
              </div>
            </div>
          </div>
        );
      })}

      {/* Team labels */}
      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg opacity-80">
        Home
      </div>
      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg opacity-80">
        Away
      </div>
    </div>
  );
}
