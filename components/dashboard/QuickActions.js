"use client";

export default function QuickActions({ userDetail }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <button className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">به‌روزرسانی رزومه</button>
      <button className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">افزودن پروژه</button>
      <button className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">مشاهده آگهی‌ها</button>
    </div>
  );
}
