import Sidebar from "./Sidebar";
import Header from "./Header";
import UserInfoCard from "./UserInfoCard";
import SkillsCard from "./SkillsCard";
import ProjectsCard from "./ProjectsCard";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col font-sans">
            <Header />
            <div className="flex flex-1 gap-8 px-4 md:px-8 lg:px-16 py-8">
                <Sidebar />
                <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
                    <UserInfoCard />
                    <SkillsCard />
                    <ProjectsCard />
                </main>
            </div>
            <footer className="w-full py-6 mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-center text-white text-sm rounded-t-2xl shadow-inner">
                © 2025 Hamkar Modern Dashboard
            </footer>
        </div>
    );
}
