import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import type { OfferResponse, HotelOffer, APIError } from '@/types/api';

/**
 * GET /api/hotels/[hotelId]/offers
 * Fetch normalized offers for a specific hotel from all active partners
 * 
 * Phase 2: Metasearch price comparison
 * 
 * ⚠️ FROZEN API CONTRACT - Do not change response shape without UI team coordination
 * 
 * @param hotelId - Hotel UUID
 * @returns OfferResponse with array of HotelOffer objects
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { hotelId: string } }
) {
    try {
        const { hotelId } = params;

        // Validate hotelId format (UUID v4)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!hotelId || !uuidRegex.test(hotelId)) {
            const error: APIError = {
                error: 'Invalid hotel ID format',
                code: 'INVALID_HOTEL_ID'
            };
            return NextResponse.json(error, { status: 400 });
        }

        // Fetch offers for the hotel from active partners only
        const offers = await prisma.offer.findMany({
            where: {
                hotelId: hotelId,
                partner: {
                    isActive: true
                }
            },
            include: {
                partner: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        logo: true
                    }
                }
            },
            orderBy: {
                price: 'asc' // Cheapest first
            }
        });

        // ⚠️ Do not change response shape – UI contract
        const response: OfferResponse = {
            hotelId,
            offers: offers.map((offer): HotelOffer => ({
                id: offer.id,
                partnerId: offer.partnerId,
                partnerName: offer.partner.name,
                partnerSlug: offer.partner.slug,
                partnerLogo: offer.partner.logo,
                roomName: offer.roomName,
                price: offer.price,
                currency: offer.currency,
                refundable: offer.refundable,
                cancellation: offer.cancellation,
                deeplink: offer.deeplink,
                fetchedAt: offer.fetchedAt.toISOString()
            }))
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching offers:', error);
        const errorResponse: APIError = {
            error: 'Failed to fetch offers',
            code: 'INTERNAL_ERROR'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
