"use client";

import { useState } from "react";

export default function SupportPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="support-page">
      <section><p className="eyebrow">BARKO SUPPORT</p><h1>How can we help?</h1><p>For urgent or severe symptoms, contact a veterinarian promptly.</p></section>
      {sent ? <div className="support-confirm"><span>✓</span><h2>Demo case received</h2><p>This demonstration did not submit sensitive data or create a real support case.</p></div> : (
        <form className="support-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <label>What do you need help with?<select defaultValue="product"><option value="product">Product information</option><option value="order">Order or delivery</option><option value="safety">Adverse event or safety concern</option><option value="privacy">Privacy request</option></select></label>
          <label>Email address<input type="email" required placeholder="you@example.com" /></label>
          <label>Message<textarea required rows={5} placeholder="Tell us what happened. Please do not include sensitive medical details in this demo." /></label>
          <button className="button primary" type="submit">Send message</button>
        </form>
      )}
    </main>
  );
}
