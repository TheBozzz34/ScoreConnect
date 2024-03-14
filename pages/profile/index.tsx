import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { SetStateAction, useEffect, useState } from "react"
import { auth } from "../../firebase"
import { Navbar } from "components/Navbar/nav-bar.component"

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<SetStateAction<any>>(null)

  const [isDevVisible, setIsDevVisible] = useState(false)
  const toggleDevVisibility = () => {
    setIsDevVisible(!isDevVisible)
  }

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
        <title>ScoreConnect Profile</title>
      </Head>

      <Navbar />

      <section>
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-left lg:py-16">

          <div className="mx-auto place-self-center glass">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl xl:text-6xl">

              <div className="flex flex-col items-start justify-start space-y-4 border-l-2 border-white pl-4">
                <div className="flex flex-row items-center justify-center space-x-4">
                  <Image
                    src={user?.photoURL || "/google.png"}
                    alt="Google"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  {user && user.displayName && (
                  <p className="text-white">
                    {user.displayName}
                  </p>
                )}
                </div>
                <span className="text-white text-4xl font-light">
                  Organization: <span className="text-violet-400">{user?.email && user.email.split("@")[1]}</span>
                  </span>
              </div>
            </h1>

            <hr className="mx-auto w-full border-t-2 border-white pb-4" />

            <div className="flex flex-col space-y-4 p-4 border-l-2 border-white">
              {user && user.email && (
                <p className="mb-3 font-light text-white md:text-lg lg:mb-4 lg:text-xl">
                  Email:{" "}
                  <span className="w-fit rounded text-white border-2 border-white p-1">
                    {user.email}
                  </span>
                </p>
              )}
              {user && user.uid && (
                <p className="mb-3 font-light text-white md:text-lg lg:mb-4 lg:text-xl">
                  UID:{" "}
                  <span className="w-fit rounded text-white border-2 border-white p-1">
                    {user.uid}
                  </span>
                </p>
              )}
              <div>
                <div className="rounded p-4">
                  <button
                    className="rounded border-2 border-white bg-white p-1 text-black outline-none transition duration-200 ease-in-out hover:bg-transparent hover:text-white"
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
