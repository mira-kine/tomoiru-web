'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <nav className="fixed shadow-navbar w-full bg-white text-licorice h-20 z-12">
      <div className="block relative h-18 tablet:flex tablet:justify-between tablet:items-center tablet:h-20 tablet:ml-8 tablet:w-11/12 tablet:max-w-screen-lg">
        <input type="checkbox" name="" id="" className="hidden absolute block h-8 w-12 top-0 left-3.5 z-5 opacity-0"/>
        <div className="block h-5 w-9 absolute z-2 top-2.5 left-5 flex flex-col justify-between tablet:hidden checked:translate-x-0">
          <span className="block h-1 w-full rounded-xl bg-licorice transform ease-in-out origin-center duration-300 checked:translate-x-35"></span>
          <span className="block h-1 w-full rounded-xl bg-licorice duration-300 line2"></span>
          <span className="block h-1 w-full rounded-xl bg-licorice origin-bottom duration-300  line3"></span>
        </div>
          {/* pt-5 bg-white h-1/2 max-w-[200px] flex flex-col -ml-10 pl-12 shadow-navbar transition ease-in-out duration-500 */}
        <ul className="tablet:flex tablet:flex-row tablet:w-11/12 tablet:relative tablet:items-center tablet:order-2">
          {/* add conditional later */}
            <>
              <li className="list-none ml-6 mb-2 text-lg tablet:text-xl desktop:text-2xl font-sans font-semibold">
                <Link className="text-licorice transition ease-in-out duration-300 hover:text-melon" href="/dashboard">Home</Link>
              </li>
               <li className="list-none ml-6 mb-2 text-lg tablet:text-xl desktop:text-2xl font-sans font-semibold">
                <Link className="text-licorice transition ease-in-out hover:text-melon" href="/chat">Chat</Link>
              </li>
               <li className="list-none ml-6 mb-2 text-lg tablet:text-xl desktop:text-2xl font-sans font-semibold">
                <Link className="text-licorice transition ease-in-out hover:text-melon" href="/" onClick={() => handleSignOut()}>
                  Sign Out
                </Link>
              </li>
            </>
           <li className="list-none ml-6 mb-2 text-lg tablet:text-xl desktop:text-2xl font-sans font-semibold">
            <Link className="text-licorice transition ease-in-out hover:text-melon" href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
