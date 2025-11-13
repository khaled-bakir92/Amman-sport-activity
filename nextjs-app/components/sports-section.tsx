"use client";

import { useState } from "react";
import { SportCard } from "./sports-card";
import { FootballMatchModal } from "./football-match-modal";

const sports = [
  {
    title: "Football",
    description: "Play football with us! Regular matches for all skill levels. Team spirit and fun guaranteed.",
    image: "/images/football.png",
    tags: ["Group", "Outdoor"],
  },
  {
    title: "Volleyball",
    description: "Group volleyball sessions in Amman. Perfect for social interaction and fitness.",
    image: "/images/volleyball.png",
    tags: ["Group", "Indoor/Outdoor"],
  },
  {
    title: "Kickboxing",
    description: "Intensive kickboxing training for fitness and self-defense. Private lessons also available!",
    image: "/images/Kickboxing.png",
    tags: ["Group & Private", "Indoor"],
  },
  {
    title: "Yoga",
    description: "Relaxation and flexibility through yoga sessions. For body and mind in balance.",
    image: "/images/Yoga.png",
    tags: ["Group", "Indoor"],
  },
  {
    title: "Basketball",
    description: "Dynamic basketball games with other sports enthusiasts in Amman.",
    image: "/images/basketball.png",
    tags: ["Group", "Outdoor"],
  },
  {
    title: "Gym Training",
    description: "Professional gym training with private trainers. Personalized workout plans to achieve your fitness goals.",
    image: "/images/gym.png",
    tags: ["Private & Group", "Indoor"],
  },
];

export function SportsSection() {
  const [isFootballModalOpen, setIsFootballModalOpen] = useState(false);

  const handleSportClick = (title: string) => {
    if (title === "Football") {
      setIsFootballModalOpen(true);
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
    </>
  );
}
