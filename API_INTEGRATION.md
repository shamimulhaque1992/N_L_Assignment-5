# API Integration

Base URL is set via `BACKEND_API_URL` in `.env`. All requests are made through Next.js Server Actions.

---

## Auth

- `POST /auth/login` — login, sets httpOnly access + refresh token cookies
- `POST /auth/register` — create a new account
- `POST /auth/refresh-token` — silently refresh access token (handled by `validateAccessToken`)

## Users

- `GET /users/me` — fetch the logged-in user's profile (used on all three /me pages)
- `GET /users` — list all users with pagination (admin)
- `GET /users/:id` — single user detail (admin)
- `PATCH /users/:id/moderate` — ban or unban a user (admin)

## Properties

- `GET /properties` — list all properties with filters (search, location, price, category, amenities)
- `GET /properties/:id` — single property detail
- `GET /properties/my-properties` — landlord's own listings
- `POST /properties` — create a property (landlord)
- `PATCH /properties/:id` — update property details (landlord)
- `PATCH /properties/:id` — toggle property status available/unavailable (landlord)
- `DELETE /properties/:id` — delete a property (landlord)

## Categories

- `GET /categories` — all property categories
- `POST /categories` — create a category (admin)
- `PATCH /categories/:id` — update a category (admin)
- `DELETE /categories/:id` — delete a category (admin)

## Rentals

- `POST /rentals` — tenant submits a rental request
- `GET /rentals` — list rental requests (filtered by role)
- `GET /rentals/:id` — single rental request detail
- `PATCH /rentals/:id/status` — approve, reject, or complete a request (landlord)
- `PATCH /rentals/:id/cancel` — tenant cancels a pending request
- `DELETE /rentals/:id` — delete a rental request (landlord)

## Payments

- `POST /payments/create-intent` — create a payment intent (tenant)
- `GET /payments` — tenant's payment history
- `GET /payments/:id` — single payment detail

## Reviews

- `POST /reviews` — tenant submits a review after a completed rental

## Dashboard Stats

- `GET /landlord/stats` — landlord dashboard statistics (total properties, requests, revenue, reviews, ratings)
- `GET /tenant/stats` — tenant dashboard statistics (requests by status, payments, amount spent, reviews)
- `GET /admin/dashboard` — platform-wide statistics (admin)
