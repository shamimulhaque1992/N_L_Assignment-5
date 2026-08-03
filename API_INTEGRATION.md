# API Integration Documentation

This document maps frontend components to backend API endpoints for the RentNest application.

**Base URL**: Set via `BACKEND_API_URL` in `.env`  
**Authentication**: All requests use Next.js Server Actions with httpOnly cookies

---

## API Endpoints by Feature

### Authentication
- `POST /auth/login` — User login (sets httpOnly cookies)
- `POST /auth/register` — User registration
- `POST /auth/refresh-token` — Refresh access token (automatic via `validateAccessToken()`)

### Users
- `GET /users/me` — Current user profile
- `GET /users` — List all users (admin)
- `GET /users/:id` — Single user detail (admin)
- `PATCH /users/:id/moderate` — Ban/unban user (admin)

### Properties
- `GET /properties` — List all properties with filters
- `GET /properties/:id` — Single property detail
- `GET /landlord/properties` — Landlord's own properties
- `POST /properties` — Create property (landlord)
- `PATCH /properties/:id` — Update property (landlord)
- `DELETE /properties/:id` — Delete property (landlord)

### Categories
- `GET /categories` — List all categories
- `POST /categories` — Create category (admin)
- `PATCH /categories/:id` — Update category (admin)
- `DELETE /categories/:id` — Delete category (admin)

### Rentals
- `POST /rentals` — Submit rental request (tenant)
- `GET /rentals` — List rental requests (tenant)
- `GET /landlord/rental-requests` — List rental requests for landlord's properties
- `GET /rentals/:id` — Single rental detail
- `PATCH /rentals/:id/status` — Approve/reject/complete (landlord)
- `PATCH /rentals/:id/cancel` — Cancel request (tenant)
- `DELETE /rentals/:id` — Delete request (landlord)

### Tenant History
- `GET /landlord/tenants/:tenantId/history` — Complete tenant history with rentals, reviews, and stats (landlord)

### Payments
- `POST /payments/create-intent` — Create payment intent (tenant)
- `GET /payments` — Payment history (tenant)
- `GET /payments/:id` — Single payment detail

### Reviews
- `POST /reviews` — Submit review (tenant, after completed rental)

### Dashboard Stats
- `GET /landlord/stats` — Landlord statistics
- `GET /tenant/stats` — Tenant statistics
- `GET /admin/dashboard` — Admin statistics

---

## Component to API Mapping

### Public Pages

**PropertiesListingPage**
- Action: `getAllProperties` → `GET /properties`

**PropertyDetailPage**
- Action: `getPropertyById` → `GET /properties/:id`

**RegisterForm**
- Action: `registerAction` → `POST /auth/register`

**LoginForm**
- Action: `loginAction` → `POST /auth/login`

### Tenant Dashboard

**TenantDashboard**
- Action: `getTenantStats` → `GET /tenant/stats`

**TenantRentalRequests**
- Action: `getAllRentalRequests` → `GET /rentals`

**TenantPaymentHistory**
- Action: `getPaymentHistory` → `GET /payments`

**CreateRentalRequest**
- Action: `createRentalRequest` → `POST /rentals`

**ReviewForm**
- Action: `createReview` → `POST /reviews`

**PaymentPage**
- Action: `createPaymentIntent` → `POST /payments/create-intent`

### Landlord Dashboard

**LandlordDashboard**
- Action: `getLandlordStats` → `GET /landlord/stats`

**LandlordPropertyListing**
- Action: `getAllMyProperties` → `GET /landlord/properties`

**CreatePropertyForm**
- Action: `createProperty` → `POST /properties`

**EditPropertyForm**
- Action: `updateProperty` → `PATCH /properties/:id`

**PropertyStatusToggle**
- Action: `updatePropertyStatus` → `PATCH /properties/:id`

**DeleteProperty**
- Action: `deleteProperty` → `DELETE /properties/:id`

**AllPropertyRequestDashboardListing**
- Action: `getAllRequestOfMyProperties` → `GET /landlord/rental-requests`

**RentalStatusUpdate**
- Action: `updateRentalStatus` → `PATCH /rentals/:id/status`

**TenantHistoryContent**
- Action: `getTenantHistory` → `GET /landlord/tenants/:tenantId/history`

### Admin Dashboard

**AdminDashboard**
- Action: `getAdminStats` → `GET /admin/dashboard`

**AdminUserListing**
- Action: `getAllUsers` → `GET /users`

**ModerateUser**
- Action: `moderateUser` → `PATCH /users/:id/moderate`

**AdminPropertyListing**
- Action: `getAllProperties` → `GET /properties`

**AdminCategoryListing**
- Action: `getAllCategories` → `GET /categories`

**CreateCategory**
- Action: `createCategory` → `POST /categories`

**UpdateCategory**
- Action: `updateCategory` → `PATCH /categories/:id`

**DeleteCategory**
- Action: `deleteCategory` → `DELETE /categories/:id`

---