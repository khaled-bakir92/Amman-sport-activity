import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, DollarSign } from "lucide-react";
import { format } from "date-fns";

async function getUpcomingMatches() {
  const now = new Date();
  return await prisma.match.findMany({
    where: {
      date: {
        gte: now,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      bookings: true,
    },
  });
}

export default async function UpcomingPage() {
  const matches = await getUpcomingMatches();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-navy to-primary-blue text-white py-16">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="text-5xl font-bold mb-4">Upcoming Matches</h1>
          <p className="text-xl text-gray-200">
            Alle geplanten Spiele - Wähle ein Match und melde dich an!
          </p>
        </div>
      </section>

      {/* Matches Grid */}
      <section className="mx-auto max-w-7xl px-8 py-16">
        {matches.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Aktuell sind keine Matches geplant.
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500 mt-4">
              Schau später wieder vorbei!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((match) => (
              <Card key={match.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-2 bg-gradient-to-r from-primary-navy to-accent-orange" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{match.sportType}</CardTitle>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {match.bookings.length}/{match.maxPlayers} Spieler
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(new Date(match.date), "EEEE, d. MMMM yyyy")}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{match.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>{match.price} {match.currency}</span>
                  </div>
                  {match.description && (
                    <p className="text-sm text-gray-500 mt-2">
                      {match.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-accent-orange hover:bg-accent-orange/90">
                    Jetzt buchen
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
    <Footer />
    </>
  );
}
