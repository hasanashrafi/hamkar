"use client";

import Link from "next/link";
import { formatKg, formatToman } from "@/lib/format";
import { useCart } from "./CartProvider";

export default function CartView() {
  const { items, total, updateKg, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-emerald-200 bg-white p-8 text-center">
        <p className="text-slate-600">سبد خرید خالی است.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 hover:underline">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-semibold text-slate-800">{item.name}</h2>
              <p className="text-sm text-slate-500">{formatToman(item.pricePerKg)} / کیلو</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-200">
                <button type="button" className="px-3 py-2" onClick={() => updateKg(item.productId, item.kg - 0.5)}>
                  −
                </button>
                <span className="min-w-12 text-center text-sm">{formatKg(item.kg)}</span>
                <button type="button" className="px-3 py-2" onClick={() => updateKg(item.productId, item.kg + 0.5)}>
                  +
                </button>
              </div>
              <span className="min-w-28 text-left text-sm font-medium text-emerald-700">
                {formatToman(item.kg * item.pricePerKg)}
              </span>
              <button type="button" className="text-sm text-rose-600" onClick={() => remove(item.productId)}>
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-emerald-700 p-5 text-white sm:flex-row sm:items-center">
        <p className="text-lg font-semibold">جمع کل: {formatToman(total)}</p>
        <Link href="/checkout" className="rounded-xl bg-white px-5 py-2 text-sm font-medium text-emerald-800">
          ثبت سفارش
        </Link>
      </div>
    </div>
  );
}
