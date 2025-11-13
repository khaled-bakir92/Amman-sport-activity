import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-dark-navy text-white py-16 md:py-24 text-center px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Get Active Together in Amman
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-95">
          Experience fun, fitness and community through various sports activities
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent-orange hover:bg-accent-orange/90 text-white rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <Link href="#contact">Join Us Now!</Link>
        </Button>
      </div>
    </section>
  );
}
