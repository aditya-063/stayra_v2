import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { trackSearch } from '@/lib/analytics';
import type { SearchResponse, SearchHotel, SearchOffer, APIError } from '@/types/api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/hotels/search
 * Search hotels by city and dates
 * 
 * ⚠️ FROZEN API CONTRACT - Do not change response shape without UI team coordination
 * 
 * @param city - Required city name
 * @param checkin - Optional check-in date (ISO)
 * @param checkout - Optional check-out date (ISO)
 * @param guests - Optional guest count (default: 2)
 * @returns SearchResponse with hotels array
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city') || '';
        const checkin = searchParams.get('checkin') || '';
        const checkout = searchParams.get('checkout') || '';
        const guests = parseInt(searchParams.get('guests') || '2');

        if (!city) {
            const error: APIError = {
                error: 'City parameter is required',
                code: 'MISSING_CITY'
            };
            return NextResponse.json(error, { status: 400 });
        }

        // Parse dates
        const checkinDate = checkin ? new Date(checkin) : new Date();
        const checkoutDate = checkout
            ? new Date(checkout)
            : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // +3 days

        // Fetch active partners for display names
        const partners = await prisma.partner.findMany({
            where: { isActive: true },
            select: { id: true, name: true, slug: true }
        });
        const partnerMap = new Map(partners.map(p => [p.slug, p.name]));

        // Search hotels in the city
        const hotels = await prisma.hotel.findMany({
            where: {
                city: {
                    contains: city,
                    mode: 'insensitive',
                },
            },
            include: {
                roomTypes: {
                    include: {
                        rates: {
                            where: {
                                checkin: {
                                    gte: checkinDate,
                                    lte: new Date(checkinDate.getTime() + 7 * 24 * 60 * 60 * 1000),
                                },
                            },
                            orderBy: {
                                basePrice: 'asc',
                            },
                        },
                    },
                },
            },
            take: 20,
        });

        // Format response
        const results: SearchHotel[] = hotels.map((hotel) => {
            const allRates = hotel.roomTypes.flatMap((rt) => rt.rates);

            // Group rates by partner
            const offersByPartner: Record<string, SearchOffer> = {};
            allRates.forEach((rate) => {
                if (!offersByPartner[rate.otaName] || rate.basePrice < offersByPartner[rate.otaName].price) {
                    offersByPartner[rate.otaName] = {
                        partner: rate.otaName,
                        partnerName: partnerMap.get(rate.otaName) || rate.otaName,
                        roomType: 'Deluxe King Room',
                        price: Number(rate.basePrice),
                        currency: rate.currency,
                        taxes: Number(rate.taxes || 0),
                        totalPrice: Number(rate.basePrice) + Number(rate.taxes || 0),
                        cancellation: rate.refundable
                            ? 'Free cancellation'
                            : 'Non-refundable',
                        refundable: rate.refundable,
                        deeplink: `/api/partners/${rate.otaName}/redirect/${hotel.id}`,
                    };
                }
            });

            const offers = Object.values(offersByPartner);
            const lowestOffer = offers.length > 0
                ? offers.reduce((min, offer) => (offer.price < min.price ? offer : min))
                : null;

            return {
                hotelId: hotel.id,
                name: hotel.canonicalName,
                slug: hotel.slug,
                rating: Number(hotel.reviewScore) || 4.0,
                reviewCount: hotel.reviewCount || 0,
                starRating: hotel.starRating,
                city: hotel.city,
                country: hotel.country,
                primaryImage: hotel.primaryImageUrl || '/images/hotel-placeholder.jpg',
                description: hotel.description,
                propertyType: hotel.propertyType,
                lowestPrice: lowestOffer
                    ? {
                        amount: lowestOffer.price,
                        currency: lowestOffer.currency,
                        partner: lowestOffer.partner,
                    }
                    : null,
                offers: offers.sort((a, b) => a.price - b.price),
            };
        });

        // Sort hotels by lowest price
        results.sort((a, b) => {
            if (!a.lowestPrice) return 1;
            if (!b.lowestPrice) return -1;
            return a.lowestPrice.amount - b.lowestPrice.amount;
        });

        // Track search analytics (fire and forget)
        trackSearch({
            city,
            checkin: checkinDate.toISOString().split('T')[0],
            checkout: checkoutDate.toISOString().split('T')[0],
            guests,
            resultCount: results.length
        }).catch(() => { /* ignore analytics errors */ });

        // ⚠️ Do not change response shape – UI contract
        const response: SearchResponse = {
            searchId: `s_${Date.now()}`,
            city,
            checkin: checkinDate.toISOString().split('T')[0],
            checkout: checkoutDate.toISOString().split('T')[0],
            guests,
            count: results.length,
            hotels: results,
        };

        return NextResponse.json(response);
    } catch (error: unknown) {
        console.error('Hotel search error:', error);
        const errorResponse: APIError = {
            error: 'Failed to search hotels',
            code: 'SEARCH_ERROR'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
