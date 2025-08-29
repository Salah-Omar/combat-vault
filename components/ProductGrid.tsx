import ProductCard from './ProductCard'

type Item = { title:string, handle:string, price:string, currency:string, image:string, variantId?:string }

export default function ProductGrid({ items }:{ items: Item[] }){
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
    </section>
  )
}
