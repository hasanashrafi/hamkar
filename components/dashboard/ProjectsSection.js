"use client";

export default function ProjectsSection() {
  const projects = [
    { title: "پنل مدیریت React", link: "https://demo1.com" },
    { title: "وب‌اپلیکیشن Next.js", link: "https://demo2.com" },
  ];

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        پروژه‌ها
      </h3>
      <ul className="space-y-3">
        {projects.map((p, i) => (
          <li key={i} className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span>{p.title}</span>
            <a href={p.link} target="_blank" className="text-emerald-600 hover:text-emerald-700">
              مشاهده دمو
            </a>
          </li>
        ))}
      </ul>
      <button className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">افزودن پروژه جدید</button>
    </div>
  );
}
