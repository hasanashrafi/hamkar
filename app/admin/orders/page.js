import OrdersAdmin from "@/components/shop/OrdersAdmin";
import { getOrders } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">سفارش‌های ثبت‌شده</h1>
      <OrdersAdmin initialOrders={sorted} />
    </main>
  );
}
