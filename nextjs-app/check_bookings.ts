import 'dotenv/config';
import { prisma } from './lib/prisma';

async function main() {
    try {
        console.log('Checking bookings...');
        const count = await prisma.booking.count();
        console.log(`Total bookings: ${count}`);

        if (count > 0) {
            const bookings = await prisma.booking.findMany({
                take: 5,
                select: { createdAt: true }
            });
            console.log('Sample bookings:', bookings);
        } else {
            console.log('No bookings found.');
        }
    } catch (e) {
        console.error('Error checking bookings:', e);
    }
    // No need to disconnect explicitly as the app keeps it alive, but for script it's fine.
    // Actually lib/prisma might reuse global connection.
}

main();
