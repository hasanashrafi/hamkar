"use client";

import { useMemo, useState } from "react";
import { ORDER_STATUSES, formatKg, formatToman, statusLabel } from "@/lib/format";

export default function OrdersAdmin({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [error, setError] = useState("");

  const counts = useMemo(() => {
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
  }, [orders]);

  async function changeStatus(id, status) {
    setError("");
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "به‌روزرسانی انجام نشد.");
      return;
    }
    setOrders((current) => current.map((order) => (order.id === id ? data : order)));
  }

  if (orders.length === 0) {
    return <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-8 text-center">هنوز سفارشی ثبت نشده است.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {ORDER_STATUSES.map((status) => (
          <span key={status.id} className="rounded-full bg-white px-3 py-1 ring-1 ring-emerald-100">
            {status.label}: {counts[status.id] || 0}
          </span>
        ))}
      </div>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="rounded-2xl border border-emerald-100 bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold text-slate-800">
                  {order.id} — {order.customer.name}
                </p>
                <p className="text-sm text-slate-500" dir="ltr">
                  {order.customer.phone}
                </p>
                <p className="mt-1 text-sm text-slate-600">{order.customer.address}</p>
                {order.customer.note ? (
                  <p className="mt-1 text-sm text-amber-700">یادداشت: {order.customer.note}</p>
                ) : null}
              </div>
              <div className="text-sm">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">
                  {statusLabel(order.status)}
                </span>
                <p className="mt-2 font-medium text-emerald-800">{formatToman(order.total)}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1 border-t border-emerald-50 pt-3 text-sm text-slate-600">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.productId}`}>
                  {item.name} — {formatKg(item.kg)} — {formatToman(item.kg * item.pricePerKg)}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {ORDER_STATUSES.map((status) => (
                <button
                  key={status.id}
                  type="button"
                  disabled={order.status === status.id}
                  onClick={() => changeStatus(order.id, status.id)}
                  className="rounded-xl px-3 py-1 text-sm ring-1 ring-emerald-200 disabled:bg-emerald-600 disabled:text-white"
                >
                  {status.label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
