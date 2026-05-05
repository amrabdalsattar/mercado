const categories = [
  {
    id: "cat-audio",
    name: "Audio",
    slug: "audio",
    image:
      "Layered sound gear, premium headphones, and immersive home listening setups.",
  },
  {
    id: "cat-workspace",
    name: "Workspace",
    slug: "workspace",
    image: "Curated deskside tools for founders, creators, and remote teams.",
  },
  {
    id: "cat-wellness",
    name: "Wellness",
    slug: "wellness",
    image: "Recovery, movement, and calm-tech essentials for modern routines.",
  },
];

const sellers = [
  {
    id: "seller-nova",
    name: "Nova Supply",
    rating: 4.9,
    responseTime: "2 hours",
  },
  {
    id: "seller-bloom",
    name: "Bloom Studio",
    rating: 4.8,
    responseTime: "5 hours",
  },
];

const products = [
  {
    id: "prod-aurora-headphones",
    name: "Aurora Wireless Headphones",
    slug: "aurora-wireless-headphones",
    category: "audio",
    categoryId: "cat-audio",
    sellerId: "seller-nova",
    description:
      "Spatial sound, 40-hour battery, and adaptive noise control built for deep focus and long-haul travel.",
    price: 249,
    salePrice: 199,
    stock: 38,
    badge: "Best seller",
    rating: 4.9,
    reviewsCount: 312,
    accent: "from-amber-200 via-orange-100 to-white",
    specs: ["40h battery", "USB-C fast charge", "Adaptive ANC", "Bluetooth 5.4"],
  },
  {
    id: "prod-orbit-speaker",
    name: "Orbit Room Speaker",
    slug: "orbit-room-speaker",
    category: "audio",
    categoryId: "cat-audio",
    sellerId: "seller-nova",
    description:
      "A sculpted smart speaker with rich bass tuning, low-latency streaming, and multi-room pairing.",
    price: 179,
    salePrice: null,
    stock: 16,
    badge: "New drop",
    rating: 4.7,
    reviewsCount: 108,
    accent: "from-sky-200 via-cyan-100 to-white",
    specs: ["Room calibration", "Wi-Fi + Bluetooth", "Stereo pairing", "Voice ready"],
  },
  {
    id: "prod-atlas-desk",
    name: "Atlas Standing Desk",
    slug: "atlas-standing-desk",
    category: "workspace",
    categoryId: "cat-workspace",
    sellerId: "seller-bloom",
    description:
      "Quiet electric lift desk with cable management, memory presets, and a durable soft-touch surface.",
    price: 899,
    salePrice: 799,
    stock: 9,
    badge: "Founder pick",
    rating: 4.8,
    reviewsCount: 94,
    accent: "from-stone-300 via-zinc-100 to-white",
    specs: ["Dual motor", "4 presets", "Cable tray", "Oak finish"],
  },
  {
    id: "prod-luma-lamp",
    name: "Luma Focus Lamp",
    slug: "luma-focus-lamp",
    category: "workspace",
    categoryId: "cat-workspace",
    sellerId: "seller-bloom",
    description:
      "A minimal task lamp with ambient and focus modes tuned for creators working into the evening.",
    price: 129,
    salePrice: 99,
    stock: 52,
    badge: "Staff favorite",
    rating: 4.6,
    reviewsCount: 188,
    accent: "from-lime-200 via-emerald-100 to-white",
    specs: ["Warm-to-cool light", "Touch dimmer", "USB-C hub", "Low-glare optics"],
  },
  {
    id: "prod-pulse-mat",
    name: "Pulse Recovery Mat",
    slug: "pulse-recovery-mat",
    category: "wellness",
    categoryId: "cat-wellness",
    sellerId: "seller-bloom",
    description:
      "Cushioned training mat engineered for yoga, mobility work, and quick reset sessions between meetings.",
    price: 89,
    salePrice: null,
    stock: 84,
    badge: "Restock",
    rating: 4.8,
    reviewsCount: 221,
    accent: "from-rose-200 via-orange-100 to-white",
    specs: ["Extra grip", "6mm support", "Travel strap", "Easy-clean finish"],
  },
  {
    id: "prod-breath-bottle",
    name: "Breath Smart Bottle",
    slug: "breath-smart-bottle",
    category: "wellness",
    categoryId: "cat-wellness",
    sellerId: "seller-nova",
    description:
      "Hydration cues, insulated stainless steel, and a clean companion app for daily habit tracking.",
    price: 69,
    salePrice: 54,
    stock: 120,
    badge: "Bundle ready",
    rating: 4.5,
    reviewsCount: 143,
    accent: "from-teal-200 via-cyan-100 to-white",
    specs: ["LED reminders", "24h cold", "App sync", "BPA free"],
  },
];

const featuredCollections = [
  {
    title: "Build a sharper workspace",
    copy: "Smart desks, lighting, and tools designed for momentum.",
    href: "/products?category=workspace",
  },
  {
    title: "Sound built for focus",
    copy: "Audio gear tuned for flow state, travel, and recovery.",
    href: "/products?category=audio",
  },
  {
    title: "Rituals for recovery",
    copy: "Wellness products that fit a demanding weekly rhythm.",
    href: "/products?category=wellness",
  },
];

const cartItems = [
  {
    id: "cart-1",
    productSlug: "aurora-wireless-headphones",
    name: "Aurora Wireless Headphones",
    price: 199,
    quantity: 1,
  },
  {
    id: "cart-2",
    productSlug: "luma-focus-lamp",
    name: "Luma Focus Lamp",
    price: 99,
    quantity: 2,
  },
];

const orders = [
  {
    id: "ORD-1042",
    customer: "Avery Brooks",
    status: "PROCESSING",
    createdAt: "2026-05-02",
    total: 397,
    items: 3,
    fulfillment: [
      { label: "Order placed", complete: true },
      { label: "Payment confirmed", complete: true },
      { label: "Warehouse processing", complete: true },
      { label: "Shipped", complete: false },
      { label: "Delivered", complete: false },
    ],
  },
  {
    id: "ORD-1041",
    customer: "Jordan Lee",
    status: "SHIPPED",
    createdAt: "2026-04-28",
    total: 799,
    items: 1,
    fulfillment: [
      { label: "Order placed", complete: true },
      { label: "Payment confirmed", complete: true },
      { label: "Warehouse processing", complete: true },
      { label: "Shipped", complete: true },
      { label: "Delivered", complete: false },
    ],
  },
];

const adminMetrics = [
  { label: "Revenue", value: "$184K", hint: "+12.4% vs last month" },
  { label: "Orders", value: "1,284", hint: "87 awaiting fulfillment" },
  { label: "Active sellers", value: "42", hint: "6 pending approval" },
  { label: "Conversion", value: "4.9%", hint: "Up from 4.1%" },
];

const sellerMetrics = [
  { label: "Gross sales", value: "$42.8K", hint: "30-day window" },
  { label: "Open orders", value: "23", hint: "5 require action today" },
  { label: "Top product", value: "Atlas Desk", hint: "31 units sold" },
  { label: "Store rating", value: "4.8", hint: "Across 94 reviews" },
];

export function getCategories() {
  return categories;
}

export function getFeaturedProducts() {
  return products.slice(0, 4);
}

export function getFeaturedCollections() {
  return featuredCollections;
}

export function getCartItems() {
  return cartItems;
}

export function getOrders() {
  return orders;
}

export function getAdminMetrics() {
  return adminMetrics;
}

export function getSellerMetrics() {
  return sellerMetrics;
}

export function getSellers() {
  return sellers;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getRelatedProducts(categoryId, slug) {
  return products
    .filter((product) => product.categoryId === categoryId && product.slug !== slug)
    .slice(0, 3);
}

export function queryProducts(filters = {}) {
  const {
    category = "",
    q = "",
    sort = "featured",
    availability = "",
    price = "",
  } = filters;

  let result = [...products];

  if (category) {
    result = result.filter((product) => product.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  if (availability === "in-stock") {
    result = result.filter((product) => product.stock > 0);
  }

  if (price === "under-100") {
    result = result.filter((product) => (product.salePrice ?? product.price) < 100);
  }

  if (price === "100-300") {
    result = result.filter((product) => {
      const amount = product.salePrice ?? product.price;
      return amount >= 100 && amount <= 300;
    });
  }

  if (sort === "price-asc") {
    result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
  } else if (sort === "price-desc") {
    result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
  } else if (sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}
