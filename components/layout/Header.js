'use client'

import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


function Header() {
  const [isLogin, setIsLogin] = useState(false)
  const getToken = Cookies.get("token")

  useEffect(() => {
    if (getToken) {
      setIsLogin(true)
    }
  }, [getToken])
  return (
    <div>
      <div className='container mx-auto  p-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-3'>
            <h1 className='text-zinc-700 text-2xl font-bold -tracking-tighter'>همکار</h1>

            <Link href='/'>
              صفحه اصلی
            </Link>
          </div>
          <div className='flex items-center gap-x-3'>
            {
              isLogin ? (
                <Link href='/dashboard'>
                  پروفایل
                </Link>
              ) : (
                <Link href='/signup'>
                  ورود | ثبت نام
                </Link>
              )
            }



          </div>
        </div>
      </div>
    </div>
  )
}

export default Header