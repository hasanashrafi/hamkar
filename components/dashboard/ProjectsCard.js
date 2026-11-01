export default function ProjectsCard() {
    return (
        <section className="backdrop-blur-lg bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-8">
            <h3 className="text-2xl font-black text-white mb-6 drop-shadow">پروژه‌ها و نمونه کارها</h3>
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-8 bg-white/30 rounded-2xl p-6 shadow-lg">
                    <img src="/images/logo.jpg" alt="Project" className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl" />
                    <div>
                        <span className="font-bold text-white text-xl">Job Board Platform</span>
                        <a href="https://github.com/hasanashrafi/hamkar" target="_blank" rel="noopener" className="ml-4 text-pink-200 underline text-base font-bold">مشاهده پروژه</a>
                    </div>
                </div>
                <div className="flex items-center gap-8 bg-white/30 rounded-2xl p-6 shadow-lg">
                    <img src="/images/logo.jpg" alt="Project" className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl" />
                    <div>
                        <span className="font-bold text-white text-xl">Resume Builder</span>
                        <a href="#" className="ml-4 text-pink-200 underline text-base font-bold">مشاهده دمو</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
