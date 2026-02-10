import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const partners = [
    {
        id: 'booking',
        name: 'Booking.com',
        slug: 'booking',
        logo: '🏨',
        bookingType: 'redirect',
        baseUrl: 'https://www.booking.com',
        isActive: true,
        priority: 1
    },
    {
        id: 'agoda',
        name: 'Agoda',
        slug: 'agoda',
        logo: '🌐',
        bookingType: 'redirect',
        baseUrl: 'https://www.agoda.com',
        isActive: true,
        priority: 2
    },
    {
        id: 'expedia',
        name: 'Expedia',
        slug: 'expedia',
        logo: '✈️',
        bookingType: 'redirect',
        baseUrl: 'https://www.expedia.com',
        isActive: true,
        priority: 3
    },
    {
        id: 'makemytrip',
        name: 'MakeMyTrip',
        slug: 'makemytrip',
        logo: '🧳',
        bookingType: 'redirect',
        baseUrl: 'https://www.makemytrip.com',
        isActive: true,
        priority: 4
    },
    {
        id: 'oyo',
        name: 'OYO',
        slug: 'oyo',
        logo: '🏢',
        bookingType: 'redirect',
        baseUrl: 'https://www.oyorooms.com',
        isActive: true,
        priority: 5
    },
    {
        id: 'goibibo',
        name: 'Goibibo',
        slug: 'goibibo',
        logo: '🚀',
        bookingType: 'redirect',
        baseUrl: 'https://www.goibibo.com',
        isActive: true,
        priority: 6
    }
];

async function main() {
    console.log('Seeding partners...');

    for (const partner of partners) {
        await prisma.partner.upsert({
            where: { id: partner.id },
            update: partner,
            create: partner
        });
        console.log(`✓ ${partner.name}`);
    }

    console.log('Partner seeding complete!');
}

main()
    .catch((e) => {
        console.error('Error seeding partners:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
