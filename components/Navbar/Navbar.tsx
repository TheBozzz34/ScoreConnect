"use client"

import { onAuthStateChanged } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { auth } from "../../firebase"
const navItems = [
  {
    path: "/",
    name: "Home",
  },
]

export default function NavBar() {
  let pathname = usePathname() || "/"
  const isLoginPath = pathname === "/login"
  const [user, setUser] = useState<SetStateAction<any>>(null)
  const [userProfilePic, setUserProfilePic] = useState<SetStateAction<any>>(null)
  const [hovered, setHovered] = useState(false)
  const router = useRouter()
  const konamiSequence = useRef([
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ])
  const [konamiCode, setKonamiCode] = useState<string[]>([])

  const [enviroment, setEnviroment] = useState("")
  const [enviromentColor, setEnviromentColor] = useState("")

  useEffect(() => {
    if(process.env.NODE_ENV === "development") {
      setEnviroment("Development")
      setEnviromentColor("bg-[#ff0000]")
    }
    else if(process.env.NODE_ENV === "production") {
      setEnviroment("Production")
      setEnviromentColor("bg-[#00ff00]")
    }
    else {
      setEnviroment("Unknown enviroment")
      setEnviromentColor("bg-[#0000ff]")
    }
  }, [])



  useEffect(() => {
    const checkKonamiCode = (e: KeyboardEvent) => {
      setKonamiCode((prevState) => {
        const updatedCode = [...prevState, e.code]
        if (updatedCode.length > konamiSequence.current.length) {
          updatedCode.shift()
        }
        return updatedCode
      })

      const slicedCode = konamiCode.slice(-konamiSequence.current.length)
      if (JSON.stringify(slicedCode) === JSON.stringify(konamiSequence.current)) {
        setUserProfilePic("/yorha-no-2-type-b-1.png")
      }
    }

    window.addEventListener("keydown", checkKonamiCode)

    return () => {
      window.removeEventListener("keydown", checkKonamiCode)
    }
  }, [konamiCode])

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
    <div>
      <div className="sticky top-4 z-[100] mx-2 mb-12 mt-4 rounded-lg bg-[#454138] p-[0.4rem] backdrop-blur-md">
        <nav className="relative z-[100] flex w-full justify-start gap-2 rounded-lg">
          <span className={`${enviromentColor} text-[#dcd8c0] text-xs font-bold p-1 rounded h-1/2 mt-2`}>{enviroment}</span>
          {/*
        <div 
        onMouseEnter={() => setHovered(true)}
        className="border-2 border-[#302d29] rounded-full transition-opacity duration-300"
        >
        {/*
        <Image
          src="/yorha-no-2-type-b-1.png"
          width={40}
          height={40}
          className={`rounded-full transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          alt="ScoreConnect Logo"
        />
        
        </div>
        */}

          {navItems.map((item) => {
            const isActive = item.path === pathname

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

          {!user && (
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
                className="cursor-pointer rounded-full border-2 border-[#302d29] transition-opacity duration-300"
                alt="Profile Picture"
                onMouseEnter={() => {
                  setHovered(true)
                }}
              />
            ) : null}
            {user && (
              <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-[#dcd8c0]">
                <span className="absolute right-0 top-0 h-3 w-3 animate-ping rounded-full bg-red-500"></span>
              </div>
            )}
          </div>
        </nav>
      </div>
      {hovered && (
        <div
          id="dropdown"
          className="absolute right-2 top-16 z-10 mt-2 w-48 rounded-lg bg-[#454138] py-2 shadow-xl"
          onMouseLeave={() => setHovered(false)}
        >
          <ul className="py-2 text-sm text-[#dcd8c0]" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="/scoreboard" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">
                Scoreboard
              </a>
            </li>
            <li>
              <a href="/dashboard" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">
                Settings
              </a>
            </li>
            <li>
              <a href="/profile" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">
                Profile
              </a>
            </li>
            <li>
              <a href="/logout" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
