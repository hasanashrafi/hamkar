import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-12 border-t border-emerald-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>فروشگاه حبوبات — فروش و ثبت سفارش</p>
        <Link href="/admin/orders" className="hover:text-emerald-700">
          مدیریت سفارش‌ها
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
