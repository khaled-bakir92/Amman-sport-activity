import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Personal Training",
    description: "One-on-one coaching for rapid progress",
  },
  {
    title: "Flexible Schedule",
    description: "Sessions according to your availability",
  },
  {
    title: "All Levels",
    description: "From beginner to advanced",
  },
  {
    title: "Individual Goals",
    description: "Fitness, self-defense or competition",
  },
];

export function PrivateLessons() {
  return (
    <section id="private" className="mx-auto max-w-7xl px-8 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-accent-orange to-orange-600 text-white p-12 md:p-16 text-center shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          🥊 Private Kickboxing Lessons
        </h2>
        <p className="text-xl mb-12 opacity-95">
          Individual training for maximum results - tailored specifically to your goals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
            >
              <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>

        <Button
          asChild
          size="lg"
          className="bg-white text-accent-orange hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-bold shadow-lg"
        >
          <Link href="#contact">Book Private Lesson</Link>
        </Button>
      </div>
    </section>
  );
}
