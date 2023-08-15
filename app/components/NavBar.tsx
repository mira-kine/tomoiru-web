"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState({id: ''});

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleNav = () => {
    setShowNav(!showNav);
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
        <div className="w-full bg-white/70 z-10">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-12 py-6">
            <div className="w-3/4 flex flex-col justify-between">
              {!showNav && (
                <button
                  onClick={() => {handleNav()}}
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-licorice rounded-lg hover:bg-peach focus:outline-none focus:ring-2 focus:ring-peach text-licorice"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              )}
              {showNav && (
                <div className="flex w-full transition ease-in-out delay-150 translate-x-2 z-12">
                  <button
                    onClick={() => {handleNav()}}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-peach focus:outline-none focus:ring-2 focus:ring-peach text-licorice"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                    </svg>
                  </button>
                  <ul className="font-medium flex px-8 mx-16 rounded-lg w-full bg-white z-10">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                        aria-current="page"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparent"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/chat"
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                      >
                        Chat
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="block py-2 pl-3 pr-4 text-licorice rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 hover:bg-peach hover:text-white md:hover:bg-transparen"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
