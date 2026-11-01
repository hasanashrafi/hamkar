"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";

export default function SuggestedJobs({ userDetail, loading }) {
  const jobs = [
    {
      title: "توسعه‌دهنده فرانت‌اند React",
      company: "شرکت نمونه",
      location: "تهران",
      type: "تمام‌وقت",
      tags: ["React", "TypeScript", "Tailwind"],
    },
    {
      title: "Full Stack Node.js",
      company: "شرکت فناوری",
      location: "اصفهان",
      type: "پاره‌وقت",
      tags: ["Node.js", "MongoDB", "Express"],
    },
  ];

  return (
    <Card className="mt-6">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-emerald-800">آگهی‌های متناسب با مهارت‌های شما</h3>
          <Link href="/jobs" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            مشاهده همه
          </Link>
        </div>

        {loading ? (
          <ul className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="animate-pulse rounded-xl border border-emerald-100 bg-white p-4">
                <div className="h-4 w-40 rounded bg-emerald-100" />
                <div className="mt-3 h-3 w-56 rounded bg-emerald-50" />
                <div className="mt-3 flex gap-2">
                  <div className="h-5 w-14 rounded-full bg-emerald-50" />
                  <div className="h-5 w-14 rounded-full bg-emerald-50" />
                  <div className="h-5 w-14 rounded-full bg-emerald-50" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3">
            {jobs.map((job, i) => (
              <li
                key={i}
                className="group flex flex-col gap-3 rounded-xl border border-emerald-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-emerald-800">{job.title}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {job.company} • {job.location} • {job.type}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs text-emerald-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md bg-emerald-600 px-3 py-2 text-white shadow-sm hover:bg-emerald-700">درخواست</button>
                  <button className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-700 hover:bg-emerald-100">ذخیره</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
