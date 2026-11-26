"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products, formatINR } from "../../lib/products";

type CartLine = { slug: string; quantity: number };

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => setLines(JSON.parse(localStorage.getItem("barko-cart") || "[]")), []);

  function save(next: CartLine[]) {
    setLines(next);
    localStorage.setItem("barko-cart", JSON.stringify(next));
  }
  const subtotal = lines.reduce((sum, line) => sum + (products.find((p) => p.slug === line.slug)?.price || 0) * line.quantity, 0);

  if (!lines.length) return (
    <main className="empty-page">
      <p className="eyebrow">YOUR CART</p>
      <h1>Your cart is ready for a fresh start.</h1>
      <Link className="button primary" href="/shop">Explore products</Link>
    </main>
  );

  return (
    <main className="cart-page">
      <h1>Your cart</h1>
      <div className="cart-layout">
        <div className="cart-lines">
          {lines.map((line) => {
            const product = products.find((item) => item.slug === line.slug)!;
            return (
              <div className="cart-line" key={line.slug}>
                <div className="cart-thumb" style={{ background: product.accent }}><span>{product.type === "DENTAL_CHEW" ? "CHEW" : "WATER"}</span></div>
                <div className="cart-line-info"><p>{product.pack}</p><h2>{product.name}</h2><button type="button" onClick={() => save(lines.filter((item) => item.slug !== line.slug))}>Remove</button></div>
                <div className="quantity small"><button type="button" onClick={() => save(lines.map((item) => item.slug === line.slug ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))}>−</button><span>{line.quantity}</span><button type="button" onClick={() => save(lines.map((item) => item.slug === line.slug ? { ...item, quantity: Math.min(10, item.quantity + 1) } : item))}>+</button></div>
                <strong>{formatINR(product.price * line.quantity)}</strong>
              </div>
            );
          })}
        </div>
        <aside className="order-summary">
          <h2>Order summary</h2>
          <div><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></div>
          <div><span>Shipping</span><strong>Calculated at checkout</strong></div>
          <div className="summary-total"><span>Estimated total</span><strong>{formatINR(subtotal)}</strong></div>
          <Link className="button primary" href="/checkout">Continue to checkout</Link>
          <p>Demo checkout — no real payment will be taken.</p>
        </aside>
      </div>
    </main>
  );
}
