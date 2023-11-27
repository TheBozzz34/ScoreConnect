"use client"

import { onAuthStateChanged } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SetStateAction, useEffect, useState } from "react"
import { auth } from "../../firebase"
const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/scoreboard",
    name: "Scoreboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/profile",
    name: "Profile",
  },
]

export default function NavBar() {
  let pathname = usePathname() || "/"
  const isLoginPath = pathname === "/login"
  const [user, setUser] = useState<SetStateAction<any>>(null)
  const [userProfilePic, setUserProfilePic] = useState<SetStateAction<any>>(null)
  const [hovered, setHovered] = useState(false);
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setUserProfilePic(user.photoURL)
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <div className="sticky top-4 z-[100] mx-2 mb-12 rounded-lg bg-[#454138] p-[0.4rem] backdrop-blur-md">
      <nav className="relative z-[100] flex w-full justify-start gap-2 rounded-lg">
        <div 
        onMouseEnter={() => setHovered(true)}
        className="border-2 border-[#302d29] rounded-full transition-opacity duration-300"
        >
        <Image
          src="/yorha-no-2-type-b-1.png"
          width={40}
          height={40}
          className={`rounded-full transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          alt="ScoreConnect Logo"
        />
        </div>

        {navItems.map((item) => {
          const isActive = item.path === pathname

          if (!user) {
            if (item.name === "Profile") {
              return null
            }
            if (item.name === "Dashboard") {
              return null
            }
            if (item.name === "Scoreboard") {
              return null
            }
          }

          return (
            <Link
              key={item.path}
              className={`relative rounded-md px-4 py-2 text-sm font-bold no-underline duration-300 ease-in lg:text-base ${
                isActive ? "text-[#302d29]" : "text-[#dcd8c0]"
              }`}
              href={item.path}
            >
              <span>{item.name}</span>
            </Link>
          )
        })}

        {user ? (
          <button
            className="relative rounded-md px-4 py-2 text-sm font-bold text-[#dcd8c0] no-underline duration-300 ease-in lg:text-base"
            onClick={() => {
              router.push("/logout")
            }}
          >
            <span>Logout</span>
          </button>
        ) : (
          <button
            className={`relative rounded-md px-4 py-2 text-sm font-bold no-underline duration-300 ease-in lg:text-base ${
              isLoginPath ? "text-[#302d29]" : "text-[#dcd8c0]" // Change colors accordingly
            }`}
            onClick={() => {
              router.push("/login")
            }}
          >
            <span>Login</span>
          </button>
        )}

        <div className="ml-auto">
          {" "}
          {/* Use ml-auto to move content to the right */}
          {user ? (
            <Image
              src={userProfilePic}
              width={40}
              height={40}
              className="rounded-full border-2 border-[#302d29]"
              alt="Profile Picture"
            />
          ) : null}
        </div>
      </nav>
    </div>
  )
}
