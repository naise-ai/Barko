"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Barko home">
        <span className="brand-mark" aria-hidden="true">B</span>
        <span>Barko</span>
      </Link>
      <button className="menu-button" type="button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
        <Link href="/guide" onClick={() => setOpen(false)}>Dental guide</Link>
        <Link href="/support" onClick={() => setOpen(false)}>Support</Link>
        <Link href="/account" onClick={() => setOpen(false)}>Account</Link>
        <Link href="/cart" className="cart-link" onClick={() => setOpen(false)}>Cart <span>0</span></Link>
      </nav>
    </header>
  );
}
