const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.booking.count();
    console.log(`Total bookings: ${count}`);

    const bookings = await prisma.booking.findMany({
        take: 5,
        select: { createdAt: true }
    });
    console.log('Sample bookings:', bookings);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
