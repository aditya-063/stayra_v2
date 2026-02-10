# Stayra Manual Sanity Test Checklist

Run this checklist before every production release.

**Tester:** ____________________
**Date:** ____________________
**Version:** ____________________

---

## 1. Homepage & Search (`/`)

- [ ] **Load**: Homepage loads without layout shift.
- [ ] **Animation**: Flowing wave background renders smoothly.
- [ ] **Search**:
  - [ ] Enter "London" in destination.
  - [ ] Select future dates (Check-in/Check-out).
  - [ ] Click "Search".
  - [ ] **Result**: Redirects to `/search?city=London...` with results.
- [ ] **Empty Search**:
  - [ ] Click "Search" without destination.
  - [ ] **Result**: Input highlights or error toast appears (if implemented).

## 2. Search Results (`/search`)

- [ ] **Results List**: Hotel cards display with images, names, and prices.
- [ ] **Price Check**: Prices look realistic (not $0 or NuN).
- [ ] **Sorting**:
  - [ ] Change sort to "Price: Low to High".
  - [ ] **Result**: Order updates correctly.
- [ ] **Filtering**:
  - [ ] Filter by 4+ stars.
  - [ ] **Result**: List updates to show only 4+ star hotels.

## 3. Hotel Details (`/hotels/[id]`)

- [ ] **Load**: Page loads hotel images, description, and list of offers.
- [ ] **Offers**:
  - [ ] At least one offer displayed (if hotel has partners).
  - [ ] Partner logos loaded (Booking.com, Agoda, etc.).
- [ ] **Click Tracking**:
  - [ ] Click "View Deal" on an offer.
  - [ ] **Result**: Opens new tab to partner site.
  - [ ] **Verification**: Partner site URL contains affiliate parameters.

## 4. Authentication

- [ ] **Sign Up (`/signup`)**:
  - [ ] Create new account with email/password.
  - [ ] **Result**: Successful creation and redirect to dashboard.
- [ ] **Login (`/login`)**:
  - [ ] Login with created account.
  - [ ] **Result**: Successful login.
  - [ ] Login with invalid password.
  - [ ] **Result**: "Invalid credentials" error shown.
- [ ] **Logout**:
  - [ ] Click "Sign Out".
  - [ ] **Result**: Session cleared, redirects to home/login.

## 5. User Dashboard

- [ ] **Profile (`/profile`)**: User details load correctly.
- [ ] **Bookings (`/bookings`)**: Displays "No bookings found" (since bookings are disabled).

## 6. Legal & Trust

- [ ] **Footer**: Links to Privacy, Terms, Login exist on all pages.
- [ ] **Pages**:
  - [ ] Click "Privacy Policy" -> Loads `/privacy`.
  - [ ] Click "Terms of Service" -> Loads `/terms`.

## 7. Backend & Logs (Dev Mode Check)

- [ ] **Logs**: No 500 errors in console during search/click flow.
- [ ] **Analytics**: Events firing? (Check network tab for PostHog calls if enabled).

---

## ✅ Sign-off

**Status**: [ ] PASS  [ ] FAIL

**Notes:**
