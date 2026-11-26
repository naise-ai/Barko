"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <main className="empty-page success">
      <span className="success-mark">✓</span>
      <p className="eyebrow">DEMO ORDER</p>
      <h1>Checkout preview complete.</h1>
      <p>No order or payment was created. Final checkout requires an approved provider and reviewed product data.</p>
      <a className="button primary" href="/shop">Continue browsing</a>
    </main>
  );
  return (
    <main className="checkout-page">
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <p className="eyebrow">SECURE CHECKOUT · DEMO</p>
        <h1>Delivery details</h1>
        <fieldset>
          <legend>Contact</legend>
          <label>Email address<input required type="email" placeholder="you@example.com" /></label>
          <label>Phone number<input required type="tel" placeholder="+91" /></label>
        </fieldset>
        <fieldset>
          <legend>Address</legend>
          <label>Full name<input required name="name" /></label>
          <label>Address line 1<input required name="address" /></label>
          <div className="field-grid"><label>City<input required name="city" /></label><label>State<input required name="state" /></label></div>
          <label>PIN code<input required name="postalCode" inputMode="numeric" pattern="[0-9]{6}" /></label>
        </fieldset>
        <fieldset>
          <legend>Payment</legend>
          <label className="radio-card"><input type="radio" name="payment" defaultChecked /> <span><b>Online payment</b><small>Provider pending approval</small></span></label>
          <label className="radio-card"><input type="radio" name="payment" /> <span><b>Cash on delivery</b><small>Availability pending approval</small></span></label>
        </fieldset>
        <button className="button primary" type="submit">Review demo order</button>
      </form>
      <aside className="checkout-aside">
        <h2>Demo order</h2>
        <p>This interface demonstrates address capture and the checkout handoff only.</p>
        <div className="demo-box"><b>Not live</b><span>No payment, inventory, carrier or order service is connected.</span></div>
      </aside>
    </main>
  );
}
