import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Users, Trophy, Calendar, Activity } from "lucide-react";
import { startOfDay, endOfDay, addDays, startOfWeek, endOfWeek, format, subMonths } from "date-fns";
import { ParticipantsChart } from "@/components/admin/participants-chart";
import { SportsDistributionChart } from "@/components/admin/sports-distribution-chart";

async function getDashboardStats() {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const tomorrowStart = startOfDay(addDays(now, 1));
    const tomorrowEnd = endOfDay(addDays(now, 1));
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const sixMonthsAgo = subMonths(now, 6);

    const [
        totalMatches,
        totalUsers,
        totalBookings,
        matchesToday,
        matchesTomorrow,
        matchesThisWeek,
        sportsDistribution,
        recentBookings
    ] = await Promise.all([
        prisma.match.count(),
        prisma.user.count({ where: { role: "USER" } }),
        prisma.booking.count(),
        prisma.match.findMany({
            where: { date: { gte: todayStart, lte: todayEnd } },
            include: { bookings: true },
            orderBy: { time: 'asc' }
        }),
        prisma.match.findMany({
            where: { date: { gte: tomorrowStart, lte: tomorrowEnd } },
            include: { bookings: true },
            orderBy: { time: 'asc' }
        }),
        prisma.match.findMany({
            where: { date: { gte: weekStart, lte: weekEnd } },
            include: { bookings: true },
            orderBy: { date: 'asc' }
        }),
        prisma.match.groupBy({
            by: ['sportType'],
            _count: {
                sportType: true
            }
        }),
        prisma.booking.findMany({
            where: {
                createdAt: {
                    gte: sixMonthsAgo
                }
            },
            select: { createdAt: true }
        })
    ]);

    // Process data for charts
    const sportsData = sportsDistribution.map((item: { sportType: string; _count: { sportType: number } }) => ({
        name: item.sportType,
        value: item._count.sportType
    }));

    const bookingsByMonth: Record<string, number> = {};
    recentBookings.forEach((b: { createdAt: Date }) => {
        const month = format(b.createdAt, "MMM");
        bookingsByMonth[month] = (bookingsByMonth[month] || 0) + 1;
    });

    // Generate last 6 months to ensure chart is not empty
    const participantsData = Array.from({ length: 6 }).map((_, i) => {
        const d = subMonths(new Date(), 5 - i);
        const name = format(d, "MMM");
        return {
            name,
            total: bookingsByMonth[name] || 0
        };
    });

    return {
        totalMatches,
        totalUsers,
        totalBookings,
        matchesToday,
        matchesTomorrow,
        matchesThisWeek,
        sportsData,
        participantsData
    };
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalMatches}</div>
                        <p className="text-xs text-muted-foreground">All time matches</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Players</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Registered users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalBookings}</div>
                        <p className="text-xs text-muted-foreground">Total spots booked</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Matches Today</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.matchesToday.length}</div>
                        <p className="text-xs text-muted-foreground">Scheduled for today</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <ParticipantsChart data={stats.participantsData} />
                <SportsDistributionChart data={stats.sportsData} />
            </div>

            {/* Schedule Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Today */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Today's Matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.matchesToday.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No matches today.</p>
                        ) : (
                            <div className="space-y-4">
                                {stats.matchesToday.map((match: any) => (
                                    <div key={match.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium">{match.sportType}</p>
                                            <p className="text-xs text-muted-foreground">{match.time} - {match.location}</p>
                                        </div>
                                        <div className="text-sm font-bold">
                                            {match.bookings.length}/{match.maxPlayers}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Tomorrow */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Tomorrow's Matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.matchesTomorrow.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No matches tomorrow.</p>
                        ) : (
                            <div className="space-y-4">
                                {stats.matchesTomorrow.map((match: any) => (
                                    <div key={match.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                        <div>
                                            <p className="font-medium">{match.sportType}</p>
                                            <p className="text-xs text-muted-foreground">{match.time} - {match.location}</p>
                                        </div>
                                        <div className="text-sm font-bold">
                                            {match.bookings.length}/{match.maxPlayers}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* This Week Summary */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">{stats.matchesThisWeek.length}</div>
                        <p className="text-sm text-muted-foreground">Total matches scheduled this week.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

