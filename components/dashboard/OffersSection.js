"use client";

export default function OffersSection({ userDetail, loading }) {
    const offers = [
        { company: "شرکت فناوران", position: "React Developer", status: "در انتظار پاسخ" },
        { company: "استارتاپ نمونه", position: "Full Stack", status: "مصاحبه برنامه‌ریزی شده" },
    ];

    return (
        <div className="font-myFont mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-900">دعوت‌ها از کارفرما</h3>
            {loading ? (
                <ul className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <li key={i} className="animate-pulse rounded-xl border border-emerald-100 bg-white p-4">
                            <div className="h-4 w-40 rounded bg-emerald-100" />
                            <div className="mt-3 h-3 w-56 rounded bg-emerald-50" />
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="space-y-4">
                    {offers.map((offer, i) => (
                        <li key={i} className="flex flex-col items-start justify-between rounded-xl border border-emerald-100 bg-white p-4 transition hover:shadow-md sm:flex-row sm:items-center">
                            <div>
                                <div className="font-semibold text-gray-900">{offer.company}</div>
                                <div className="mt-1 text-sm text-gray-600">دعوت برای موقعیت: {offer.position}</div>
                            </div>
                            <span className="mt-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 sm:mt-0">
                                {offer.status}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
