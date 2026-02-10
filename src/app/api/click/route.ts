import prisma from '../../../lib/prisma';
import { verifyJWT } from '@/lib/jwt';
import { trackOfferClick } from '@/lib/analytics';
import type { ClickRequest, ClickResponse, APIError } from '@/types/api';

// Fallback redirect URL for invalid/missing offers
const FALLBACK_REDIRECT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://stayra.com';

/**
 * POST /api/click
 * Track outbound click to partner and return redirect URL
 * 
 * Phase 2: Metasearch click tracking and partner attribution
 * 
 * ⚠️ FROZEN API CONTRACT - Do not change response shape without UI team coordination
 * 
 * @param body - ClickRequest with offerId and partnerId
 * @returns ClickResponse with redirectUrl
 */
export async function POST(request: NextRequest) {
    try {
        const body: ClickRequest = await request.json();
        const { offerId, partnerId } = body;

        // Validate required fields
        if (!offerId || !partnerId) {
            const error: APIError = {
                error: 'Missing required fields: offerId and partnerId',
                code: 'MISSING_FIELDS'
            };
            return NextResponse.json(error, { status: 400 });
        }

        // Fetch the offer
        const offer = await prisma.offer.findUnique({
            where: { id: offerId },
            include: {
                partner: true
            }
        });

        // If offer not found, return fallback URL
        if (!offer) {
            console.warn(`Click attempted for non-existent offer: ${offerId}`);
            // Return fallback instead of 404 to prevent user being stuck
            const fallbackResponse: ClickResponse = {
                redirectUrl: FALLBACK_REDIRECT_URL
            };
            return NextResponse.json(fallbackResponse);
        }

        // Verify partner matches (log mismatch but still redirect)
        if (offer.partnerId !== partnerId) {
            console.warn(`Partner mismatch: expected ${offer.partnerId}, got ${partnerId}`);
        }

        // Extract user ID from JWT if authenticated (optional)
        let userId: string | null = null;
        try {
            const authHeader = request.headers.get('authorization');
            if (authHeader?.startsWith('Bearer ')) {
                const token = authHeader.substring(7);
                const payload = verifyJWT(token);
                userId = payload.userId as string;
            }
        } catch {
            // Anonymous user - continue without userId
        }

        // Get request metadata
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Create click record (fire and forget - don't block redirect on DB)
        Promise.all([
            prisma.click.create({
                data: {
                    offerId: offerId,
                    partnerId: partnerId,
                    userId: userId,
                    hotelId: offer.hotelId,
                    ota: offer.partner.slug,
                    affiliateLink: offer.deeplink,
                    ip: ip,
                    device: userAgent
                }
            }),
            trackOfferClick({
                offerId: offerId,
                partnerId: partnerId,
                hotelId: offer.hotelId,
                price: offer.price,
                currency: offer.currency,
                userId: userId || undefined
            })
        ]).catch((error: unknown) => {
            console.error('Failed to log click:', error);
        });

        // ⚠️ Do not change response shape – UI contract
        const response: ClickResponse = {
            redirectUrl: offer.deeplink
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error tracking click:', error);
        // Return fallback URL even on error to prevent user being stuck
        const fallbackResponse: ClickResponse = {
            redirectUrl: FALLBACK_REDIRECT_URL
        };
        return NextResponse.json(fallbackResponse);
    }
}
