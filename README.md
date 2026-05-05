# Mercado Commerce

A scalable e-commerce application scaffold built with Next.js 16 App Router and JavaScript.

## What is implemented

- Storefront home page with merchandising sections and featured products
- Server-rendered product catalog with search/filter query params
- Dynamic product detail pages using Next.js 16 async `params`
- Cart, checkout, and orders UI flows
- Seller and admin dashboard surfaces
- REST-style route handlers with a consistent `{ data, error, meta }` response shape
- Shared UI primitives and feature-oriented component structure

## Current data layer

The app uses a mock domain layer in [`src/lib/mock-data.js`](./src/lib/mock-data.js) so it runs on the dependencies already installed in the workspace.

That keeps the architecture clean while leaving obvious extension points for:

- MongoDB and Mongoose models
- NextAuth authentication providers
- React Query client caching
- React Hook Form and Zod validation
- Stripe payments and webhook handling

## Run locally

```bash
npm run dev
```

## Key routes

- `/`
- `/products`
- `/products/[slug]`
- `/cart`
- `/checkout`
- `/orders`
- `/login`
- `/register`
- `/verify`
- `/seller`
- `/admin`
- `/api/products`
- `/api/products/[slug]`
- `/api/categories`
- `/api/orders`
