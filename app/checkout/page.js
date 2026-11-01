import CheckoutForm from "@/components/shop/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">ثبت سفارش</h1>
      <CheckoutForm />
    </main>
  );
}
