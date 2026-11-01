export const CART_STORAGE_KEY = "legumes-cart";
export const CART_EVENT = "legumes-cart-change";

export function getCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setCart(items) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(product, kg = 1) {
  const items = getCart();
  const existing = items.find((item) => item.productId === product.id);
  const nextKg = Number((existing ? existing.kg + kg : kg).toFixed(1));
  const next = existing
    ? items.map((item) =>
        item.productId === product.id ? { ...item, kg: nextKg, name: product.name, pricePerKg: product.pricePerKg } : item
      )
    : [
        ...items,
        {
          productId: product.id,
          name: product.name,
          kg: Number(kg.toFixed(1)),
          pricePerKg: product.pricePerKg,
        },
      ];
  setCart(next);
  return next;
}

export function updateCartKg(productId, kg) {
  const nextKg = Number(kg.toFixed(1));
  const items = getCart()
    .map((item) => (item.productId === productId ? { ...item, kg: nextKg } : item))
    .filter((item) => item.kg > 0);
  setCart(items);
  return items;
}

export function removeFromCart(productId) {
  const items = getCart().filter((item) => item.productId !== productId);
  setCart(items);
  return items;
}

export function clearCart() {
  setCart([]);
}

export function cartCount(items) {
  return items.reduce((sum, item) => sum + item.kg, 0);
}

export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.kg * item.pricePerKg, 0);
}
