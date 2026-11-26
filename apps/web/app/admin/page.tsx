import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="cart-page">
      <p className="eyebrow">ADMIN DEMO · RESTRICTED</p>
      <h1>Operations overview</h1>
      <div className="guide-grid">
        <article><span>02</span><h2>Catalog</h2><p>Two synthetic products. Publish controls, claim review and product versioning remain server-gated.</p></article>
        <article><span>00</span><h2>Orders</h2><p>No production orders. Order state and fulfilment transitions require authenticated roles.</p></article>
        <article><span>—</span><h2>Safety</h2><p>Recall hold and adverse-event routing are launch-critical procedures, not demo actions.</p></article>
      </div>
      <Link className="button primary" href="/support">Open support route</Link>
    </main>
  );
}
