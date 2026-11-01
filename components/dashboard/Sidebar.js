'use client'
import { useState } from "react";

export default function Sidebar() {
  const sections = [
    { key: "profile", label: "پروفایل" },
    { key: "skills", label: "مهارت‌ها" },
    { key: "projects", label: "پروژه‌ها" },
    { key: "settings", label: "تنظیمات" },
  ];
  const [activeKey, setActiveKey] = useState("profile");
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
        <img src="/images/logo.jpg" alt="لوگو" className="w-10 h-10 rounded-full border border-gray-200" />
        <span className="text-lg font-bold text-gray-700">داشبورد جاب‌ویژن</span>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {sections.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveKey(item.key)}
                className={`w-full rounded-lg px-4 py-2 text-right text-base font-medium transition ${activeKey === item.key
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
