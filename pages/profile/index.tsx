import Hotjar from "@hotjar/browser"
import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import Script from "next/script"
import React, { SetStateAction, useEffect, useState } from "react"
import NavBar from "components/Navbar/Navbar"
import { auth } from "../../firebase"

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<SetStateAction<any>>(null)

  const [isDevVisible, setIsDevVisible] = useState(false)
  const toggleDevVisibility = () => {
    setIsDevVisible(!isDevVisible)
  }

  Hotjar.init(2349532, 6)

  useEffect(() => {
    if (user) {
      console.log("user", user)
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login")
      } else {
        setUser(user)
      }
    })

    return () => unsubscribe() // Cleanup the listener on unmount
  }, [router, user])

  return (
    <>
      <Head>
        <meta property="og:url" content="https://sc.necrozma.xyz" />
        <meta property="og:title" content="ScoreConnect Web" />
        <meta
          property="og:description"
          content="ScoreConnect is a user-friendly digital scoreboard control software, designed for sports venues and event organizers."
        />
        <meta property="og:image" content="https://sc.necrozma.xyz/banner.png" />
        <title>ScoreConnect Web</title>
      </Head>

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-G3GH38QDFZ" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-G3GH38QDFZ');
        `}
      </Script>

      <NavBar />
      <section>
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-[#454138] md:text-5xl xl:text-6xl">
              Profile
            </h1>
            {user && user.displayName && (
              <p className="mb-6 max-w-2xl font-light text-[#454138] md:text-lg lg:mb-8 lg:text-xl">
                Hello {user.displayName}!
              </p>
            )}
            <div className="flex flex-col space-y-4 rounded-lg border-2 border-[#454138] p-4">
              {user && user.email && (
                <p className="mb-3 max-w-2xl font-light text-[#454138] md:text-lg lg:mb-4 lg:text-xl">
                  Email:{" "}
                  <span className="w-fit rounded bg-[#454138] p-1 text-[#454138] transition-all hover:bg-[#454138] hover:text-[#dcd8c0]">
                    {user.email}
                  </span>
                </p>
              )}
              {user && user.uid && (
                <p className="mb-3 max-w-2xl font-light text-[#454138] md:text-lg lg:mb-4 lg:text-xl">
                  UID:{" "}
                  <span className="w-fit rounded bg-[#454138] p-1 text-[#454138] transition-all hover:bg-[#454138] hover:text-[#dcd8c0]">
                    {user.uid}
                  </span>
                </p>
              )}
              <p className="mt-8 text-sm text-[#454138]">
                Details have been hidden for privacy reasons, hover over each entry to see the details.
              </p>

              <div>
                <div className="rounded p-4 shadow">
                  <button
                    className="rounded border-2 border-[#454138] bg-[#454138] p-1 text-[#dcd8c0] outline-none transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
                    onClick={toggleDevVisibility}
                  >
                    Toggle Developer Info
                  </button>
                  {isDevVisible && (
                    <div className="mt-4">
                      <h2 className="mb-2 text-lg font-bold">User Information</h2>
                      <p>
                        <strong>UID:</strong> {user.uid}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Display Name:</strong> {user.displayName || "N/A"}
                      </p>
                      <p>
                        <strong>Provider ID: {user.providerId}</strong>
                      </p>
                      <p>
                        <strong>Creation Time:</strong> {user.metadata.creationTime}
                      </p>
                      <p>
                        <strong>Last Sign In Time:</strong> {user.metadata.lastSignInTime}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {user.phoneNumber || "N/A"}
                      </p>
                      <p>
                        <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Client Version:</strong> {user.auth.clientVersion}
                      </p>
                      <p>
                        <strong>API Host:</strong> {user.auth.config.apiHost}
                      </p>
                      <p>
                        <strong>API Key:</strong> {user.auth.config.apiKey}
                      </p>
                      <p>
                        <strong>API Client Scheme:</strong> {user.auth.config.apiScheme}
                      </p>
                      <p>
                        <strong>API Client Auth Domain:</strong> {user.auth.config.authDomain}
                      </p>
                      <p>
                        <strong>API Client Platform:</strong> {user.auth.config.clientPlatform}
                      </p>
                      <p>
                        <strong>API Client TOken Host:</strong> {user.auth.config.tokenApiHost}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/*
export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            session: await auth.getUser(context)
        }
    }
}
*/
