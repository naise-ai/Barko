import Link from "next/link";
import { products, formatINR } from "../../lib/products";

export default function ShopPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">SHOP DOG CARE</p>
        <h1>Daily dental care.</h1>
        <p>Compare formats, then choose only from approved, sellable products.</p>
      </section>
      <section className="shop-toolbar">
        <strong>{products.length} concepts</strong>
        <span className="status-pill">Demo catalog</span>
      </section>
      <section className="shop-grid">
        {products.map((product) => (
          <Link className="shop-card" href={`/products/${product.slug}`} key={product.slug}>
            <div className="product-art tall" style={{ background: product.accent }}>
              {product.type === "DENTAL_CHEW" ? <div className="pack chew-pack"><span>DAILY</span><b>DENTAL<br />CHEW</b><i /></div> : <div className="pack bottle"><span>DAILY</span><b>WATER<br />CARE</b><i /></div>}
            </div>
            <p className="card-type">{product.type === "DENTAL_CHEW" ? "Chew format" : "Water format"}</p>
            <h2>{product.name}</h2>
            <p>{product.pack}</p>
            <div className="card-bottom"><strong>{formatINR(product.price)}</strong><span>View product →</span></div>
          </Link>
        ))}
      </section>
    </main>
  );
}
