import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { deleteMatch } from "@/app/actions/matches";

export default async function MatchesPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = Number(searchParams.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const [matches, totalMatches] = await Promise.all([
        prisma.match.findMany({
            orderBy: { date: 'desc' },
            include: { bookings: true },
            skip,
            take: pageSize,
        }),
        prisma.match.count(),
    ]);

    const totalPages = Math.ceil(totalMatches / pageSize);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Matches</h2>
                <Link href="/admin/matches/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Match
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sport</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Players</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matches.map((match: any) => (
                            <TableRow key={match.id}>
                                <TableCell className="font-medium">{match.sportType}</TableCell>
                                <TableCell>{match.date.toLocaleDateString()}</TableCell>
                                <TableCell>{match.time}</TableCell>
                                <TableCell>{match.location}</TableCell>
                                <TableCell>{match.price} {match.currency}</TableCell>
                                <TableCell>
                                    {match.bookings.length} / {match.maxPlayers}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/matches/${match.id}/edit`}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <form action={deleteMatch.bind(null, match.id)}>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {matches.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No matches found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-end space-x-2">
                <div className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                </div>
                <div className="space-x-2">
                    <Link href={`/admin/matches?page=${page - 1}`} passHref>
                        <Button variant="outline" size="sm" disabled={page <= 1}>
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>
                    </Link>
                    <Link href={`/admin/matches?page=${page + 1}`} passHref>
                        <Button variant="outline" size="sm" disabled={page >= totalPages}>
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
