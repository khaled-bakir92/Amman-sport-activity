"use client";

import { updateMatch } from "@/app/actions/matches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
// import { Match } from "@prisma/client";

interface EditMatchFormProps {
    match: any;
}

export default function EditMatchForm({ match }: EditMatchFormProps) {
    const [sport, setSport] = useState(match.sportType);
    const [maxPlayers, setMaxPlayers] = useState(match.maxPlayers);

    const handleSportChange = (value: string) => {
        setSport(value);
        switch (value) {
            case "Football":
                setMaxPlayers(10);
                break;
            case "Volleyball":
                setMaxPlayers(12);
                break;
            case "Basketball":
                setMaxPlayers(10);
                break;
            case "Padel":
                setMaxPlayers(4);
                break;
            case "Tennis":
                setMaxPlayers(2);
                break;
            default:
                setMaxPlayers(10);
        }
    };

    const updateMatchWithId = updateMatch.bind(null, match.id);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Match</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={updateMatchWithId} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sportType">Sport Type</Label>
                            <Select name="sportType" required value={sport} onValueChange={handleSportChange}>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select sport" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Football">Football</SelectItem>
                                    <SelectItem value="Volleyball">Volleyball</SelectItem>
                                    <SelectItem value="Basketball">Basketball</SelectItem>
                                    <SelectItem value="Padel">Padel</SelectItem>
                                    <SelectItem value="Tennis">Tennis</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                type="date"
                                id="date"
                                name="date"
                                required
                                defaultValue={new Date(match.date).toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                type="time"
                                id="time"
                                name="time"
                                required
                                defaultValue={match.time}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxPlayers">Max Players</Label>
                            <Input
                                type="number"
                                id="maxPlayers"
                                name="maxPlayers"
                                min="2"
                                required
                                value={maxPlayers}
                                onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price (JOD)</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                min="0"
                                step="0.5"
                                required
                                defaultValue={match.price}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="e.g. Trax Jo"
                                required
                                defaultValue={match.location}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Additional details..."
                            defaultValue={match.description || ""}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="submit">Update Match</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
