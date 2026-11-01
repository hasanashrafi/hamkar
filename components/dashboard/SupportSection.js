"use client";

export default function SupportSection() {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        پشتیبانی
      </h3>
      <p className="mb-4 text-sm text-gray-600">سؤالی یا مشکلی دارید؟ با تیم پشتیبانی در ارتباط باشید.</p>
      <textarea
        placeholder="پیام خود را بنویسید..."
        className="mb-3 w-full rounded-md border border-slate-300 p-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">ارسال</button>
    </div>
  );
}
