"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function Catalog({ products }) {
  const [category, setCategory] = useState("همه");
  const categories = useMemo(
    () => ["همه", ...new Set(products.map((product) => product.category))],
    [products]
  );
  const visible = products.filter(
    (product) => category === "همه" || product.category === category
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm ${
              category === item
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-emerald-100 hover:bg-emerald-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
