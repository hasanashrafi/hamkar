"use client";

export default function KpiCards({ loading }) {
  const kpis = [
    { label: "درخواست‌ها", value: "12" },
    { label: "مصاحبه‌ها", value: "3" },
    { label: "پیام‌ها", value: "5" },
    { label: "تکمیل پروفایل", value: "80%" },
  ];

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-myFont">
      {loading
        ? Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="animate-pulse rounded-2xl border border-emerald-100 bg-white p-5">
            <div className="h-3 w-20 rounded bg-emerald-50" />
            <div className="mt-3 h-6 w-16 rounded bg-emerald-100" />
          </div>
        ))
        : kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-white p-5 shadow-md transition hover:scale-[1.03] hover:shadow-lg"
          >
            <div className="mb-1 text-sm text-slate-600">{kpi.label}</div>
            <div className="mt-1 text-3xl font-extrabold text-emerald-700">{kpi.value}</div>
          </div>
        ))}
    </div>
  );
}
