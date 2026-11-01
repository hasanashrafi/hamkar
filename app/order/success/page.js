import Link from "next/link";

export default async function OrderSuccessPage({ searchParams }) {
  const params = await searchParams;
  const id = params?.id ?? "—";

  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="rounded-3xl border border-emerald-100 bg-white p-8">
        <p className="text-emerald-700">سفارش ثبت شد</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-800">شماره سفارش: {id}</h1>
        <p className="mt-3 text-slate-500">به‌زودی برای هماهنگی ارسال با شما تماس می‌گیریم.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-2 text-white">
          بازگشت به فروشگاه
        </Link>
      </div>
    </main>
  );
}
