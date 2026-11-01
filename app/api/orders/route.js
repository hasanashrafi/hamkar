import { NextResponse } from "next/server";
import { getOrders, getProducts, saveOrders, saveProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

function validateOrder(body) {
  const name = String(body?.customer?.name ?? "").trim();
  const phone = String(body?.customer?.phone ?? "").trim();
  const address = String(body?.customer?.address ?? "").trim();
  const note = String(body?.customer?.note ?? "").trim();
  const items = Array.isArray(body?.items) ? body.items : [];

  if (name.length < 2) return "نام را وارد کنید.";
  if (!/^09\d{9}$/.test(phone)) return "شماره موبایل معتبر نیست.";
  if (address.length < 8) return "آدرس را کامل وارد کنید.";
  if (items.length === 0) return "سبد خرید خالی است.";
  for (const item of items) {
    if (!item.productId || !(Number(item.kg) > 0)) {
      return "اقلام سفارش نامعتبر است.";
    }
  }
  return { name, phone, address, note, items };
}

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(
    [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const validated = validateOrder(body);
  if (typeof validated === "string") {
    return NextResponse.json({ error: validated }, { status: 400 });
  }

  const products = await getProducts();
  const orderItems = [];

  for (const item of validated.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return NextResponse.json({ error: "یکی از محصولات پیدا نشد." }, { status: 400 });
    }
    const kg = Number(Number(item.kg).toFixed(1));
    if (kg > product.stockKg) {
      return NextResponse.json(
        { error: `موجودی ${product.name} کافی نیست.` },
        { status: 400 }
      );
    }
    product.stockKg = Number((product.stockKg - kg).toFixed(1));
    orderItems.push({
      productId: product.id,
      name: product.name,
      kg,
      pricePerKg: product.pricePerKg,
    });
  }

  const orders = await getOrders();
  const order = {
    id: `HB-${Date.now().toString().slice(-8)}`,
    status: "new",
    createdAt: new Date().toISOString(),
    customer: {
      name: validated.name,
      phone: validated.phone,
      address: validated.address,
      note: validated.note,
    },
    items: orderItems,
    total: orderItems.reduce((sum, item) => sum + item.kg * item.pricePerKg, 0),
  };

  orders.push(order);
  await saveProducts(products);
  await saveOrders(orders);

  return NextResponse.json(order, { status: 201 });
}
