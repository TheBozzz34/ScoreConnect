"use client";

import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import Clock from "components/Clock/Clock";


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
    }

];

export default function NavBar() {
    let pathname = usePathname() || "/";
    const isLoginPath = pathname === "/login";
    const [user, setUser] = useState<SetStateAction<any>>(null)
    const [userProfilePic, setUserProfilePic] = useState<SetStateAction<any>>(null)
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setUserProfilePic(user.photoURL)
            } else {
                setUser(null)
            }
        });

    }, [])


    return (
        <div className="p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] bg-blue-400 backdrop-blur-md mx-2">
            <nav className="flex gap-2 relative justify-start w-full z-[100] rounded-lg">
                {navItems.map((item) => {
                    const isActive = item.path === pathname;

                    if (!user) {
                        if (item.name === "Profile") {
                            return null
                        }
                        if (item.name === "Dashboard") {
                            return null
                        }
                    }

                    return (
                        <Link
                            key={item.path}
                            className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in font-bold ${isActive ? "text-white" : "text-blue-600"
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
                            router.push("/logout")
                        }}
                    >
                        <span>Logout</span>
                    </button>
                ) : (
                    <button
                        className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in font-bold ${isLoginPath ? "text-white" : "text-blue-600" // Change colors accordingly
                            }`}
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        <span>Login</span>
                    </button>
                )}

                <div className="ml-auto"> {/* Use ml-auto to move content to the right */}
                    {user ? (
                        <Image
                            src={userProfilePic}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-blue-600"
                            alt="Profile Picture"
                        />
                        
                    ) : null}
                    
                </div>
            </nav>
        </div>
    );
}
