"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Check } from "lucide-react";

interface Player {
  id: number;
  name: string;
  team: 'home' | 'away';
}

interface PlayerListProps {
  players: Player[];
  bookedPositions: number[];
  onJoinClick: (playerId: number) => void;
}

export function PlayerList({ players, bookedPositions, onJoinClick }: PlayerListProps) {
  const homePlayers = players.filter(p => p.team === 'home');
  const awayPlayers = players.filter(p => p.team === 'away');

  const renderPlayerItem = (player: Player) => {
    const isBooked = bookedPositions.includes(player.id);

    return (
      <div
        key={player.id}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200",
          isBooked
            ? "bg-gray-100 border-gray-300"
            : player.team === 'home'
            ? "bg-primary-navy/5 border-primary-navy/20 hover:border-primary-navy/40 hover:shadow-md"
            : "bg-accent-orange/5 border-accent-orange/20 hover:border-accent-orange/40 hover:shadow-md"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
              isBooked
                ? "bg-gray-300"
                : player.team === 'home'
                ? "bg-primary-navy"
                : "bg-accent-orange"
            )}
          >
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className={cn(
              "font-medium",
              isBooked ? "text-gray-500" : "text-gray-900"
            )}>
              {player.name}
            </p>
            <p className="text-xs text-gray-500">
              {player.team === 'home' ? 'Home Team' : 'Away Team'}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          disabled={isBooked}
          onClick={() => onJoinClick(player.id)}
          className={cn(
            "min-w-[80px] transition-all duration-200",
            isBooked
              ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
              : player.team === 'home'
              ? "bg-primary-navy hover:bg-primary-blue"
              : "bg-accent-orange hover:bg-accent-orange/90"
          )}
        >
          {isBooked ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Booked
            </>
          ) : (
            <>
              <span className="text-lg mr-1">+</span>
              Join
            </>
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      {/* Stats */}
      <div className="bg-gradient-to-r from-primary-navy to-primary-blue text-white p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{bookedPositions.length}</p>
            <p className="text-sm opacity-90">Booked</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{22 - bookedPositions.length}</p>
            <p className="text-sm opacity-90">Available</p>
          </div>
        </div>
      </div>

      {/* Home Team */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-primary-navy"></div>
          <h3 className="font-semibold text-primary-navy">Home Team Players</h3>
        </div>
        <div className="space-y-2">
          {homePlayers.map(renderPlayerItem)}
        </div>
      </div>

      {/* Away Team */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-accent-orange"></div>
          <h3 className="font-semibold text-accent-orange">Away Team Players</h3>
        </div>
        <div className="space-y-2">
          {awayPlayers.map(renderPlayerItem)}
        </div>
      </div>
    </div>
  );
}
