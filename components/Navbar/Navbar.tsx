"use client";

import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { SetStateAction, useEffect, useState } from 'react';
import { auth } from '../../firebase';


const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/profile",
    name: "Profile",
  },
];

export default function NavBar() {
  let pathname = usePathname() || "/";
    const [user, setUser] = useState<SetStateAction<any>>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } else {
            setUser(null)
        }
    });

}, [])

  
  return (
    <div className="p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] bg-blue-400 backdrop-blur-md mx-2">
      <nav className="flex gap-2 relative justify-start w-full z-[100]  rounded-lg">
        {navItems.map((item) => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in font-bold ${
                isActive ? "text-white" : "text-blue-600"
              }`}
              href={item.path}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}

    {user ? (
        <button
          className="px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in font-bold text-blue-600"
          onClick={() => {
            redirect('/logout')
            }}
        >
          <span>Sign Out</span>
        </button>
        ) : (
        <button
          className="px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in font-bold text-blue-600"
          onClick={() => {
            redirect('/login')
          }}
        >
            <span>Sign In</span>
        </button>
        )}

      </nav>
    </div>
  );
}
