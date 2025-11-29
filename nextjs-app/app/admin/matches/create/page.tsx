"use client";

import { createMatch } from "@/app/actions/matches";
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

import { SPORTS_DATA, SPORT_TYPES } from "@/lib/constants";

const FOOTBALL_MATCH_TYPES = [
    { value: "11vs11", label: "11 vs 11", maxPlayers: 22 },
    { value: "6vs6", label: "6 vs 6", maxPlayers: 12 },
    { value: "Girls Only", label: "Girls Only", maxPlayers: 12 },
];

export default function CreateMatchPage() {
    const [sport, setSport] = useState("");
    const [matchType, setMatchType] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(10);

    const handleSportChange = (value: string) => {
        setSport(value);
        setMatchType(""); // Reset match type when sport changes
        const selectedSport = SPORTS_DATA.find((s) => s.title === value);
        if (selectedSport) {
            setMaxPlayers(selectedSport.defaultMaxPlayers);
        } else {
            setMaxPlayers(10);
        }
    };

    const handleMatchTypeChange = (value: string) => {
        setMatchType(value);
        const selectedType = FOOTBALL_MATCH_TYPES.find((t) => t.value === value);
        if (selectedType) {
            setMaxPlayers(selectedType.maxPlayers);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Match</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createMatch} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sportType">Sport Type</Label>
                                <Select name="sportType" required onValueChange={handleSportChange}>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Select sport" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SPORT_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {sport === "Football" && (
                                <div className="space-y-2">
                                    <Label htmlFor="matchType">Match Type</Label>
                                    <Select name="matchType" required onValueChange={handleMatchTypeChange}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select match type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FOOTBALL_MATCH_TYPES.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input type="date" id="date" name="date" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input type="time" id="time" name="time" required />
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
                                <Input type="number" id="price" name="price" min="0" step="0.5" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="e.g. Trax Jo" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" placeholder="Additional details..." />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline">Cancel</Button>
                            <Button type="submit">Create Match</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
