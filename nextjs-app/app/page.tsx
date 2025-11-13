import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SportsSection } from "@/components/sports-section";
import { PrivateLessons } from "@/components/private-lessons";
import { About } from "@/components/about";
import { Location } from "@/components/location";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
