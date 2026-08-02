# API Integration

Base URL is set via `BACKEND_API_URL` in `.env`. All requests are made through Next.js Server Actions.

---

## Auth

- `POST /auth/login` — login, sets httpOnly access + refresh token cookies
- `POST /auth/register` — create a new account
- `GET /users/me` — fetch the logged-in user's profile
- `POST /auth/refresh-token` — silently refresh access token (handled by `validateAccessToken`)

## Properties

- `GET /properties` — list all properties with filters (search, location, price, category, amenities)
- `GET /properties/:id` — single property detail
- `GET /categories` — all property categories
- `POST /properties` — create a property (landlord)
- `PATCH /properties/:id` — update a property (landlord)
- `PATCH /properties/:id` — toggle property status (landlord)
- `DELETE /properties/:id` — delete a property (landlord)
- `GET /properties/my-properties` — landlord's own listings

## Rentals

- `POST /rentals` — tenant submits a rental request
- `GET /rentals` — list rental requests (filtered by role)
- `GET /rentals/:id` — single rental request detail
- `PATCH /rentals/:id/status` — approve, reject, or complete a request (landlord)
- `PATCH /rentals/:id/cancel` — tenant cancels a pending request
- `DELETE /rentals/:id` — delete a rental request (landlord)

## Payments

- `POST /payments/create-intent` — create a Stripe payment intent
- `GET /payments` — tenant's payment history
- `GET /payments/:id` — single payment detail

## Reviews

- `POST /reviews` — tenant submits a review after a completed rental

## Admin

- `GET /admin/dashboard` — platform-wide stats
- `GET /users` — list all users with pagination
- `GET /users/:id` — single user detail
- `PATCH /users/:id/moderate` — ban or unban a user
- `POST /categories` — create a property category
- `PATCH /categories/:id` — update a category
- `DELETE /categories/:id` — delete a category
