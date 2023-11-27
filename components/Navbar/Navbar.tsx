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
  }
]

export default function NavBar() {
  let pathname = usePathname() || "/"
  const isLoginPath = pathname === "/login"
  const [user, setUser] = useState<SetStateAction<any>>(null)
  const [userProfilePic, setUserProfilePic] = useState<SetStateAction<any>>(null)
  const [hovered, setHovered] = useState(false);
  const router = useRouter()
  const konamiSequence = useRef(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);


  useEffect(() => {
    const checkKonamiCode = (e: KeyboardEvent) => {
      setKonamiCode((prevState) => {
        const updatedCode = [...prevState, e.code];
        if (updatedCode.length > konamiSequence.current.length) {
          updatedCode.shift();
        }
        return updatedCode;
      });

      const slicedCode = konamiCode.slice(-konamiSequence.current.length);
      if (JSON.stringify(slicedCode) === JSON.stringify(konamiSequence.current)) {
        setUserProfilePic("/yorha-no-2-type-b-1.png");
      }
    };

    window.addEventListener('keydown', checkKonamiCode);

    return () => {
      window.removeEventListener('keydown', checkKonamiCode);
    };
  }, [konamiCode]);

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
      <div className="sticky top-4 z-[100] mx-2 mb-12 rounded-lg bg-[#454138] p-[0.4rem] backdrop-blur-md mt-4">
        <nav className="relative z-[100] flex w-full justify-start gap-2 rounded-lg">
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
                className={`relative rounded-md px-4 py-2 text-sm font-bold no-underline duration-300 ease-in lg:text-base ${isActive ? "text-[#302d29]" : "text-[#dcd8c0]"
                  }`}
                href={item.path}
              >
                <span>{item.name}</span>
              </Link>
            )
          })}

          {!user && (
            <button
            className={`relative rounded-md px-4 py-2 text-sm font-bold no-underline duration-300 ease-in lg:text-base ${isLoginPath ? "text-[#302d29]" : "text-[#dcd8c0]" // Change colors accordingly
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
                className="rounded-full border-2 border-[#302d29] cursor-pointer transition-opacity duration-300"
                alt="Profile Picture"
                onMouseEnter={() => setHovered(true)}
              />
            ) : null}
            
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#dcd8c0]">
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          </div>
          
          </div>
        </nav>
      </div>
      {hovered && (
        <div
          id="dropdown"
          className="z-10 absolute top-16 right-2 w-48 py-2 mt-2 bg-[#454138] rounded-lg shadow-xl"
          onMouseLeave={() => setHovered(false)}
        >
          <ul className="py-2 text-sm text-[#dcd8c0]" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="/scoreboard" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">Scoreboard</a>
            </li>
            <li>
              <a href="/dashboard" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">Settings</a>
            </li>
            <li>
              <a href="/profile" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">Profile</a>
            </li>
            <li>
              <a href="/logout" className="block px-4 py-2 hover:bg-[#dcd8c0] hover:text-[#454138]">Sign out</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
