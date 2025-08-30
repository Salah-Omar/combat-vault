import { Suspense } from 'react'
import { getFeaturedProducts } from '@/lib/shopify'
import ProductGrid from '@/components/ProductGrid'
import { MOCK_PRODUCTS } from '@/lib/mock'

async function Featured(){
  try{
    if (process.env.USE_MOCK === '1') throw new Error('mock')
    const products = await getFeaturedProducts(8)
    const items = products.map((p:any) => ({
      title: p.title,
      handle: p.handle,
      price: p.priceRange.minVariantPrice.amount,
      currency: p.priceRange.minVariantPrice.currencyCode,
      image: p.featuredImage?.url || '/placeholder-gloves.jpg',
    }))
    return <ProductGrid items={items} />
  } catch {
    const items = MOCK_PRODUCTS
    return <ProductGrid items={items} />
  }
}

export default function Home() {
  return (
    <div>
      <section className="min-h-[85vh] grid place-items-center text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="font-display text-6xl md:text-7xl tracking-wide">Fight equipment. <span className="text-[color:var(--brand)]">Elevated.</span></h1>
          <p className="text-muted mt-3 text-lg">Premium MMA gear engineered for champions. Smooth Apple‑style motion, real Shopify checkout.</p>
          <div className="mt-5 flex justify-center gap-3">
            <a href="/collections/gloves" className="btn btn-primary">Shop Gloves</a>
            <a href="/wholesale" className="btn btn-outline">Team & Wholesale</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl text-[color:var(--brand)] uppercase mb-4">Featured Gear</h2>
        </div>
        {/* Featured is a Server Component; no suppression needed */}
<Suspense fallback={<div className="muted">Loading…</div>}>
  <Featured />
</Suspense>

      </section>
    </div>
  )
}
