import { getCollectionByHandle } from '@/lib/shopify'
import ProductGrid from '@/components/ProductGrid'
import { MOCK_PRODUCTS } from '@/lib/mock'

export default async function CollectionPage({ params }:{ params:{ handle:string }}){
  let items: any[] = []
  try {
    if (process.env.USE_MOCK === '1') throw new Error('mock')
    const col = await getCollectionByHandle(params.handle, 24)
    if (!col) throw new Error('no collection')
    items = col.products.nodes.map((p:any) => ({
      title: p.title,
      handle: p.handle,
      price: p.priceRange.minVariantPrice.amount,
      currency: p.priceRange.minVariantPrice.currencyCode,
      image: p.featuredImage?.url || '/placeholder-gloves.jpg'
    }))
  } catch {
    items = MOCK_PRODUCTS
  }

  const title = params.handle.replace('-', ' ')
  return (
    <div>
      <header className="pt-24 pb-10 text-center">
        <h1 className="font-display text-5xl capitalize"><span className="text-[color:var(--brand)]">{title}</span></h1>
        <p className="text-muted mt-2">Curated gear for hard rounds.</p>
      </header>
      <ProductGrid items={items} />
    </div>
  )
}
