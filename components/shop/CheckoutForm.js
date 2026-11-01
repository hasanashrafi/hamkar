"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatKg, formatToman } from "@/lib/format";
import { useCart } from "./CartProvider";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-8 text-center text-slate-600">
        سبد خالی است. ابتدا محصول اضافه کنید.
      </p>
    );
  }

  async function submit(event) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((item) => ({
            productId: item.productId,
            kg: item.kg,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "ثبت سفارش انجام نشد.");
        return;
      }
      clear();
      router.push(`/order/success?id=${data.id}`);
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-800">اطلاعات تحویل</h2>
        <label className="block space-y-1 text-sm">
          <span>نام و نام خانوادگی</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500"
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>موبایل</span>
          <input
            required
            dir="ltr"
            inputMode="numeric"
            placeholder="09123456789"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500"
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>آدرس</span>
          <textarea
            required
            rows={3}
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500"
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>یادداشت (اختیاری)</span>
          <textarea
            rows={2}
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500"
          />
        </label>
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-700 disabled:bg-slate-400"
        >
          {pending ? "در حال ثبت..." : "ثبت سفارش"}
        </button>
      </form>
      <aside className="h-fit space-y-3 rounded-2xl border border-emerald-100 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-800">خلاصه سفارش</h2>
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm text-slate-600">
            <span>
              {item.name} × {formatKg(item.kg)}
            </span>
            <span>{formatToman(item.kg * item.pricePerKg)}</span>
          </div>
        ))}
        <p className="border-t border-emerald-100 pt-3 font-semibold text-emerald-800">
          جمع کل: {formatToman(total)}
        </p>
      </aside>
    </div>
  );
}
