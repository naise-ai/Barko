import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));

const products = [
  {
    id: "demo-chew",
    slug: "daily-dental-chew",
    name: "Daily Dental Chew",
    species: "DOG",
    productType: "DENTAL_CHEW",
    status: "PUBLISHED",
    shortDescription: "A daily chew concept for a manageable at-home oral-care routine.",
    pricePaise: 49900,
    currency: "INR",
    packSize: "10 pieces",
    image: "/products/chew.svg",
    approved: false,
    disclaimer: "SYNTHETIC DEMO — unapproved product concept"
  },
  {
    id: "demo-additive",
    slug: "daily-water-additive",
    name: "Daily Water Additive",
    species: "DOG",
    productType: "WATER_ADDITIVE",
    status: "PUBLISHED",
    shortDescription: "A water-based concept designed for a simple daily routine.",
    pricePaise: 69900,
    currency: "INR",
    packSize: "250 mL",
    image: "/products/additive.svg",
    approved: false,
    disclaimer: "SYNTHETIC DEMO — unapproved product concept"
  }
];

const carts = new Map();
const seedCart = () => ({ id: cryptoRandom(), lines: [], currency: "INR", updatedAt: new Date().toISOString() });
function cryptoRandom() {
  return `cart_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
function currentCart(sessionId) {
  if (!carts.has(sessionId)) carts.set(sessionId, seedCart());
  return carts.get(sessionId);
}
function cartWithTotals(cart) {
  let subtotal = 0;
  const lines = cart.lines.map((line) => {
    const product = products.find((item) => item.id === line.productId);
    subtotal += (product?.pricePaise || 0) * line.quantity;
    return { ...line, name: product?.name, pricePaise: product?.pricePaise, status: product?.status };
  });
  return { ...cart, lines, subtotalPaise: subtotal, shippingPaise: subtotal > 99900 ? 0 : 9900, totalPaise: subtotal + (subtotal > 99900 ? 0 : 9900) };
}

app.use((req, res, next) => {
  req.requestId = req.headers["x-request-id"] || cryptoRandom();
  res.setHeader("x-request-id", req.requestId);
  next();
});

app.get("/api/v1/health", (_req, res) => res.json({ data: { ok: true } }));

app.get("/api/v1/products", (req, res) => {
  const type = String(req.query.type || "");
  const filtered = type ? products.filter((item) => item.productType === type) : products;
  res.json({ data: filtered });
});

app.get("/api/v1/products/:slug", (req, res) => {
  const product = products.find((item) => item.slug === req.params.slug);
  if (!product) return res.status(404).json({ error: { code: "PRODUCT_NOT_FOUND", message: "Product not found", requestId: req.requestId } });
  res.json({ data: product });
});

app.post("/api/v1/selector/evaluate", (req, res) => {
  const { species = "", weightKg, format } = req.body || {};
  if (species !== "DOG") return res.status(422).json({ error: { code: "NO_MATCH", message: "This demo is available only for dogs." } });
  if (!Number.isFinite(Number(weightKg)) || Number(weightKg) <= 0) {
    return res.status(422).json({ error: { code: "INVALID_INPUT", message: "Enter a valid dog weight.", fieldErrors: { weightKg: "A positive weight is required." } } });
  }
  const match = format === "WATER_ADDITIVE" ? products[1] : products[0];
  res.json({
    data: {
      matchedVariantId: match.id,
      ruleVersion: "demo-v1",
      eligibilityText: "Demo result only — final eligibility has not been approved.",
      warnings: ["Synthetic data; do not use for a real purchase decision."]
    }
  });
});

app.get("/api/v1/cart", (req, res) => res.json({ data: cartWithTotals(currentCart(String(req.headers["x-session-id"] || "anonymous"))) }));

app.post("/api/v1/cart", (req, res) => {
  const { productId, quantity = 1 } = req.body || {};
  const product = products.find((item) => item.id === productId);
  if (!product) return res.status(422).json({ error: { code: "INVALID_VARIANT", message: "Product is unavailable." } });
  const qty = Math.min(10, Math.max(1, Number(quantity)));
  const cart = currentCart(String(req.headers["x-session-id"] || "anonymous"));
  const existing = cart.lines.find((line) => line.productId === productId);
  if (existing) existing.quantity = Math.min(10, existing.quantity + qty);
  else cart.lines.push({ lineId: cryptoRandom(), productId, quantity: qty });
  res.json({ data: cartWithTotals(cart) });
});

app.patch("/api/v1/cart/items/:lineId", (req, res) => {
  const cart = currentCart(String(req.headers["x-session-id"] || "anonymous"));
  const line = cart.lines.find((item) => item.lineId === req.params.lineId);
  if (!line) return res.status(404).json({ error: { code: "LINE_NOT_FOUND", message: "Cart line not found." } });
  line.quantity = Math.min(10, Math.max(1, Number(req.body.quantity) || 1));
  res.json({ data: cartWithTotals(cart) });
});

app.delete("/api/v1/cart/items/:lineId", (req, res) => {
  const cart = currentCart(String(req.headers["x-session-id"] || "anonymous"));
  cart.lines = cart.lines.filter((item) => item.lineId !== req.params.lineId);
  res.json({ data: cartWithTotals(cart) });
});

app.post("/api/v1/checkout/quote", (req, res) => {
  const cart = cartWithTotals(currentCart(String(req.headers["x-session-id"] || "anonymous")));
  res.json({
    data: {
      quoteId: cryptoRandom(),
      cartHash: cryptoRandom(),
      ...cart,
      validUntil: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    }
  });
});

app.post("/api/v1/checkout/orders", (req, res) => {
  const cart = cartWithTotals(currentCart(String(req.headers["x-session-id"] || "anonymous")));
  if (!cart.lines.length) return res.status(422).json({ error: { code: "EMPTY_CART", message: "Add a product before checkout." } });
  res.status(201).json({
    data: {
      orderId: `BRK-${Date.now().toString().slice(-8)}`,
      status: "PAYMENT_PENDING",
      totalPaise: cart.totalPaise,
      nextAction: "Use sandbox checkout"
    }
  });
});

app.use((_req, res) => res.status(404).json({ error: { code: "NOT_FOUND", message: "Endpoint not found" } }));

const port = Number(process.env.PORT || 4000);
async function start() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  app.listen(port, () => console.log(`Barko API listening on http://localhost:${port}`));
}
start().catch((error) => {
  console.error(error);
  process.exit(1);
});

export { app, products };
