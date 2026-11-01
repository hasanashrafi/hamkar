"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";

function Header() {
  const { items } = useCart();
  const itemCount = items.length;

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-x-4">
          <Link href="/" className="border-l-2 border-l-emerald-500 pl-4 text-xl font-bold text-slate-800">
            حبوبات
          </Link>
          <Link href="/" className="hidden text-slate-600 hover:text-emerald-600 sm:inline">
            فروشگاه
          </Link>
          <Link href="/admin/orders" className="hidden text-slate-600 hover:text-emerald-600 sm:inline">
            سفارش‌ها
          </Link>
        </div>
        <Link
          href="/cart"
          className="relative flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-800 hover:bg-emerald-100"
        >
          <ShoppingBag size={18} />
          <span>سبد خرید</span>
          {itemCount > 0 ? (
            <span className="absolute -top-2 -left-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs text-white">
              {itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

export default Header;
