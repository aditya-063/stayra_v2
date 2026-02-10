import { NextResponse } from 'next/server';

/**
 * POST /api/bookings/quote
 * 
 * STATUS: NOT IMPLEMENTED (HTTP 501)
 * 
 * Future endpoint for booking quote generation.
 * This is a metasearch platform - booking capability is planned for 2+ years out.
 * 
 * TODO (Future Implementation):
 * - Validate hotel availability via partner APIs
 * - Get real-time pricing quotes
 * - Calculate total costs with taxes and fees
 * - Return quote with expiration timestamp
 * - Store quote in database for tracking
 * 
 * Expected Request Body:
 * {
 *   "hotelId": "uuid",
 *   "offerId": "uuid",
 *   "checkin": "2024-01-01",
 *   "checkout": "2024-01-05",
 *   "guests": {
 *     "adults": 2,
 *     "children": 0
 *   },
 *   "roomId": "uuid"
 * }
 */
export async function POST() {
    return NextResponse.json(
        {
            error: 'Not Implemented',
            message: 'Booking functionality is not yet available. This is a metasearch platform that redirects to partner sites for bookings.'
        },
        { status: 501 }
    );
}
