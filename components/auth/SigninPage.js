'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function SigninPage() {
    const router = useRouter()
    const [userDetail, setUserDetail] = useState({

        email: "",
        password: "",
        userType: ""
    })

    const signinHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetail)
            });

            const data = await res.json();
            console.log(data);
            if (res.ok) {
                toast.success(" ورود با موفقیت انجام شد")

                router.replace("/");

            } else {
                toast.error("مشکلی پیش آمده است")
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("مشکلی پیش آمده است")
        }
    }
    return (
        <div className="font-Dana min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center items-center flex-1  h-[700px]">
                <div className="md:w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12 ">
                    <div>
                        {/* <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
            className="w-32 mx-auto" /> */}
                    </div>
                    <div className=" flex flex-col items-center justify-center h-full">
                        <h1 className="text-2xl xl:text-3xl font-medium">
                            به سامانه همکار خوش آمدید
                        </h1>
                        <div className="w-full flex-1 mt-8">

                            <div className="mx-auto max-w-xs">
                                <div className="flex items-center gap-x-4">
                                    <label className="flex items-center ">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="Developer"
                                            checked={userDetail.userType === "Developer"}
                                            onChange={e => setUserDetail(userDetail => ({ ...userDetail, userType: e.target.value }))}
                                        />
                                        <span className="mr-1">برنامه‌نویس</span>
                                    </label>

                                    <label className="flex items-center ">
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="Employer"
                                            checked={userDetail.userType === "Employer"}
                                            onChange={e => setUserDetail(userDetail => ({ ...userDetail, userType: e.target.value }))}
                                        />
                                        <span className="mr-1">کارفرما</span>
                                    </label>
                                </div>
                                <input
                                    value={userDetail.email}
                                    onChange={e => setUserDetail({ ...userDetail, email: e.target.value })}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email" placeholder="ایمیل" />
                                <input
                                    value={userDetail.password}
                                    onChange={e => setUserDetail({ ...userDetail, password: e.target.value })}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="رمز عبور" />
                                <button
                                    onClick={signinHandler}
                                    className="flex items-center gap-x-2 mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full cursor-pointer py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out  justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        ورود
                                    </span>
                                </button>
                                <div className='flex items-center gap-x-2 mt-2 text-sm'>
                                    <span className='text-gray-400 '>قبلا عضو شده اید؟</span>
                                    <Link href="/signup" className='text-indigo-700 text-base border-b border-b-indigo-300 border-dashed'>
                                        ورود
                                    </Link>
                                </div>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    من موافقم که از
                                    <a href="#" className="ml-1 border-b border-gray-500 border-dotted">
                                        شرایط خدمات
                                    </a>
                                    و
                                    <a href="#" className="mr-1 border-b border-gray-500 border-dotted">
                                        سیاست حفظ حریم خصوصی
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="  xl:w-7/12 h-full bg-indigo-100 text-center hidden lg:flex">
                    <div className="bg-[url('/svgs/signin-bg.svg')]  w-full bg-contain bg-center bg-no-repeat"
                    >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninPage
