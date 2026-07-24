"use client";

// ─── Storage Keys ────────────────────────────────────────────────────────────
const KEYS = {
  cart: "ft_cart",
  favorites: "ft_favorites",
  orders: "ft_orders",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function load(key) {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function save(key, data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Cart ────────────────────────────────────────────────────────────────────
export function getCart() {
  return load(KEYS.cart);
}

export function addToCart(jersey) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === jersey.id);
  if (existing) {
    existing.quantity = (existing.quantity ?? 1) + 1;
  } else {
    cart.push({ ...jersey, quantity: 1 });
  }
  save(KEYS.cart, cart);
  return cart;
}

export function removeFromCart(jerseyId) {
  const cart = getCart().filter((item) => item.id !== jerseyId);
  save(KEYS.cart, cart);
  return cart;
}

export function clearCart() {
  save(KEYS.cart, []);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + (item.quantity ?? 1), 0);
}

// ─── Favorites ───────────────────────────────────────────────────────────────
export function getFavorites() {
  return load(KEYS.favorites);
}

export function toggleFavorite(jersey) {
  const favs = getFavorites();
  const idx = favs.findIndex((f) => f.id === jersey.id);
  if (idx === -1) {
    favs.push(jersey);
  } else {
    favs.splice(idx, 1);
  }
  save(KEYS.favorites, favs);
  return favs;
}

export function isFavorite(jerseyId) {
  return getFavorites().some((f) => f.id === jerseyId);
}

// ─── Orders ──────────────────────────────────────────────────────────────────
export function getOrders() {
  return load(KEYS.orders);
}

export function placeOrder(cartItems) {
  const orders = getOrders();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );
  const order = {
    id: "ORD-" + Date.now().toString(36).toUpperCase(),
    items: cartItems,
    total,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: "Processing",
  };
  orders.unshift(order);
  save(KEYS.orders, orders);
  clearCart();
  return order;
}
