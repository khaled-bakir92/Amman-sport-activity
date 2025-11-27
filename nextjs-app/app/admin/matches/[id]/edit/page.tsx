import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMatchForm from "./edit-form";

export default async function EditMatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const match = await prisma.match.findUnique({
        where: { id },
    });

    if (!match) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <EditMatchForm match={match} />
        </div>
    );
}
