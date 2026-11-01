export default function UserInfoCard() {
    return (
        <section className="backdrop-blur-lg bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-8">
            <div className="flex items-center gap-8">
                <img src="/images/profile.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-xl" />
                <div>
                    <h3 className="text-3xl font-black text-white drop-shadow">حسن اشرفی</h3>
                    <p className="text-lg text-white/80 font-bold">توسعه‌دهنده وب و موبایل</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-6">
                <div className="bg-white/30 rounded-2xl p-6 shadow-lg">
                    <span className="text-xs text-blue-400 font-bold">ایمیل</span>
                    <p className="text-base text-white">hasanashrafi@gmail.com</p>
                </div>
                <div className="bg-white/30 rounded-2xl p-6 shadow-lg">
                    <span className="text-xs text-blue-400 font-bold">شهر</span>
                    <p className="text-base text-white">تهران</p>
                </div>
                <div className="bg-white/30 rounded-2xl p-6 shadow-lg">
                    <span className="text-xs text-blue-400 font-bold">وضعیت نظام وظیفه</span>
                    <p className="text-base text-white">پایان خدمت</p>
                </div>
                <div className="bg-white/30 rounded-2xl p-6 shadow-lg">
                    <span className="text-xs text-blue-400 font-bold">تاریخ تولد</span>
                    <p className="text-base text-white">1375/01/01</p>
                </div>
            </div>
        </section>
    );
}
