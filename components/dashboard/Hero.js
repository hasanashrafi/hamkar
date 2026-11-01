"use client";

import Image from "next/image";

export default function Hero({ userDetail }) {
    const displayName = userDetail?.fullName || [userDetail?.firstName, userDetail?.lastName].filter(Boolean).join(" ") || "کاربر";
    const title = userDetail?.role || "به دنبال فرصت‌های بهتر";
    const city = userDetail?.city || "";

    return (
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg sm:p-10">
            <div className="relative z-10 grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
                <div>
                    
                    <h1 className="mt-10 text-2xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                        {displayName}، مسیر شغلی‌ات را مدرن کن
                    </h1>
                    <p className="mt-3 text-slate-600">
                        {title}
                        {city ? ` • ${city}` : ""}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                       
                        <a href="#jobs" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50">جستجوی فرصت‌ها</a>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4 sm:w-[420px]">
                        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                            <div className="text-xs text-slate-500">پروژه‌ها</div>
                            <div className="text-xl font-bold text-emerald-700">{userDetail?.totalProjects ?? 0}</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                            <div className="text-xs text-slate-500">تکمیل پروفایل</div>
                            <div className="text-xl font-bold text-emerald-700">{userDetail?.profileCompletion ?? 0}%</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                            <div className="text-xs text-slate-500">وضعیت</div>
                            <div className="text-xl font-bold text-emerald-700">{userDetail?.isAvailable ? "آماده" : "مشغول"}</div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
                    <div className="absolute -inset-6 -z-10 rotate-6 rounded-[2rem] bg-gradient-to-tr from-emerald-100 to-emerald-50 blur-2xl"></div>
                    <Image
                        src="/images/head-bg.jpg"
                        alt="Hero"
                        width={560}
                        height={560}
                        className="rounded-3xl shadow-xl"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-10 mt-6 rounded-2xl  bg-gradient-to-r from-green-500 to-green-400 p-4 text-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-base">مورد اعتماد +۱۰۰ شرکت</div>
                    <div className="flex flex-wrap items-center gap-4 opacity-90">
                        <span className="text-xs">Luminous</span>
                        <span className="text-xs">FocalPoint</span>
                        <span className="text-xs">Polyforms</span>
                        <span className="text-xs">Alfa-Shift</span>
                        <span className="text-xs">Netrache</span>
                    </div>
                </div>
            </div>

            <div className="absolute right-6 top-6 hidden h-2 w-2 items-center justify-center rounded-full bg-white/60 shadow backdrop-blur sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
        </section>
    );
}


