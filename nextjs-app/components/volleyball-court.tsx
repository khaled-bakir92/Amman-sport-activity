"use client";

interface VolleyballCourtProps {
  bookedPositions: number[];
  onPositionClick: (positionId: number) => void;
}

export function VolleyballCourt({ bookedPositions, onPositionClick }: VolleyballCourtProps) {
  // 18 positions: 6 left team, 6 right team, 6 substitutes
  const positions = Array.from({ length: 18 }, (_, i) => i + 1);

  const getPositionStyle = (positionId: number): React.CSSProperties => {
    // Left team (positions 1-6): standard 3-2-1 formation
    if (positionId === 1) return { gridColumn: 1, gridRow: 1 };
    if (positionId === 2) return { gridColumn: 2, gridRow: 1 };
    if (positionId === 3) return { gridColumn: 3, gridRow: 1 };
    if (positionId === 4) return { gridColumn: 1, gridRow: 2 };
    if (positionId === 5) return { gridColumn: 2, gridRow: 2 };
    if (positionId === 6) return { gridColumn: 3, gridRow: 2 };

    // Right team (positions 7-12): standard 3-2-1 formation
    if (positionId === 7) return { gridColumn: 5, gridRow: 1 };
    if (positionId === 8) return { gridColumn: 6, gridRow: 1 };
    if (positionId === 9) return { gridColumn: 7, gridRow: 1 };
    if (positionId === 10) return { gridColumn: 5, gridRow: 2 };
    if (positionId === 11) return { gridColumn: 6, gridRow: 2 };
    if (positionId === 12) return { gridColumn: 7, gridRow: 2 };

    // Substitutes (positions 13-18) - placed below the court
    return { gridColumn: positionId - 12, gridRow: 3 };
  };

  const getTeamColor = (positionId: number): string => {
    if (positionId <= 6) return "#1e3a8a"; // Left team - blue
    if (positionId <= 12) return "#ea580c"; // Right team - orange
    return "#16a34a"; // Substitutes - green
  };

  const isBooked = (positionId: number) => bookedPositions.includes(positionId);

  return (
    <div className="w-full mx-auto">
      {/* Court Container */}
      <div className="relative bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 md:border-4 border-orange-300">
        {/* Court Grid */}
        <div
          className="grid gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 relative"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            minHeight: "200px"
          }}
        >
          {/* Court Divider Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-white/60 transform -translate-x-1/2"
            style={{ zIndex: 0 }}
          />

          {/* Left Court Area Label */}
          <div
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-blue-900/20 font-bold text-xs sm:text-lg md:text-2xl lg:text-4xl select-none pointer-events-none"
            style={{ zIndex: 0 }}
          >
            TEAM 1
          </div>

          {/* Right Court Area Label */}
          <div
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-orange-900/20 font-bold text-xs sm:text-lg md:text-2xl lg:text-4xl select-none pointer-events-none"
            style={{ zIndex: 0 }}
          >
            TEAM 2
          </div>

          {/* Players 1-12 on the court */}
          {positions.slice(0, 12).map((positionId) => {
            const style = getPositionStyle(positionId);
            const teamColor = getTeamColor(positionId);
            const booked = isBooked(positionId);

            return (
              <div
                key={positionId}
                style={style}
                className="flex items-center justify-center relative z-10"
              >
                <button
                  onClick={() => booked && onPositionClick(positionId)}
                  disabled={!booked}
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
                    rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm
                    transition-all duration-300 transform relative
                    ${booked
                      ? 'cursor-pointer hover:scale-110 shadow-lg active:scale-95'
                      : 'cursor-not-allowed opacity-30 border border-dashed sm:border-2'
                    }
                  `}
                  style={{
                    backgroundColor: booked ? teamColor : 'transparent',
                    borderColor: !booked ? teamColor : 'transparent',
                  }}
                  aria-label={`Position ${positionId}`}
                >
                  {booked && (
                    <>
                      {/* Player icon */}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      {/* Position number badge */}
                      <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-md" style={{ color: teamColor }}>
                        {positionId}
                      </span>
                    </>
                  )}
                  {!booked && (
                    <span className="text-[10px] sm:text-xs" style={{ color: teamColor }}>{positionId}</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Substitutes Section */}
        <div className="border-t-2 md:border-t-4 border-dashed border-orange-300/50 pt-3 sm:pt-4 md:pt-6">
          <h4 className="text-center text-xs sm:text-sm font-semibold text-green-700 mb-2 sm:mb-3 md:mb-4">
            ERSATZSPIELER (SUBSTITUTES)
          </h4>
          <div
            className="grid gap-2 sm:gap-3 md:gap-4"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              gridTemplateRows: "1fr",
            }}
          >
            {positions.slice(12, 18).map((positionId) => {
              const teamColor = getTeamColor(positionId);
              const booked = isBooked(positionId);

              return (
                <div
                  key={positionId}
                  className="flex items-center justify-center"
                >
                  <button
                    onClick={() => booked && onPositionClick(positionId)}
                    disabled={!booked}
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
                      rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm
                      transition-all duration-300 transform relative
                      ${booked
                        ? 'cursor-pointer hover:scale-110 shadow-lg active:scale-95'
                        : 'cursor-not-allowed opacity-30 border border-dashed sm:border-2'
                      }
                    `}
                    style={{
                      backgroundColor: booked ? teamColor : 'transparent',
                      borderColor: !booked ? teamColor : 'transparent',
                    }}
                    aria-label={`Substitute ${positionId}`}
                  >
                    {booked && (
                      <>
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-md" style={{ color: teamColor }}>
                          {positionId}
                        </span>
                      </>
                    )}
                    {!booked && (
                      <span className="text-[10px] sm:text-xs" style={{ color: teamColor }}>{positionId}</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-900"></div>
          <span className="text-gray-700">Team 1</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-orange-600"></div>
          <span className="text-gray-700">Team 2</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-green-600"></div>
          <span className="text-gray-700">Ersatz</span>
        </div>
      </div>
    </div>
  );
}
