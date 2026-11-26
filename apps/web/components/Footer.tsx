import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link className="brand brand-light" href="/"><span className="brand-mark">B</span><span>Barko</span></Link>
          <p>Thoughtful daily care for dogs.</p>
        </div>
        <div className="footer-links">
          <div><strong>Explore</strong><Link href="/shop">Shop</Link><Link href="/guide">Dental guide</Link></div>
          <div><strong>Help</strong><Link href="/support">Contact</Link><Link href="/shipping">Shipping</Link><Link href="/returns">Returns</Link></div>
          <div><strong>Legal</strong><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Barko. Concept experience.</span>
        <span>Dog dental care • India-first</span>
      </div>
    </footer>
  );
}
