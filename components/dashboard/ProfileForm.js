"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { VscVmConnect } from "react-icons/vsc";
import { TbFileCv } from "react-icons/tb";
import { FaGithub } from "react-icons/fa6";

export default function ProfileForm({ userDetail }) {
  const [newProject, setNewProject] = useState({ name: "", link: "", demo: "", image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(userDetail?.profilePicture || "");
  const [addProject, setAddProject] = useState(false)
  const [form, setForm] = useState({
    firstName: userDetail?.firstName || "",
    lastName: userDetail?.lastName || "",
    email: userDetail?.email || "",
    phone: userDetail?.phone || "",
    city: userDetail?.city || "",
    role: userDetail?.role || "",
    skills: Array.isArray(userDetail?.skills) ? userDetail.skills : [],
    experienceYears: userDetail?.experienceYears ?? 0,
    githubUrl: userDetail?.githubUrl || "",
    portfolioUrl: userDetail?.portfolioUrl || "",
    resumeUrl: userDetail?.resumeUrl || "",
    projects: Array.isArray(userDetail?.projects)
      ? userDetail.projects.map(p => ({
        name: p.name || "",
        link: p.link || "",
        image: p.image || null,
        demo: p.demo || ""
      }))
      : [],
    profilePicture: preview || null,
    salaryExpectation: userDetail?.salaryExpectation ?? 0,
    isAvailable: userDetail?.isAvailable ?? true,
  });

  useEffect(() => {
    setForm({
      firstName: userDetail?.firstName || "",
      lastName: userDetail?.lastName || "",
      email: userDetail?.email || "",
      phone: userDetail?.phone || "",
      city: userDetail?.city || "",
      role: userDetail?.role || "",
      skills: Array.isArray(userDetail?.skills) ? userDetail.skills : [],
      experienceYears: userDetail?.experienceYears ?? 0,
      githubUrl: userDetail?.githubUrl || "",
      portfolioUrl: userDetail?.portfolioUrl || "",
      resumeUrl: userDetail?.resumeUrl || "",
      projects: Array.isArray(userDetail?.projects)
        ? userDetail.projects.map(p => ({
          name: p.name || "",
          link: p.link || "",
          image: p.image || null,
          demo: p.demo || ""
        }))
        : [],
      profilePicture: preview || null,
      salaryExpectation: userDetail?.salaryExpectation ?? 0,
      isAvailable: userDetail?.isAvailable ?? true,
    });
    setPreview(userDetail?.profilePicture || "");
  }, [userDetail]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Fetch updated profile after save
  const fetchProfile = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/developers/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setForm({
        ...form,
        ...data.data,
        skills: Array.isArray(data.data.skills) ? data.data.skills : [],
        projects: Array.isArray(data.data.projects)
          ? data.data.projects.map(p => ({
            name: p.name || "",
            link: p.link || "",
            image: p.image || null,
            demo: p.demo || ""
          }))
          : [],
      });
      // Fix: handle absolute/relative profilePicture path
      let pic = data.data.profilePicture;
      if (pic && !pic.startsWith("http") && !pic.startsWith("/")) {
        pic = `/uploads/${pic}`;
      }
      setPreview(pic || "profile");
    }
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      if (!token) return;

      setSaving(true);

      const formData = new FormData();
      // Always send all fields, convert arrays to comma-separated strings
      formData.append("firstName", form.firstName || "");
      formData.append("lastName", form.lastName || "");
      formData.append("fullName", `${form.firstName} ${form.lastName}`.trim());
      formData.append("email", form.email || "");
      formData.append("phone", form.phone || "");
      formData.append("city", form.city || "");
      formData.append("role", form.role || "");
      formData.append("experienceYears", String(form.experienceYears || 0));
      formData.append("githubUrl", form.githubUrl || "");
      formData.append("portfolioUrl", form.portfolioUrl || "");
      formData.append("resumeUrl", form.resumeUrl || "");
      formData.append("salaryExpectation", String(form.salaryExpectation || 0));
      formData.append("isAvailable", String(!!form.isAvailable));
      formData.append("skills", Array.isArray(form.skills) ? form.skills.join(",") : String(form.skills || ""));
      // Send projects as JSON string and images separately
      if (Array.isArray(form.projects) && form.projects.length > 0) {
        form.projects.forEach((p) => {
          const { name, link, demo } = p;
          formData.append('projects[]', JSON.stringify({ name, link, demo }));
          if (p.image instanceof File) {
            formData.append('projectImages[]', p.image);
          }
        });
      }
      if (form.profilePicture instanceof File) {
        formData.append("profilePicture", form.profilePicture);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/developers/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setIsEditing(false);
        alert("پروفایل با موفقیت ذخیره شد!");
        await fetchProfile(); // update UI with new profile
      } else {
        alert(data?.message || "خطا در ذخیره پروفایل");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("خطا در ذخیره پروفایل");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold text-gray-900">پروفایل من</h3>

      <div className="mb-6 flex items-center gap-4">
        <img src={preview || "/images/logo.jpg"} alt="Profile" className="h-20 w-20 rounded-full border object-cover" />
        {isEditing && <input type="file" name="profilePicture" onChange={handleFileChange} />}
      </div>

      {!isEditing ? (
        <>
          <div className="grid grid-cols-1 gap-4 text-gray-900 sm:grid-cols-2">
            <p><strong>نام:</strong> {userDetail?.fullName || `${form.firstName} ${form.lastName}`.trim()}</p>
            <p><strong>ایمیل:</strong> {form.email}</p>
            <p><strong>نقش:</strong> {form.role || "-"}</p>
            <p><strong>شهر:</strong> {form.city || "-"}</p>
            <p><strong>شماره تماس:</strong> {form.phone || "-"}</p>
            <p><strong>وضعیت همکاری:</strong> {form.isAvailable ? "آماده همکاری" : "مشغول"}</p>
            <p><strong>تجربه:</strong> {form.experienceYears} سال</p>
            <p className="col-span-full"><strong>مهارت‌ها:</strong> {Array.isArray(form.skills) ? form.skills.join(", ") : String(form.skills || "-")}</p>
            <p><strong>حقوق مورد انتظار:</strong> {form.salaryExpectation ? `${form.salaryExpectation} تومان` : "-"}</p>
            <p><strong>تاریخ ایجاد:</strong> {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "-"}</p>
            <p><strong>تاریخ بروزرسانی:</strong> {form.updatedAt ? new Date(form.updatedAt).toLocaleDateString() : "-"}</p>
            <p className="col-span-full"><strong>پروژه‌ها:</strong></p>
            {Array.isArray(form.projects) && form.projects.length > 0 ? (
              <ul className="list-disc pl-4 col-span-full">
                {form.projects.map((p, idx) => (
                  <li key={idx}>
                    <span className="font-bold">{p.name}</span>
                    {p.link && (
                      <>
                        {", "}
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">لینک</a>
                      </>
                    )}
                    {p.demo && (
                      <>
                        {": "}
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">دمو آنلاین</a>
                      </>
                    )}
                    {p.image && typeof p.image === "string" && (
                      <img src={p.image} alt={p.name} className="inline-block h-8 w-8 rounded ml-2" />
                    )}
                  </li>
                ))}
              </ul>
            ) :
              <span className="col-span-full">-</span>}
          </div>
          <div className="flex  gap-5 mt-5">
            <Link href={userDetail?.githubUrl || form.githubUrl || "#"} className="text-2xl transition-all ease-in-out text-slate-600 hover:text-emerald-500"> <FaGithub />
</Link>
            <Link href={userDetail?.portfolioUrl || form.portfolioUrl || "#"} className="text-2xl transition-all ease-in-out text-slate-600 hover:text-emerald-500"><VscVmConnect />            </Link>
            <Link href={userDetail?.resumeUrl || form.resumeUrl || "#"} className="text-2xl transition-all ease-in-out text-slate-600 hover:text-emerald-500"><TbFileCv />
</Link>

          </div>          <div className="mt-6">
            <button type="button" onClick={() => setIsEditing(true)} className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">ویرایش پروفایل</button>
          </div>
        </>
      ) : (
        <form onSubmit={editProfileHandler}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="نام" />
            <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="نام خانوادگی" />
            <input name="email" value={form.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="ایمیل" />
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="شماره تماس" />
            <input name="city" value={form.city} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="شهر" />
            <input name="role" value={form.role} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="نقش/سمت" />
            <input name="skills" value={Array.isArray(form.skills) ? form.skills.join(", ") : form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="مهارت‌ها (با ویرگول جدا کنید)" />
            <input name="experienceYears" value={form.experienceYears} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="سال‌های تجربه" />
            <input name="salaryExpectation" value={form.salaryExpectation} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="حقوق مورد انتظار" />
            <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={!!form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} className="h-4 w-4 accent-emerald-600" />آماده همکاری</label>
            <input name="portfolioUrl" value={form.portfolioUrl} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Portfolio URL" />
            <input name="githubUrl" value={form.githubUrl} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="GitHub URL" />
            <input name="resumeUrl" value={form.resumeUrl} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Resume URL" />
            <div className="col-span-full">
              <label className="mb-1 block text-sm text-slate-700">پروژه‌ها (با ویرگول):</label>
              <button onClick={() => setAddProject(true)} type="button" className="  rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">اضافه کردن پروژه</button>
            </div>
            {
              addProject && (
                <div className="col-span-full border border-slate-300 rounded p-4 ">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label>اسم پروژه</label>
                      <input
                        type="text"
                        value={newProject.name}
                        onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label>لینک گیت هاب پروژه</label>
                      <input
                        type="text"
                        value={newProject.link}
                        onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label>دمو آنلاین پروژه</label>
                      <input
                        type="text"
                        value={newProject.demo}
                        onChange={e => setNewProject({ ...newProject, demo: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label>تصویر پروژه</label>
                      <input
                        type="file"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          setNewProject({ ...newProject, image: file || null });
                        }}
                        className="w-full border rounded-lg py-2 px-3 border-slate-300"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      className="rounded bg-emerald-600 px-3 py-1 text-white"
                      onClick={() => {
                        setForm({
                          ...form,
                          projects: [...form.projects, newProject]
                        });
                        setNewProject({ name: "", link: "", demo: "", image: null });
                        setAddProject(false);
                      }}
                    >ثبت پروژه</button>
                    <button
                      type="button"
                      className="rounded bg-slate-200 px-3 py-1 text-slate-700"
                      onClick={() => {
                        setNewProject({ name: "", link: "", demo: "", image: null });
                        setAddProject(false);
                      }}
                    >انصراف</button>
                  </div>
                </div>
              )
            }
            {form.projects.length > 0 && (
              <div className="col-span-full mt-4">
                <label className="block text-sm text-slate-700 mb-2">لیست پروژه‌های اضافه شده:</label>
                <ul className="list-disc pl-4">
                  {form.projects.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="font-bold">{p.name}</span>
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">لینک</a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">دمو آنلاین</a>}
                      {p.image && typeof p.image === "string" && <img src={p.image} alt={p.name} className="inline-block h-8 w-8 rounded ml-2" />}
                      <button type="button" className="text-xs text-red-600 ml-2" onClick={() => {
                        setForm(prev => ({
                          ...prev,
                          projects: prev.projects.filter((_, i) => i !== idx)
                        }));
                      }}>حذف</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="col-span-full">
              <label className="mb-1 block text-sm text-slate-700">تصویر پروفایل</label>
              <input type="file" onChange={handleFileChange} className="w-fit border rounded-lg py-2 px-3 border-slate-300" />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button type="submit" disabled={saving} className={`rounded-md px-4 py-2 text-white ${saving ? "bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"}`}>{saving ? "در حال ذخیره..." : "ذخیره تغییرات"}</button>
            <button type="button" onClick={() => setIsEditing(false)} className="rounded-md bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300">انصراف</button>
          </div>
        </form>
      )}
    </div>
  );
}
