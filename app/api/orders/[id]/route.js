import { NextResponse } from "next/server";
import { ORDER_STATUSES } from "@/lib/format";
import { getOrders, getProducts, saveOrders, saveProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const nextStatus = body?.status;
  const allowed = ORDER_STATUSES.map((item) => item.id);

  if (!allowed.includes(nextStatus)) {
    return NextResponse.json({ error: "وضعیت نامعتبر است." }, { status: 400 });
  }

  const orders = await getOrders();
  const order = orders.find((item) => item.id === id);
  if (!order) {
    return NextResponse.json({ error: "سفارش پیدا نشد." }, { status: 404 });
  }

  if (order.status !== "cancelled" && nextStatus === "cancelled") {
    const products = await getProducts();
    for (const item of order.items) {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        product.stockKg = Number((product.stockKg + item.kg).toFixed(1));
      }
    }
    await saveProducts(products);
  }

  order.status = nextStatus;
  await saveOrders(orders);
  return NextResponse.json(order);
}
