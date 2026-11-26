import Link from "next/link";

export default function GuidePage() {
  return (
    <main>
      <section className="page-hero guide-hero"><p className="eyebrow">THE DAILY GUIDE</p><h1>A calmer approach to dog dental care.</h1><p>Start with observation. Build a routine. Know when to ask a veterinarian.</p></section>
      <section className="guide-grid">
        <article><span>01</span><h2>Observe</h2><p>Look for persistent bad breath, bleeding, swelling, loose teeth, drooling or difficulty eating. These signs need professional attention.</p></article>
        <article><span>02</span><h2>Choose</h2><p>Use only manufacturer-approved species, size and format directions. Never use a dog-size rule for a cat or a result for a different formula.</p></article>
        <article><span>03</span><h2>Introduce</h2><p>Follow the approved label, supervise chewing where required, and monitor water intake and acceptance for water formats.</p></article>
      </section>
      <section className="guide-callout"><div><p className="eyebrow">A NOTE ON EXPECTATIONS</p><h2>Chews and additives can support a routine — they cannot replace a veterinary exam or brushing.</h2></div><Link className="button secondary" href="/support">Speak to support</Link></section>
    </main>
  );
}
