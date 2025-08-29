import { NextResponse } from 'next/server'
import { createCartAndCheckout } from '@/lib/shopify'

export async function POST(req: Request){
  const { variantId, quantity } = await req.json()
  const checkoutUrl = await createCartAndCheckout(variantId, quantity || 1)
  return NextResponse.json({ checkoutUrl })
}
