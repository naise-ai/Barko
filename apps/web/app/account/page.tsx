"use client";

import { useState } from "react";

export default function AccountPage() {
  const [lookup, setLookup] = useState("");
  const [result, setResult] = useState(false);
  return (
    <main className="support-page">
      <p className="eyebrow">GUEST ORDER LOOKUP</p>
      <h1>Find your order</h1>
      <form className="support-form" onSubmit={(event) => { event.preventDefault(); setResult(true); }}>
        <label>Order reference or secure token<input required value={lookup} onChange={(event) => setLookup(event.target.value)} placeholder="BRK-00000000" /></label>
        <button className="button primary" type="submit">Look up order</button>
      </form>
      {result && <div className="support-confirm"><h2>No matching demo order</h2><p>The lookup service is not connected. A live lookup must use an opaque token and must not reveal whether an order exists.</p></div>}
    </main>
  );
}
