export type Product = {
  slug: string;
  name: string;
  type: "DENTAL_CHEW" | "WATER_ADDITIVE";
  pack: string;
  price: number;
  description: string;
  note: string;
  accent: string;
};

export const products: Product[] = [
  {
    slug: "daily-dental-chew",
    name: "Daily Dental Chew",
    type: "DENTAL_CHEW",
    pack: "10 pieces",
    price: 499,
    description: "A dog-first chew concept for a manageable at-home oral-care routine.",
    note: "Synthetic demo — product facts, ingredients and dosing are not approved.",
    accent: "#f4a57d"
  },
  {
    slug: "daily-water-additive",
    name: "Daily Water Additive",
    type: "WATER_ADDITIVE",
    pack: "250 mL",
    price: 699,
    description: "A convenient water-additive concept with a clear, label-first experience.",
    note: "Synthetic demo — formula, dose and evidence are not approved.",
    accent: "#83bcb1"
  }
];

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
