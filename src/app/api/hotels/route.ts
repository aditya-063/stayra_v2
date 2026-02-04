
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

// Ideally instantiate this in a singleton file (lib/prisma.ts) for Next.js HMR best practices, 
// but for this task putting it here is acceptable.
const prisma = process.env.DATABASE_URL
    ? new PrismaClient()
    : null;

export async function GET() {
    try {
        if (!prisma) {
            console.warn("Database not configured (DATABASE_URL missing).");
            return NextResponse.json({ error: "Database not configured" }, { status: 500 });
        }

        const hotels = await prisma.hotel.findMany({
            include: {
                images: true,
                roomTypes: {
                    include: {
                        rates: true
                    }
                },
                amenities: {
                    include: {
                        amenity: true
                    }
                }
            }
        })

        // Transform data to match frontend expectation (similar to mockData structure)
        // The frontend expects:
        // canonicalName, city, etc.
        // roomOptions: { type, prices: [] }
        // amenities: string[]

        const transformed = hotels.map(hotel => ({
            id: hotel.id,
            canonicalName: hotel.canonicalName,
            normalizedName: hotel.normalizedName,
            slug: hotel.slug,
            address: hotel.address,
            city: hotel.city,
            country: hotel.country,
            starRating: hotel.starRating,
            propertyType: hotel.propertyType,
            description: hotel.description,
            primaryImageUrl: hotel.primaryImageUrl,
            reviewScore: Number(hotel.reviewScore), // Decimal to Number
            reviewCount: hotel.reviewCount,
            qualityScore: hotel.qualityScore,

            // Flatten amenities
            amenities: hotel.amenities.map(ha => ha.amenity.name),

            // Transform rooms
            roomOptions: hotel.roomTypes.map(rt => ({
                id: rt.id,
                type: rt.canonicalName,
                bedConfig: rt.bedConfiguration,
                sizeSqft: rt.roomSizeSqft,
                maxGuests: rt.maxGuests,
                prices: rt.rates.map(rate => ({
                    ota: rate.otaName,
                    totalPrice: Number(rate.basePrice),
                    currency: rate.currency,
                    deepLink: rate.bookingUrl,
                }))
            }))
        }))

        return NextResponse.json(transformed)
    } catch (error) {
        console.error("Failed to fetch hotels:", error)
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}
