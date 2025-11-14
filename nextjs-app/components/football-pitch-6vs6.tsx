"use client";

import { cn } from "@/lib/utils";

interface Position {
  id: number;
  x: number;
  y: number;
  team: 'team1' | 'team2' | 'team3';
  row: number;
}

interface FootballPitch6vs6Props {
  bookedPositions: number[];
  onPositionClick?: (positionId: number) => void;
}

// 3 Teams with 6 players each in horizontal rows
const positions: Position[] = [
  // Team 1 (First row - Top) - Blue
  { id: 1, x: 10, y: 20, team: 'team1', row: 1 },
  { id: 2, x: 25, y: 20, team: 'team1', row: 1 },
  { id: 3, x: 40, y: 20, team: 'team1', row: 1 },
  { id: 4, x: 55, y: 20, team: 'team1', row: 1 },
  { id: 5, x: 70, y: 20, team: 'team1', row: 1 },
  { id: 6, x: 85, y: 20, team: 'team1', row: 1 },

  // Team 2 (Second row - Middle) - Orange
  { id: 7, x: 10, y: 50, team: 'team2', row: 2 },
  { id: 8, x: 25, y: 50, team: 'team2', row: 2 },
  { id: 9, x: 40, y: 50, team: 'team2', row: 2 },
  { id: 10, x: 55, y: 50, team: 'team2', row: 2 },
  { id: 11, x: 70, y: 50, team: 'team2', row: 2 },
  { id: 12, x: 85, y: 50, team: 'team2', row: 2 },

  // Team 3 (Third row - Bottom) - Green
  { id: 13, x: 10, y: 80, team: 'team3', row: 3 },
  { id: 14, x: 25, y: 80, team: 'team3', row: 3 },
  { id: 15, x: 40, y: 80, team: 'team3', row: 3 },
  { id: 16, x: 55, y: 80, team: 'team3', row: 3 },
  { id: 17, x: 70, y: 80, team: 'team3', row: 3 },
  { id: 18, x: 85, y: 80, team: 'team3', row: 3 },
];

const teamColors = {
  team1: {
    bg: 'bg-primary-navy',
    border: 'border-primary-navy',
    label: 'Team 1',
  },
  team2: {
    bg: 'bg-accent-orange',
    border: 'border-accent-orange',
    label: 'Team 2',
  },
  team3: {
    bg: 'bg-green-600',
    border: 'border-green-600',
    label: 'Team 3',
  },
};

export function FootballPitch6vs6({ bookedPositions, onPositionClick }: FootballPitch6vs6Props) {
  return (
    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-2xl overflow-hidden border-4 border-white">
      {/* Pitch markings - Same as 11vs11 */}
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
        const colors = teamColors[pos.team];

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
                    ? `${colors.bg} border-white shadow-lg`
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
                {colors.label} - Player {pos.id}
                {isBooked && " (Booked)"}
              </div>
            </div>
          </div>
        );
      })}

      {/* Team labels */}
      <div className="absolute top-4 left-4 bg-primary-navy text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        Team 1
      </div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        Team 2
      </div>
      <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        Team 3
      </div>
    </div>
  );
}
