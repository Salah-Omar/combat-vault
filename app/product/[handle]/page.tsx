import Image from 'next/image'
import { getProductByHandle, createCartAndCheckout } from '@/lib/shopify'

export default async function PDP({ params }:{ params:{ handle:string }}){
  let product: any = null
  try {
    product = await getProductByHandle(params.handle)
  } catch {
    return <div className="max-w-4xl mx-auto px-6 py-16">Product not found or Shopify not configured.</div>
  }
  const first = product.images?.nodes?.[0]
  const variant = product.variants?.nodes?.[0]

  async function addToCart(){
    'use server'
    if (!variant?.id) return
    const url = await createCartAndCheckout(variant.id, 1)
    return url
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
      <div className="relative w-full aspect-square rounded-brand overflow-hidden border border-[color:var(--ring)]">
        {first && <Image src={first.url} alt={first.altText||product.title} fill className="object-cover" />}
      </div>
      <div>
        <h1 className="font-display text-5xl">{product.title}</h1>
        <p className="text-muted mt-3">{product.description}</p>
        {variant?.price && <div className="text-[color:var(--brand)] font-extrabold text-2xl mt-4">${variant.price.amount} {variant.price.currencyCode}</div>}
        <form className="mt-6" action={async ()=>{
          const url = await addToCart()
        }}>
          <button className="btn btn-primary">Add to Cart</button>
        </form>
      </div>
    </div>
  )
}
