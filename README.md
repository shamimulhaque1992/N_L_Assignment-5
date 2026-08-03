# RentNest

A full-stack rental property platform where landlords can list properties, tenants can request rentals and make payments, and admins can manage the platform.

**Live:** [https://rent-nest-wine.vercel.app/](https://rent-nest-wine.vercel.app/)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Auth:** JWT (httpOnly cookies, access + refresh token)
- **Payments:** Stripe
- **Deployment:** Vercel

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root:

```env
BACKEND_API_URL=your_backend_api_url
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Roles

| Role | Access |
|------|--------|
| **Admin** | Manage users, categories, all rental requests |
| **Landlord** | List properties, approve/reject/complete requests |
| **Tenant** | Browse properties, submit requests, pay rent, leave reviews |
