"use client";

import { useState } from "react";
import { SportCard } from "./sports-card";
import { FootballMatchModal } from "./football-match-modal";
import { VolleyballMatchModal } from "./volleyball-match-modal";
import { BasketballMatchModal } from "./basketball-match-modal";
import { KickboxingModal } from "./kickboxing-modal";

import { SPORTS_DATA } from "@/lib/constants";

const sports = SPORTS_DATA;

export function SportsSection() {
  const [isFootballModalOpen, setIsFootballModalOpen] = useState(false);
  const [isVolleyballModalOpen, setIsVolleyballModalOpen] = useState(false);
  const [isBasketballModalOpen, setIsBasketballModalOpen] = useState(false);
  const [isKickboxingModalOpen, setIsKickboxingModalOpen] = useState(false);

  const handleSportClick = (title: string) => {
    if (title === "Football") {
      setIsFootballModalOpen(true);
    } else if (title === "Volleyball") {
      setIsVolleyballModalOpen(true);
    } else if (title === "Basketball") {
      setIsBasketballModalOpen(true);
    } else if (title === "Kickboxing") {
      setIsKickboxingModalOpen(true);
    }
  };

  return (
    <>
      <section id="sports" className="mx-auto max-w-7xl px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-navy mb-4">Our Sports</h2>
          <p className="text-lg text-gray-600">
            We organize regular group activities for all fitness levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport) => (
            <SportCard
              key={sport.title}
              {...sport}
              onClick={() => handleSportClick(sport.title)}
            />
          ))}
        </div>
      </section>

      <FootballMatchModal
        isOpen={isFootballModalOpen}
        onClose={() => setIsFootballModalOpen(false)}
      />
      <VolleyballMatchModal
        isOpen={isVolleyballModalOpen}
        onClose={() => setIsVolleyballModalOpen(false)}
      />
      <BasketballMatchModal
        isOpen={isBasketballModalOpen}
        onClose={() => setIsBasketballModalOpen(false)}
      />
      <KickboxingModal
        isOpen={isKickboxingModalOpen}
        onClose={() => setIsKickboxingModalOpen(false)}
      />
    </>
  );
}
