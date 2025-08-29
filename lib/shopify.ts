export const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
export const SHOPIFY_API_URL = `https://${SHOPIFY_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION || '2024-07'}/graphql.json`
export const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN!

async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error('Shopify environment not set. Add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN.')
  }
  const res = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store'
  })
  const json = await res.json()
  if (json.errors) {
    console.error(JSON.stringify(json.errors, null, 2))
    throw new Error('Shopify query error')
  }
  return json.data
}

export async function getFeaturedProducts(limit = 8) {
  const q = `#graphql
    query Featured($limit:Int!) {
      products(first:$limit, sortKey:BEST_SELLING) {
        nodes {
          id
          handle
          title
          description
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }`
  const data = await shopifyFetch<{products:{nodes:any[]}}>(q, {limit})
  return data.products.nodes
}

export async function getCollectionByHandle(handle: string, limit=24) {
  const q = `#graphql
    query Coll($handle:String!, $limit:Int!) {
      collection(handle:$handle) {
        id title description
        products(first:$limit) {
          nodes {
            id handle title
            featuredImage { url altText width height }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }`
  const data = await shopifyFetch<{collection:any}>(q, {handle, limit})
  return data.collection
}

export async function getProductByHandle(handle: string) {
  const q = `#graphql
    query P($handle:String!) {
      product(handle:$handle) {
        id handle title description
        featuredImage { url altText width height }
        images(first:6){ nodes{ url altText width height } }
        options { name values }
        variants(first:20) {
          nodes {
            id title availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }`
  const data = await shopifyFetch<{product:any}>(q, {handle})
  return data.product
}

export async function createCartAndCheckout(variantId: string, quantity=1) {
  const q = `#graphql
    mutation CartCreate($lines:[CartLineInput!]!) {
      cartCreate(input:{ lines: $lines }) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }`
  const data = await shopifyFetch<{cartCreate:{cart:{id:string, checkoutUrl:string}, userErrors:any[]}}>(q, {
    lines: [{ merchandiseId: variantId, quantity }]
  })
  const err = data.cartCreate.userErrors?.[0]
  if (err) throw new Error(err.message || 'Cart error')
  return data.cartCreate.cart.checkoutUrl
}
