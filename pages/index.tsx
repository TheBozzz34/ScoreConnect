import { onAuthStateChanged } from "firebase/auth"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import React, { useEffect } from "react"
import ImageCarousel from "components/Carousel/Carousel"
import EmailSignup from "components/Email/EmailSignup"
import { auth } from "../firebase"
import { getIsSsrMobile } from "../utils/getIsSsrMobile"
import { useIsMobile } from "../utils/useIsMobile"

export default function Web() {
  const isMobile = useIsMobile()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>ScoreConnect Home</title>
      </Head>
      <section>
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-[#454138] md:text-5xl xl:text-6xl">
              ScoreConnect
            </h1>
            <p className="mb-6 max-w-2xl font-light text-[#454138] md:text-lg lg:mb-8 lg:text-xl">
              ScoreConnect is a user-friendly digital scoreboard control software, designed for sports venues, event
              organizers, and schools.
            </p>
          </div>
        </div>
      </section>

      {isMobile ? (
        <section>
          <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <div className="mx-auto place-self-center">
              <h2>
                This website is not optimized for mobile devices. Please use a desktop or laptop computer to view this
                site.
              </h2>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <EmailSignup />
        </section>
      )}

      <section>{/*<ImageCarousel />*/}</section>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSsrMobile: getIsSsrMobile(context),
    },
  }
}
