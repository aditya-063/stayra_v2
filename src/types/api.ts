/**
 * API Type Definitions for Stayra
 * ⚠️ FROZEN API CONTRACT - Do not change response shapes without UI team coordination
 * 
 * These types define the contract between backend API and frontend UI.
 * Any changes require:
 * 1. UI team notification
 * 2. Version bumping
 * 3. Migration period for deprecated fields
 */

// ============================================================
// OFFER TYPES
// ============================================================

/**
 * Individual hotel offer from a partner
 * ⚠️ Do not change field names – UI contract
 */
export interface HotelOffer {
    id: string;
    partnerId: string;
    partnerName: string;
    partnerSlug: string;
    partnerLogo: string | null;
    roomName: string | null;
    price: number;
    currency: string;
    refundable: boolean;
    cancellation: string | null;
    deeplink: string;
    fetchedAt: string; // ISO 8601 datetime
}

/**
 * Response from GET /api/hotels/[hotelId]/offers
 * ⚠️ Do not change response shape – UI contract
 */
export interface OfferResponse {
    hotelId: string;
    offers: HotelOffer[];
}

// ============================================================
// CLICK TYPES
// ============================================================

/**
 * Request body for POST /api/click
 */
export interface ClickRequest {
    offerId: string;
    partnerId: string;
}

/**
 * Response from POST /api/click
 * ⚠️ Do not change response shape – UI contract
 */
export interface ClickResponse {
    redirectUrl: string;
}

// ============================================================
// SEARCH TYPES
// ============================================================

/**
 * Individual hotel in search results
 * ⚠️ Do not change field names – UI contract
 */
export interface SearchHotel {
    hotelId: string;
    name: string;
    slug: string;
    rating: number;
    reviewCount: number;
    starRating: number;
    city: string;
    country: string;
    primaryImage: string;
    description: string | null;
    propertyType: string;
    lowestPrice: {
        amount: number;
        currency: string;
        partner: string;
    } | null;
    offers: SearchOffer[];
}

/**
 * Offer in search results (simplified)
 */
export interface SearchOffer {
    partner: string;
    partnerName: string;
    roomType: string;
    price: number;
    currency: string;
    taxes: number;
    totalPrice: number;
    cancellation: string;
    refundable: boolean;
    deeplink: string;
}

/**
 * Response from GET /api/hotels/search
 * ⚠️ Do not change response shape – UI contract
 */
export interface SearchResponse {
    searchId: string;
    city: string;
    checkin: string;
    checkout: string;
    guests: number;
    count: number;
    hotels: SearchHotel[];
}

// ============================================================
// ERROR TYPES
// ============================================================

/**
 * Standard API error response
 */
export interface APIError {
    error: string;
    message?: string;
    code?: string;
}

// ============================================================
// BOOKING TYPES (Stubs - HTTP 501)
// ============================================================

/**
 * Future booking quote request
 * Currently returns HTTP 501
 */
export interface BookingQuoteRequest {
    hotelId: string;
    offerId: string;
    checkin: string;
    checkout: string;
    guests: {
        adults: number;
        children: number;
    };
    roomId?: string;
}

/**
 * Future booking confirm request
 * Currently returns HTTP 501
 */
export interface BookingConfirmRequest {
    quoteId: string;
    guestInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    paymentMethod: {
        type: string;
        token: string;
    };
}

/**
 * Not Implemented response for booking endpoints
 */
export interface NotImplementedResponse {
    error: 'Not Implemented';
    message: string;
}

// ============================================================
// PARTNER TYPES
// ============================================================

/**
 * Partner entity from database
 */
export interface Partner {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    bookingType: 'redirect' | 'api';
    baseUrl: string | null;
    isActive: boolean;
    priority: number;
}

// ============================================================
// ANALYTICS EVENT TYPES
// ============================================================

/**
 * Analytics event types for tracking
 */
export type AnalyticsEvent =
    | 'search_performed'
    | 'hotel_viewed'
    | 'offer_clicked'
    | 'redirect_success'
    | 'login_success'
    | 'signup_success';

/**
 * Analytics event payload
 */
export interface AnalyticsPayload {
    event: AnalyticsEvent;
    userId?: string;
    hotelId?: string;
    partnerId?: string;
    searchCity?: string;
    [key: string]: any;
}
