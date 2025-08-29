import Link from 'next/link'

export default function Navbar(){
  return (
    <nav className="nav-glass fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-[color:var(--brand)] uppercase">Combat Vault</Link>
        <ul className="hidden md:flex space-x-6 uppercase text-sm">
          <li><Link href="/collections/gloves" className="hover:text-[color:var(--punch)]">Gloves</Link></li>
          <li><Link href="/collections/shin-guards" className="hover:text-[color:var(--punch)]">Shin Guards</Link></li>
          <li><Link href="/collections/headgear" className="hover:text-[color:var(--punch)]">Headgear</Link></li>
          <li><Link href="/collections/clothing" className="hover:text-[color:var(--punch)]">Clothing</Link></li>
          <li><Link href="/collections/accessories" className="hover:text-[color:var(--punch)]">Accessories</Link></li>
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/#newsletter" className="btn btn-outline">Newsletter</Link>
        </div>
      </div>
    </nav>
  )
}
