export default function SkillsCard() {
    return (
        <section className="backdrop-blur-lg bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-8">
            <h3 className="text-2xl font-black text-white mb-6 drop-shadow">مهارت‌ها و زبان‌ها</h3>
            <div className="flex flex-wrap gap-4">
                <span className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-bold shadow-lg">React</span>
                <span className="px-5 py-3 rounded-2xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white text-lg font-bold shadow-lg">Node.js</span>
                <span className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-lg font-bold shadow-lg">Tailwind</span>
                <span className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-white text-lg font-bold shadow-lg">JavaScript</span>
                <span className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white text-lg font-bold shadow-lg">Git</span>
                <span className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-white text-lg font-bold shadow-lg">SPA</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
                <span className="px-4 py-2 rounded-xl bg-white/30 text-white text-base font-bold shadow-lg">English: Intermediate</span>
                <span className="px-4 py-2 rounded-xl bg-white/30 text-white text-base font-bold shadow-lg">Turkish: Upper Intermediate</span>
            </div>
        </section>
    );
}
