"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface Player {
  id: number;
  name: string;
  team: 'left' | 'right' | 'substitute';
}

interface VolleyballPlayerListProps {
  players: Player[];
  bookedPositions: number[];
  onJoinClick: (playerId: number) => void;
}

export function VolleyballPlayerList({ players, bookedPositions, onJoinClick }: VolleyballPlayerListProps) {
  // Split players by team
  const leftTeamPlayers = players.filter(p => p.team === 'left');
  const rightTeamPlayers = players.filter(p => p.team === 'right');
  const substitutePlayers = players.filter(p => p.team === 'substitute');

  const getTeamColor = (team: string) => {
    if (team === 'left') return 'bg-blue-900 hover:bg-blue-800';
    if (team === 'right') return 'bg-orange-600 hover:bg-orange-700';
    return 'bg-green-600 hover:bg-green-700';
  };

  const getTeamBorderColor = (team: string) => {
    if (team === 'left') return 'border-blue-900/20';
    if (team === 'right') return 'border-orange-600/20';
    return 'border-green-600/20';
  };

  const PlayerSection = ({ title, players: teamPlayers, bgColor }: { title: string; players: Player[]; bgColor: string }) => (
    <div className="mb-4 sm:mb-6">
      <h4 className={`text-xs sm:text-sm font-semibold mb-2 sm:mb-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg ${bgColor} text-white`}>
        {title}
      </h4>
      <div className="space-y-1.5 sm:space-y-2">
        {teamPlayers.map((player) => {
          const isBooked = bookedPositions.includes(player.id);
          return (
            <div
              key={player.id}
              className={`
                flex items-center justify-between p-2 sm:p-3 rounded-lg border transition-all duration-200
                ${isBooked
                  ? 'bg-gray-100 border-gray-300'
                  : `bg-white ${getTeamBorderColor(player.team)} hover:shadow-md`
                }
              `}
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white flex-shrink-0
                    ${isBooked ? 'bg-gray-400' : getTeamColor(player.team)}
                    transition-colors duration-200
                  `}
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-medium text-xs sm:text-sm truncate ${isBooked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {player.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Pos. {player.id}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onJoinClick(player.id)}
                disabled={isBooked}
                size="sm"
                className={`
                  ${isBooked
                    ? 'bg-gray-400 cursor-not-allowed'
                    : getTeamColor(player.team)
                  }
                  text-white transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 flex-shrink-0
                `}
              >
                {isBooked ? 'Gebucht' : '+ Join'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-1 max-h-[450px] sm:max-h-[600px] overflow-y-auto pr-1 sm:pr-2">
      <PlayerSection
        title="Team 1 - Links (6 Spieler)"
        players={leftTeamPlayers}
        bgColor="bg-blue-900"
      />
      <PlayerSection
        title="Team 2 - Rechts (6 Spieler)"
        players={rightTeamPlayers}
        bgColor="bg-orange-600"
      />
      <PlayerSection
        title="Ersatzspieler (6 Spieler)"
        players={substitutePlayers}
        bgColor="bg-green-600"
      />

      {/* Summary */}
      <div className="mt-3 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border border-gray-200 sm:border-2">
        <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
          <div>
            <p className="font-bold text-blue-900 text-sm sm:text-base">
              {bookedPositions.filter(id => id <= 6).length}/6
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600">Team 1</p>
          </div>
          <div>
            <p className="font-bold text-orange-600 text-sm sm:text-base">
              {bookedPositions.filter(id => id > 6 && id <= 12).length}/6
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600">Team 2</p>
          </div>
          <div>
            <p className="font-bold text-green-600 text-sm sm:text-base">
              {bookedPositions.filter(id => id > 12).length}/6
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600">Ersatz</p>
          </div>
        </div>
      </div>
    </div>
  );
}
