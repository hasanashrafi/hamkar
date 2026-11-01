"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/navigation';

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import KpiCards from "@/components/dashboard/KpiCards";
import ProfileForm from "@/components/dashboard/ProfileForm";
import ProjectsSection from "@/components/dashboard/ProjectsSection";
import ResumeSection from "@/components/dashboard/ResumeSection";
import OffersSection from "@/components/dashboard/OffersSection";
import SupportSection from "@/components/dashboard/SupportSection";
import SuggestedJobs from "@/components/dashboard/SuggestedJobs";
import QuickActions from "../dashboard/QuickActions";
import Hero from "@/components/dashboard/Hero";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("profile");
  const [loadingUser, setLoadingUser] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    skills: [],
    experienceYears: 0,
    githubUrl: "",
    portfolioUrl: "",
    resumeUrl: "",
    projects: [],
    profilePicture: "",
    salaryExpectation: 0,
    isAvailable: true,
    createdAt: "",
    updatedAt: "",
  });

  const [userDetail, setUserDetail] = useState({})

  const sections = useMemo(
    () => [
      { key: "profile", label: "پروفایل من" },
      { key: "offers", label: "دعوت‌ها" },
      { key: "resume", label: "رزومه" },
      { key: "support", label: "پشتیبانی" },
      { key: "projects", label: "پروژه‌ها" },
    ],
    []
  );
  const token = Cookies.get("token");
  useEffect(() => {
    // Fetch user data from the backend API
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchUser(token);
  }, [router, token]);

  const fetchUser = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // Prevents Next.js from caching the request
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const payload = await res.json();
      console.log(payload);
      const user = payload?.data ?? payload;
      setUserDetail((prev) => ({ ...prev, ...user }));

    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoadingUser(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <Sidebar sections={sections} activeKey={activeKey} setActiveKey={setActiveKey} />

        {/* Main */}
        <main className="flex-1">
          <Header formData={formData} setFormData={setFormData} />
          <Hero userDetail={userDetail} loading={loadingUser} />

          <KpiCards loading={loadingUser} />

          {/* Quick Actions */}
          <QuickActions userDetail={userDetail} />

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
            {activeKey === "profile" && (
              <ProfileForm
                formData={formData}
                setFormData={setFormData}
                userDetail={userDetail}
                
              />
            )}
            {activeKey === "projects" && <ProjectsSection formData={formData} setFormData={setFormData} />}
            {activeKey === "resume" && <ResumeSection formData={formData} setFormData={setFormData} />}
            {activeKey === "offers" && <OffersSection userDetail={userDetail} loading={loadingUser} />}
            {activeKey === "support" && <SupportSection />}
          </div>

          <SuggestedJobs userDetail={userDetail} loading={loadingUser} />
        </main>
      </div>
    </div>
  );
}
