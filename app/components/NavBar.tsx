"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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

  // get with cookie instead of setting to state?
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
  }, [router, supabase.auth]);

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
    setShowNav(!showNav)
  }

  return (
    <>
      {user?.id ? (
        <div className="w-5/12 z-50 flex ml-12 fixed">
          <div className="flex items-center p-4 justify-center z-30 mt-4">
            <div className="flex flex-col laptop:flex-row items-center cursor-point w-full">
                <button className="bg-white/50 p-6 rounded-full hover:bg-white cursor-point" onClick={() => {setShowNav(!showNav)}}>
                <label tabIndex={0} className="cursor-point">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-point" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                </button>
                {showNav ? (
                <ul tabIndex={0} className="ml-8 p-2 mt-8 laptop:mt-0 shadow-lg bg-white rounded-box w-full flex flex-col laptop:flex-row">
                  <li>
                    <button
                        className="block py-2 pl-3 pr-4 text-licorice font-sans rounded md:hover:bg-transparent md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                        aria-current="page"
                        onClick={() => {handleNavigate('dashboard')}}
                      >
                        Home
                    </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {handleNavigate('chat')}}
                        className="block py-2 pl-3 pr-4 text-licorice font-sans rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                      >
                        Chat
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {handleNavigate('food')}}
                        className="block py-2 pl-3 pr-4 text-licorice font-sans rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white"
                      >
                        Food
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block py-2 pl-3 pr-4 text-licorice font-sans rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                      >
                        Sign out
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {handleNavigate('about')}}
                        className="block py-2 pl-3 pr-4 text-licorice font-sans rounded hover:bg-gray-100 md:hover:bg-trant md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparent"
                      >
                        About
                      </button>
                    </li>
                  </ul>
                ) : null}
                </div>
              </div>
            </div>
      ) : null}
    </>
  );
}
