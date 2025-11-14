"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Check } from "lucide-react";

interface Player {
  id: number;
  name: string;
  team: 'team1' | 'team2' | 'team3';
}

interface PlayerList6vs6Props {
  players: Player[];
  bookedPositions: number[];
  onJoinClick: (playerId: number) => void;
}

export function PlayerList6vs6({ players, bookedPositions, onJoinClick }: PlayerList6vs6Props) {
  const team1Players = players.filter(p => p.team === 'team1');
  const team2Players = players.filter(p => p.team === 'team2');
  const team3Players = players.filter(p => p.team === 'team3');

  const renderPlayerItem = (player: Player) => {
    const isBooked = bookedPositions.includes(player.id);

    const teamColors = {
      team1: {
        bg: 'bg-primary-navy/5 border-primary-navy/20 hover:border-primary-navy/40',
        avatar: 'bg-primary-navy',
        button: 'bg-primary-navy hover:bg-primary-blue',
      },
      team2: {
        bg: 'bg-accent-orange/5 border-accent-orange/20 hover:border-accent-orange/40',
        avatar: 'bg-accent-orange',
        button: 'bg-accent-orange hover:bg-accent-orange/90',
      },
      team3: {
        bg: 'bg-green-600/5 border-green-600/20 hover:border-green-600/40',
        avatar: 'bg-green-600',
        button: 'bg-green-600 hover:bg-green-700',
      },
    };

    const colors = teamColors[player.team];

    return (
      <div
        key={player.id}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200",
          isBooked
            ? "bg-gray-100 border-gray-300"
            : colors.bg + " hover:shadow-md"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
              isBooked ? "bg-gray-300" : colors.avatar
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
              {player.team === 'team1' ? 'Team 1' : player.team === 'team2' ? 'Team 2' : 'Team 3'}
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
              : colors.button
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
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{bookedPositions.length}</p>
            <p className="text-sm opacity-90">Booked</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{18 - bookedPositions.length}</p>
            <p className="text-sm opacity-90">Available</p>
          </div>
        </div>
      </div>

      {/* Team 1 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-primary-navy"></div>
          <h3 className="font-semibold text-primary-navy">Team 1 Players</h3>
        </div>
        <div className="space-y-2">
          {team1Players.map(renderPlayerItem)}
        </div>
      </div>

      {/* Team 2 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-accent-orange"></div>
          <h3 className="font-semibold text-accent-orange">Team 2 Players</h3>
        </div>
        <div className="space-y-2">
          {team2Players.map(renderPlayerItem)}
        </div>
      </div>

      {/* Team 3 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <h3 className="font-semibold text-green-600">Team 3 Players</h3>
        </div>
        <div className="space-y-2">
          {team3Players.map(renderPlayerItem)}
        </div>
      </div>
    </div>
  );
}
