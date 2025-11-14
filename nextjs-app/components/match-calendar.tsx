"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchDate {
  date: string; // Format: "YYYY-MM-DD"
  time: string;
  location: string;
  availableSpots: number;
  type?: 'regular' | 'girls-only' | '6vs6'; // Match type
}

interface MatchCalendarProps {
  matches: MatchDate[];
  onDateSelect: (match: MatchDate) => void;
}

export function MatchCalendar({ matches, onDateSelect }: MatchCalendarProps) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get month name
  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];
  const monthName = monthNames[currentMonth];

  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  // Create array of days
  const days = [];

  // Add empty cells for days before month starts (adjust for Monday start)
  const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
  for (let i = 0; i < adjustedStartDay; i++) {
    days.push(null);
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // Check if a date has a match
  const getMatchForDate = (day: number | null): MatchDate | undefined => {
    if (!day) return undefined;

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return matches.find(match => match.date === dateStr);
  };

  // Check if date is in the past
  const isPastDate = (day: number | null): boolean => {
    if (!day) return false;
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-navy to-primary-blue text-white p-3 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <h2 className="text-base font-bold">Wähle ein Match-Datum</h2>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-3 rounded-b-lg shadow-xl">
        <div className="text-center mb-3">
          <h3 className="text-lg font-bold text-primary-navy">
            {monthName} {currentYear}
          </h3>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const match = getMatchForDate(day);
            const hasMatch = !!match;
            const isPast = isPastDate(day);
            const isDisabled = !day || (!hasMatch || isPast);

            // Get color based on match type
            const getMatchColor = () => {
              if (!match || isPast) return '';
              switch (match.type) {
                case 'girls-only':
                  return 'bg-red-500 hover:bg-red-600';
                case '6vs6':
                  return 'bg-green-600 hover:bg-green-700';
                default:
                  return 'bg-accent-orange hover:bg-accent-orange/90';
              }
            };

            return (
              <div key={index} className="aspect-square">
                {day ? (
                  <button
                    onClick={() => match && !isPast && onDateSelect(match)}
                    disabled={isDisabled}
                    className={cn(
                      "w-full h-full rounded transition-all duration-200 flex flex-col items-center justify-center relative group",
                      hasMatch && !isPast
                        ? `${getMatchColor()} text-white hover:scale-105 shadow-sm cursor-pointer`
                        : isPast
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-50 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    <span className={cn(
                      "text-xs font-semibold",
                      hasMatch && !isPast && "text-white"
                    )}>
                      {day}
                    </span>

                    {hasMatch && !isPast && (
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
                    )}

                    {/* Hover tooltip */}
                    {hasMatch && !isPast && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div className="bg-gray-900 text-white text-[10px] rounded p-2 whitespace-nowrap shadow-xl">
                          {match.type === 'girls-only' && (
                            <div className="text-red-400 font-bold text-[10px] mb-1">♀ Only Girls</div>
                          )}
                          {match.type === '6vs6' && (
                            <div className="text-green-400 font-bold text-[10px] mb-1">⚽ 6 vs 6</div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{match.time}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin className="w-2.5 h-2.5" />
                            <span className="text-[9px]">{match.location}</span>
                          </div>
                          <div className="text-accent-orange font-semibold text-[9px] mt-0.5">
                            {match.availableSpots} Plätze
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ) : (
                  <div className="w-full h-full"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-center text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-accent-orange"></div>
              <span className="text-gray-600">11vs11</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-green-600"></div>
              <span className="text-gray-600">6vs6</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-red-500"></div>
              <span className="text-gray-600">Girls Only</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded bg-gray-100"></div>
              <span className="text-gray-600">Vergangen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
