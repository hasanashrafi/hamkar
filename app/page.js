import Catalog from "@/components/shop/Catalog";
import { getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-8 rounded-3xl bg-emerald-800 px-6 py-10 text-white">
        <p className="text-sm text-emerald-100">فروش عمده و جزئی</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">فروشگاه حبوبات</h1>
        <p className="mt-3 max-w-xl text-emerald-50">
          عدس، لوبیا، نخود و لپه را به کیلو انتخاب کنید و سفارش خود را ثبت کنید.
        </p>
      </section>
      <Catalog products={products} />
    </main>
  );
}
