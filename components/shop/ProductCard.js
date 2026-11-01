"use client";

import { useState } from "react";
import { formatKg, formatToman } from "@/lib/format";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [kg, setKg] = useState(1);
  const outOfStock = product.stockKg <= 0;
  const maxKg = Math.max(product.stockKg, 0);

  function changeKg(delta) {
    setKg((current) => {
      const next = Number((current + delta).toFixed(1));
      if (next < 0.5) return 0.5;
      if (next > maxKg) return maxKg || 0.5;
      return next;
    });
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
      <div className="h-36 overflow-hidden bg-amber-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{product.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{product.description}</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
            {product.category}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-emerald-700">{formatToman(product.pricePerKg)} / کیلو</span>
          <span className={outOfStock ? "text-rose-600" : "text-slate-500"}>
            {outOfStock ? "ناموجود" : `موجودی ${formatKg(product.stockKg)}`}
          </span>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-slate-200">
            <button
              type="button"
              className="px-3 py-2 text-lg"
              onClick={() => changeKg(-0.5)}
              disabled={outOfStock}
            >
              −
            </button>
            <span className="min-w-12 text-center text-sm">{formatKg(kg)}</span>
            <button
              type="button"
              className="px-3 py-2 text-lg"
              onClick={() => changeKg(0.5)}
              disabled={outOfStock}
            >
              +
            </button>
          </div>
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => add(product, kg)}
            className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            افزودن به سبد
          </button>
        </div>
      </div>
    </article>
  );
}
