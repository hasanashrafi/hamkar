export default function Header() {
  return (
    <header className="mb-4 rounded-2xl w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <img src="/images/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-gray-200" />
        <span className="text-xl font-bold text-gray-700">داشبورد </span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-base font-medium text-gray-700">حسن اشرفی</span>
        <img src="/images/profile.jpg" alt="Profile" className="w-10 h-10 rounded-full border border-gray-200" />
        <button className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 transition">خروج</button>
      </div>
    </header>
  );
}
