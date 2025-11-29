import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const now = new Date();
        const matches = await prisma.match.findMany({
            where: {
                sportType: "Football",
                date: {
                    gte: now,
                },
            },
            orderBy: {
                date: "asc",
            },
            include: {
                bookings: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        // Transform matches to calendar format
        const formattedMatches = matches.map((match) => {
            // Convert matchType to calendar type
            let calendarType: 'regular' | 'girls-only' | '6vs6' = 'regular';
            if (match.matchType === 'Girls Only') {
                calendarType = 'girls-only';
            } else if (match.matchType === '6vs6') {
                calendarType = '6vs6';
            }

            return {
                id: match.id,
                date: match.date.toISOString().split('T')[0], // YYYY-MM-DD format
                time: match.time,
                location: match.location,
                availableSpots: match.maxPlayers - match.bookings.length,
                maxPlayers: match.maxPlayers,
                type: calendarType,
                matchType: match.matchType,
                price: match.price,
                bookings: match.bookings.map(booking => ({
                    userId: booking.userId,
                    userName: booking.user.name,
                    status: booking.status,
                })),
            };
        });

        return NextResponse.json(formattedMatches);
    } catch (error) {
        console.error("Error fetching football matches:", error);
        return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
    }
}
