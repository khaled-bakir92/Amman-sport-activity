import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SportsSection } from "@/components/sports-section";
import { PrivateLessons } from "@/components/private-lessons";
import { About } from "@/components/about";
import { Location } from "@/components/location";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

import { MatchesList } from "@/components/matches-list";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MatchesList />
        <SportsSection />
        <PrivateLessons />
        <About />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
