# Mercado Commerce

A production-style e-commerce application built with Next.js 16 App Router, MongoDB, Mongoose, Zod, and JWT cookie authentication.

## Implemented

- MongoDB-backed `User`, `Category`, `Product`, `Cart`, and `Order` models
- JWT authentication with persisted registration, login, session, and logout routes
- Protected customer, seller, and admin flows with role-based route access
- Live storefront, product detail, cart, checkout, orders, seller workspace, and admin dashboard
- Clickable forms/actions for category creation, product creation, add to cart, cart updates, checkout, and order status updates
- REST-style API handlers returning `{ data, error, meta }`

## Required environment variables

Copy `.env.example` to `.env.local` and provide:

- `MONGODB_URI`
- `JWT_SECRET`
- `APP_URL`

## Run locally

```bash
npm run dev
```

## Important routes

- `/`
- `/products`
- `/products/[slug]`
- `/cart`
- `/checkout`
- `/orders`
- `/login`
- `/register`
- `/seller`
- `/admin`

## Important API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET, POST /api/products`
- `GET, PUT, DELETE /api/products/[slug]`
- `GET, POST /api/categories`
- `GET /api/cart`
- `POST /api/cart/items`
- `PUT, DELETE /api/cart/items/[id]`
- `GET, POST /api/orders`
- `PUT /api/admin/orders/[id]/status`
