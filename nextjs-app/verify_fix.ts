import { format, subMonths } from "date-fns";

const bookingsByMonth: Record<string, number> = {};
// Simulate no bookings
// bookingsByMonth["Nov"] = 1; 

const participantsData = Array.from({ length: 6 }).map((_, i) => {
    const d = subMonths(new Date(), 5 - i);
    const name = format(d, "MMM");
    return {
        name,
        total: bookingsByMonth[name] || 0
    };
});

console.log(participantsData);
