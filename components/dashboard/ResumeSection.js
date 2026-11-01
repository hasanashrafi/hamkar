"use client";

export default function ResumeSection() {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        رزومه
      </h3>
      <p className="mb-4 text-sm text-gray-600">رزومه PDF خود را بارگذاری کنید یا از نسخه آنلاین استفاده کنید.</p>
      <div className="flex items-center gap-3">
        <input type="file" className="rounded-md border border-gray-300 p-2" />
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">آپلود</button>
      </div>
    </div>
  );
}
