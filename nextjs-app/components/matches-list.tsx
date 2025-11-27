import { prisma } from "@/lib/prisma";
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
        take: 6,
    });
}

export async function MatchesList() {
    const matches = await getUpcomingMatches();

    if (matches.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-8 py-16 bg-gray-50 dark:bg-gray-900">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary-navy mb-4">Upcoming Matches</h2>
                <p className="text-lg text-gray-600">
                    Join one of our scheduled games and meet new players!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matches.map((match: any) => (
                    <Card key={match.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-2 bg-primary" /> {/* Color strip based on sport? */}
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-bold">{match.sportType}</CardTitle>
                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                    {match.bookings.length}/{match.maxPlayers} Players
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="flex items-center text-gray-600">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>{format(new Date(match.date), "EEEE, MMMM d, yyyy")}</span>
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
                                <span>{match.price} JOD</span>
                            </div>
                            {match.description && (
                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                    {match.description}
                                </p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Book Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
