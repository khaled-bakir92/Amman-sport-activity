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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get month name
  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  // Calculate the start date (today) and end date (30 days from today)
  const startDate = new Date(today);
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 30);

  // Find the Monday of the week containing startDate
  const firstCalendarDate = new Date(startDate);
  const dayOfWeek = firstCalendarDate.getDay(); // 0 = Sunday
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday = 0
  firstCalendarDate.setDate(firstCalendarDate.getDate() - daysToMonday);

  // Find the Sunday of the week containing endDate
  const lastCalendarDate = new Date(endDate);
  const endDayOfWeek = lastCalendarDate.getDay();
  const daysToSunday = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
  lastCalendarDate.setDate(lastCalendarDate.getDate() + daysToSunday);

  // Generate calendar days
  const days: (Date | null)[] = [];
  const currentDay = new Date(firstCalendarDate);

  while (currentDay <= lastCalendarDate) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Check if a date has a match
  const getMatchForDate = (date: Date | null): MatchDate | undefined => {
    if (!date) return undefined;
    const dateStr = formatDate(date);
    return matches.find(match => match.date === dateStr);
  };

  // Check if date is in the past
  const isPastDate = (date: Date | null): boolean => {
    if (!date) return false;
    return date < today;
  };

  // Check if date is outside the 30-day range
  const isOutsideRange = (date: Date | null): boolean => {
    if (!date) return true;
    return date < startDate || date > endDate;
  };

  // Get header text showing the date range
  const getHeaderText = (): string => {
    const startMonth = monthNames[startDate.getMonth()];
    const endMonth = monthNames[endDate.getMonth()];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startDate.getMonth() === endDate.getMonth() && startYear === endYear) {
      return `${startMonth} ${startYear}`;
    } else if (startYear === endYear) {
      return `${startMonth} - ${endMonth} ${startYear}`;
    } else {
      return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
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
            {getHeaderText()}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {startDate.getDate()}.{startDate.getMonth() + 1}. - {endDate.getDate()}.{endDate.getMonth() + 1}.{endDate.getFullYear()}
          </p>
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
          {days.map((date, index) => {
            if (!date) return <div key={index} className="aspect-square"></div>;

            const match = getMatchForDate(date);
            const hasMatch = !!match;
            const isPast = isPastDate(date);
            const outsideRange = isOutsideRange(date);
            const isDisabled = !hasMatch || isPast || outsideRange;

            // Get color based on match type
            const getMatchColor = () => {
              if (!match || isPast || outsideRange) return '';
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
                <button
                  onClick={() => match && !isPast && !outsideRange && onDateSelect(match)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full h-full rounded transition-all duration-200 flex flex-col items-center justify-center relative group",
                    hasMatch && !isPast && !outsideRange
                      ? `${getMatchColor()} text-white hover:scale-105 shadow-sm cursor-pointer`
                      : isPast || outsideRange
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <span className={cn(
                    "text-xs font-semibold",
                    hasMatch && !isPast && !outsideRange && "text-white"
                  )}>
                    {date.getDate()}
                  </span>

                  {hasMatch && !isPast && !outsideRange && (
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
                  )}

                  {/* Hover tooltip */}
                  {hasMatch && !isPast && !outsideRange && (
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
