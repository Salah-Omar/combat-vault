'use client';
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  title: string
  handle: string
  price: string
  currency: string
  image: string
  variantId?: string
}

export default function ProductCard({ title, handle, price, currency, image, variantId }: Props){
  const [loading, setLoading] = useState(false)

  async function addToCart(){
    if (!variantId) { window.location.href = `/product/${handle}`; return }
    try {
      setLoading(true)
      const r = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ variantId, quantity: 1 })
      })
      const { checkoutUrl } = await r.json()
      window.location.href = checkoutUrl
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:.2}} transition={{duration:.5}} className="card p-4 flex flex-col">
      <div className="relative w-full aspect-[4/3] rounded-brand overflow-hidden border border-[color:var(--ring)]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[color:var(--brand)] font-extrabold">${price} {currency}</span>
          <button onClick={addToCart} className="btn btn-primary text-xs uppercase">{loading ? 'Loading…' : 'Add to Cart'}</button>
        </div>
      </div>
    </motion.div>
  )
}
