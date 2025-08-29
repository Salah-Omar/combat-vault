# Combat Vault — Headless Shopify + Next.js Starter

## What this is
- Next.js (App Router) + Tailwind + Framer Motion
- Shopify Storefront API (real products, real checkout via `cartCreate` → `checkoutUrl`)
- Apple‑style smooth visuals (animated canvas background + motion reveals)
- Pages: Home, Collections, Product

## 1) Setup (10 minutes)
1. **Create a Shopify storefront access token**
   - Shopify Admin → Settings → Apps → Develop apps → Create app → "Storefront API" → **Enable** unauthenticated scopes: `read_products`, `unauthenticated_read_product_pickup_locations` (and cart if needed).
   - Copy the **Storefront API access token** and your `yourshop.myshopify.com` domain.

2. **Environment**
   - Copy `.env.example` to `.env.local` and fill:
     ```env
     SHOPIFY_STORE_DOMAIN=yourshop.myshopify.com
     SHOPIFY_STOREFRONT_API_TOKEN=xxxx
     SHOPIFY_API_VERSION=2024-07
     USE_MOCK=0
     ```

3. **Install & run**
   ```bash
   npm install
   npm run dev
   ```
   Open http://localhost:3000

## 2) Collections & Products
- Collection page URL: `/collections/{handle}` (e.g. `/collections/gloves`)
- Product page URL: `/product/{handle}`

## 3) Cart/Checkout
- Clicking **Add to Cart** on list cards calls `/api/cart` → Shopify **cartCreate** → returns **checkoutUrl** (secure Shopify checkout).

## 4) Deploy to Vercel
- Push to GitHub → "New Project" on Vercel → import repo.
- Add the same env vars in Vercel → Settings → Environment Variables.
- Set `USE_MOCK=0` in production.
- Done. You’ll get a live URL.

## 5) Customize Feel/Brand
- Colors/fonts in `tailwind.config.ts` and `styles/globals.css`.
- Navbar / Footer in `components/`.
- Background animation in `components/AnimatedBackground.tsx`.

## Notes
- If you run with `USE_MOCK=1`, home/collection show placeholder items until Shopify is ready.
- Replace `/public/placeholder-gloves.jpg` with your own images for local dev.
