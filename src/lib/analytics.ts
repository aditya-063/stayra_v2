/**
 * Analytics Utility for Stayra
 * 
 * Server-side analytics tracking using PostHog.
 * Falls back gracefully if PostHog is not configured.
 * 
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   await trackEvent('search_performed', { city: 'Paris' }, userId);
 */

import type { AnalyticsEvent, AnalyticsPayload } from '@/types/api';

// PostHog client (lazy initialized)
let posthogClient: any = null;

/**
 * Initialize PostHog client if configured
 */
async function getPostHogClient() {
    if (posthogClient !== null) return posthogClient;

    const apiKey = process.env.POSTHOG_API_KEY;
    if (!apiKey) {
        posthogClient = false; // Mark as disabled
        return null;
    }

    try {
        const { PostHog } = await import('posthog-node');
        posthogClient = new PostHog(apiKey, {
            host: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
            flushAt: 1, // Send events immediately in serverless
            flushInterval: 0,
        });
        return posthogClient;
    } catch {
        console.warn('PostHog not installed - analytics disabled');
        posthogClient = false;
        return null;
    }
}

/**
 * Track an analytics event
 * 
 * @param event - Event name (e.g., 'search_performed', 'offer_clicked')
 * @param properties - Event properties
 * @param userId - Optional user ID (defaults to 'anonymous')
 */
export async function trackEvent(
    event: AnalyticsEvent,
    properties: Record<string, any> = {},
    userId?: string
): Promise<void> {
    const client = await getPostHogClient();
    if (!client) return; // Analytics disabled

    try {
        client.capture({
            distinctId: userId || `anon_${Date.now()}`,
            event,
            properties: {
                ...properties,
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development',
            },
        });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        // Don't throw - analytics should never break the app
    }
}

/**
 * Track search event
 */
export async function trackSearch(params: {
    city: string;
    checkin?: string;
    checkout?: string;
    guests?: number;
    resultCount: number;
    userId?: string;
}): Promise<void> {
    await trackEvent('search_performed', {
        search_city: params.city,
        search_checkin: params.checkin,
        search_checkout: params.checkout,
        search_guests: params.guests,
        result_count: params.resultCount,
    }, params.userId);
}

/**
 * Track hotel view event
 */
export async function trackHotelView(params: {
    hotelId: string;
    hotelName?: string;
    city?: string;
    userId?: string;
}): Promise<void> {
    await trackEvent('hotel_viewed', {
        hotel_id: params.hotelId,
        hotel_name: params.hotelName,
        city: params.city,
    }, params.userId);
}

/**
 * Track offer click event
 */
export async function trackOfferClick(params: {
    offerId: string;
    partnerId: string;
    hotelId: string;
    price?: number;
    currency?: string;
    userId?: string;
}): Promise<void> {
    await trackEvent('offer_clicked', {
        offer_id: params.offerId,
        partner_id: params.partnerId,
        hotel_id: params.hotelId,
        click_price: params.price,
        click_currency: params.currency,
    }, params.userId);
}

/**
 * Shutdown analytics (call on app shutdown)
 */
export async function shutdownAnalytics(): Promise<void> {
    const client = await getPostHogClient();
    if (client && typeof client.shutdown === 'function') {
        await client.shutdown();
    }
}
