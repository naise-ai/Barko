import Link from "next/link";
import { products, formatINR } from "../lib/products";

function DogIllustration() {
  return (
    <div className="dog-hero" role="img" aria-label="Illustration of a happy dog">
      <div className="sun" />
      <div className="dog-ear left" />
      <div className="dog-ear right" />
      <div className="dog-head">
        <div className="eye left-eye" />
        <div className="eye right-eye" />
        <div className="dog-muzzle"><span /></div>
        <div className="tongue" />
      </div>
      <div className="dog-body"><div className="bandana">BARKO</div></div>
      <div className="chew-stick" />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">DAILY CARE FOR DOGS</p>
          <h1>A fresher routine.<br /><em>A happier best friend.</em></h1>
          <p className="hero-lede">Simple, considered dental care that helps you build a calm routine — without making big promises.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/shop">Explore dental care</Link>
            <Link className="text-link" href="/guide">How to choose <span>→</span></Link>
          </div>
          <p className="demo-note">Concept storefront · No real product or claim is currently approved</p>
        </div>
        <DogIllustration />
      </section>

      <section className="promise-strip" aria-label="Product principles">
        <div><span>01</span><strong>Label-first</strong><p>Clear ingredients and directions</p></div>
        <div><span>02</span><strong>Dog-fit</strong><p>Weight and format guidance</p></div>
        <div><span>03</span><strong>Vet-aware</strong><p>Home care, not diagnosis</p></div>
      </section>

      <section className="section featured">
        <div className="section-heading">
          <div><p className="eyebrow">THE DAILY RANGE</p><h2>Two simple ways to care.</h2></div>
          <Link className="text-link" href="/shop">View all <span>→</span></Link>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <Link className="product-card" href={`/products/${product.slug}`} key={product.slug}>
              <div className="product-art" style={{ background: product.accent }}>
                {product.type === "DENTAL_CHEW" ? <div className="pack chew-pack"><span>DAILY</span><b>DENTAL<br />CHEW</b><i /></div> : <div className="pack bottle"><span>DAILY</span><b>WATER<br />CARE</b><i /></div>}
              </div>
              <div className="product-card-info">
                <div><p>{product.type === "DENTAL_CHEW" ? "Daily chew" : "Water additive"}</p><h3>{product.name}</h3></div>
                <strong>{formatINR(product.price)}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="routine">
        <div className="routine-image" role="img" aria-label="Illustration of dog care routine"><div className="routine-bowl"><span /><i /></div></div>
        <div className="routine-copy">
          <p className="eyebrow">A ROUTINE THAT FEELS RIGHT</p>
          <h2>Good care starts with what you can do today.</h2>
          <p>Our approach keeps dental care practical: easy to understand, easy to fit into the day, and always clear about when a veterinarian should get involved.</p>
          <Link className="button secondary" href="/guide">Read the dental guide</Link>
        </div>
      </section>

      <section className="section care-banner">
        <p className="eyebrow">NOT A DIAGNOSIS</p>
        <h2>Noticing bleeding gums, bad breath or pain?</h2>
        <p>A dental care product is not a substitute for professional assessment. If you notice persistent symptoms, speak with your veterinarian.</p>
        <Link className="text-link" href="/support">Find support <span>→</span></Link>
      </section>
    </main>
  );
}
