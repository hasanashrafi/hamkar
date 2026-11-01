import CartView from "@/components/shop/CartView";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">سبد خرید</h1>
      <CartView />
    </main>
  );
}
