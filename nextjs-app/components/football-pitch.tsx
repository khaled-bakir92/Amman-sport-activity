"use client";

import { cn } from "@/lib/utils";

interface Position {
  id: number;
  x: number;
  y: number;
  team: 'home' | 'away';
  role: string;
}

interface FootballPitchProps {
  bookedPositions: number[];
  onPositionClick?: (positionId: number) => void;
}

// 4-3-3 formation for both teams
const positions: Position[] = [
  // Home Team (Left side - Navy)
  { id: 1, x: 8, y: 50, team: 'home', role: 'GK' },
  { id: 2, x: 20, y: 20, team: 'home', role: 'LB' },
  { id: 3, x: 20, y: 40, team: 'home', role: 'CB' },
  { id: 4, x: 20, y: 60, team: 'home', role: 'CB' },
  { id: 5, x: 20, y: 80, team: 'home', role: 'RB' },
  { id: 6, x: 35, y: 30, team: 'home', role: 'CM' },
  { id: 7, x: 35, y: 50, team: 'home', role: 'CM' },
  { id: 8, x: 35, y: 70, team: 'home', role: 'CM' },
  { id: 9, x: 47, y: 20, team: 'home', role: 'LW' },
  { id: 10, x: 47, y: 50, team: 'home', role: 'ST' },
  { id: 11, x: 47, y: 80, team: 'home', role: 'RW' },

  // Away Team (Right side - Orange)
  { id: 12, x: 92, y: 50, team: 'away', role: 'GK' },
  { id: 13, x: 80, y: 20, team: 'away', role: 'RB' },
  { id: 14, x: 80, y: 40, team: 'away', role: 'CB' },
  { id: 15, x: 80, y: 60, team: 'away', role: 'CB' },
  { id: 16, x: 80, y: 80, team: 'away', role: 'LB' },
  { id: 17, x: 65, y: 30, team: 'away', role: 'CM' },
  { id: 18, x: 65, y: 50, team: 'away', role: 'CM' },
  { id: 19, x: 65, y: 70, team: 'away', role: 'CM' },
  { id: 20, x: 53, y: 20, team: 'away', role: 'RW' },
  { id: 21, x: 53, y: 50, team: 'away', role: 'ST' },
  { id: 22, x: 53, y: 80, team: 'away', role: 'LW' },
];

export function FootballPitch({ bookedPositions, onPositionClick }: FootballPitchProps) {
  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-2xl overflow-hidden border-4 border-white">
      {/* Pitch markings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Outer boundary */}
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Center line */}
        <line x1="50" y1="2" x2="50" y2="98" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Center circle */}
        <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <circle cx="50" cy="50" r="0.8" fill="white" opacity="0.8"/>

        {/* Left penalty area */}
        <rect x="2" y="30" width="15" height="40" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <rect x="2" y="40" width="6" height="20" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Right penalty area */}
        <rect x="83" y="30" width="15" height="40" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <rect x="92" y="40" width="6" height="20" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>

        {/* Left goal */}
        <rect x="0" y="45" width="2" height="10" fill="white" opacity="0.3"/>

        {/* Right goal */}
        <rect x="98" y="45" width="2" height="10" fill="white" opacity="0.3"/>

        {/* Corner arcs */}
        <path d="M 2 2 Q 5 2 5 5" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <path d="M 2 98 Q 5 98 5 95" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <path d="M 98 2 Q 95 2 95 5" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
        <path d="M 98 98 Q 95 98 95 95" fill="none" stroke="white" strokeWidth="0.3" opacity="0.8"/>
      </svg>

      {/* Player positions */}
      {positions.map((pos) => {
        const isBooked = bookedPositions.includes(pos.id);
        const isClickable = !isBooked && onPositionClick;

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
            onClick={() => isClickable && onPositionClick(pos.id)}
          >
            {/* Player circle */}
            <div className="relative group">
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full border-3 transition-all duration-300 flex items-center justify-center",
                  isBooked
                    ? pos.team === 'home'
                      ? "bg-primary-navy border-white shadow-lg"
                      : "bg-accent-orange border-white shadow-lg"
                    : "bg-white/20 border-white/40 backdrop-blur-sm hover:bg-white/40"
                )}
              >
                {isBooked && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Tooltip */}
              <div className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200",
                "group-hover:opacity-100"
              )}>
                {pos.role} - Player {pos.id}
                {isBooked && " (Booked)"}
              </div>
            </div>
          </div>
        );
      })}

      {/* Team labels */}
      <div className="absolute top-4 left-4 bg-primary-navy text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        Home Team
      </div>
      <div className="absolute top-4 right-4 bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        Away Team
      </div>
    </div>
  );
}
