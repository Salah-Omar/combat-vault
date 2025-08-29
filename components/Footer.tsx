export default function Footer(){
  return (
    <footer className="bg-surface text-muted py-10 border-t border-[color:var(--ring)]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-[color:var(--brand)] mb-3 uppercase font-bold">About</h3>
          <p>Combat Vault builds fight-grade equipment for athletes and clubs.</p>
        </div>
        <div>
          <h3 className="text-[color:var(--brand)] mb-3 uppercase font-bold">Categories</h3>
          <ul className="space-y-1">
            <li>Gloves</li><li>Shin Guards</li><li>Headgear</li><li>Clothing</li><li>Accessories</li>
          </ul>
        </div>
        <div>
          <h3 className="text-[color:var(--brand)] mb-3 uppercase font-bold">Contact</h3>
          <p>info@combatvault.com</p>
        </div>
      </div>
    </footer>
  )
}
