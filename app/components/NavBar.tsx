"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  // const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState({id: ''});

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // const handleNav = () => {
  //   setShowNav(!showNav);
  // };

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
        <div className="w-5/6 bg-white/70 z-10">
          <div className="navbar bg-white">
            <div className="navbar">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                  <li>
                    <Link
                        href="/dashboard"
                        className="block py-2 pl-3 pr-4 text-licorice rounded md:hover:bg-transparent md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                        aria-current="page"
                      >
                        Home
                    </Link>
                    </li>
        {/* <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li> */}
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
                </div>
                <a className="btn btn-ghost normal-case text-2xl">Tomoiru</a>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  <li><a>Item 1</a></li>
                  <li tabIndex={0}>
                    <details>
                      <summary>Parent</summary>
                      <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                      </ul>
                    </details>
                  </li>
                  <li><a>Item 3</a></li>
                </ul>
              </div>
              {/* <div className="navbar-end">
                <a className="btn">Button</a>
              </div> */}
            </div>
        </div>
      ) : null}
    </>
  );
}
