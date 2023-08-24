"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState({id: ''});
  const [showNav, setShowNav] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser().catch((error) => {
      throw error;
    })
    router.refresh();
  }, []);

  return (
    <>
      {user?.id ? (
        <div className="w-1/12 z-20 flex ml-12 fixed">
          <div className="flex items-center p-4 justify-center z-30 mt-4">
            <div className="flex items-center">
              {/* <div className="dropdown"> */}
                <button className="bg-white/50 p-6 rounded-full hover:bg-white" onClick={() => {setShowNav(!showNav)}}>
                <label tabIndex={0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                </button>
                {showNav ? (
                <ul tabIndex={0} className="ml-8 p-2 shadow-lg bg-white rounded-box w-full flex">
                  <li>
                    <Link
                        href="/dashboard"
                        className="block py-2 pl-3 pr-4 text-licorice rounded md:hover:bg-transparent md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                        aria-current="page"
                      >
                        Home
                    </Link>
                    </li>
                    <li>
                      <Link
                        href="/chat"
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                      >
                        Chat
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/food"
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white"
                      >
                        Food
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                      >
                        Sign out
                      </button>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparent"
                      >
                        About
                      </Link>
                    </li>
                  </ul>
                ) : null}
                </div>
              </div>
            </div>
        // </div>
      ) : null}
    </>
  );
}
