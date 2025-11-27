'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMatch(formData: FormData) {
    const sportType = formData.get("sportType") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const maxPlayers = parseInt(formData.get("maxPlayers") as string);
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;

    if (!sportType || !date || !time || !location || !maxPlayers || !price) {
        throw new Error("Missing required fields");
    }

    await prisma.match.create({
        data: {
            sportType,
            date: new Date(date),
            time,
            location,
            maxPlayers,
            price,
            description,
        },
    });

    revalidatePath("/admin/matches");
    revalidatePath("/");
    redirect("/admin/matches");
}

export async function deleteMatch(id: string) {
    await prisma.match.delete({
        where: { id },
    });
    revalidatePath("/admin/matches");
}

export async function updateMatch(id: string, formData: FormData) {
    const sportType = formData.get("sportType") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const maxPlayers = parseInt(formData.get("maxPlayers") as string);
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;

    if (!sportType || !date || !time || !location || !maxPlayers || (price !== 0 && !price)) {
        throw new Error("Missing required fields");
    }

    await prisma.match.update({
        where: { id },
        data: {
            sportType,
            date: new Date(date),
            time,
            location,
            maxPlayers,
            price,
            description,
        },
    });

    revalidatePath("/admin/matches");
    revalidatePath(`/admin/matches/${id}`);
    revalidatePath("/");
    redirect("/admin/matches");
}
