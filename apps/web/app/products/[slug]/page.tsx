"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { products, formatINR } from "../../../lib/products";

export default function ProductPage() {
  const params = useParams();
  const product = products.find((item) => item.slug === params.slug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <main className="empty-page"><h1>Product unavailable</h1><Link href="/shop">Return to shop</Link></main>;

  function addToCart() {
    if (!product) return;
    const existing = JSON.parse(localStorage.getItem("barko-cart") || "[]") as {slug:string;quantity:number}[];
    const match = existing.find((line) => line.slug === product.slug);
    if (match) match.quantity = Math.min(10, match.quantity + quantity);
    else existing.push({ slug: product.slug, quantity });
    localStorage.setItem("barko-cart", JSON.stringify(existing));
    setAdded(true);
  }

  return (
    <main className="pdp">
      <div className="pdp-gallery">
        <div className="pdp-art" style={{ background: product.accent }}>
          {product.type === "DENTAL_CHEW" ? <div className="pack chew-pack large"><span>DAILY</span><b>DENTAL<br />CHEW</b><i /></div> : <div className="pack bottle large"><span>DAILY</span><b>WATER<br />CARE</b><i /></div>}
        </div>
      </div>
      <div className="pdp-info">
        <p className="eyebrow">FOR DOGS · {product.pack}</p>
        <h1>{product.name}</h1>
        <p className="pdp-description">{product.description}</p>
        <strong className="pdp-price">{formatINR(product.price)}</strong>
        <p className="tax-note">Demo pricing · Taxes and delivery to be confirmed</p>
        <div className="product-warning"><b>Before purchase</b><span>Check the approved size or dose, and speak to a veterinarian if your dog has symptoms or a history of oral problems.</span></div>
        <div className="purchase-row">
          <div className="quantity" aria-label="Quantity">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity">+</button>
          </div>
          <button className="button primary add-button" type="button" onClick={addToCart}>{added ? "Added to cart" : "Add to cart"}</button>
        </div>
        {added && <Link className="checkout-link" href="/cart">View cart →</Link>}
        <div className="pdp-disclaimer">{product.note}</div>
      </div>
      <section className="pdp-details">
        <div><h2>What to know</h2><p>This is a design and engineering demonstration. Ingredient, nutritional, weight-band, dose, warning and claim data have intentionally not been invented.</p></div>
        <div><h2>How it fits</h2><p>{product.type === "DENTAL_CHEW" ? "A chew format requires an approved size, supervision and texture assessment." : "A water additive requires an approved concentration, volume basis and refill rule."}</p></div>
        <div><h2>Need help?</h2><p>Persistent bad breath, oral pain, bleeding, swelling or refusal to eat should be discussed with a veterinarian.</p></div>
      </section>
    </main>
  );
}
