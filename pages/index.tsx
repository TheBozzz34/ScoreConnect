import { onAuthStateChanged } from "firebase/auth"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import Script from 'next/script'
import React, { useEffect } from "react"
import Navbar from "components/Navbar/Navbar"
import { auth } from "../firebase"

export default function Web() {
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
        <meta property="og:url" content="https://sc.necrozma.xyz" />
        <meta property="og:title" content="ScoreConnect Web" />
        <meta property="og:description" content="ScoreConnect is a user-friendly digital scoreboard control software, designed for sports venues and event organizers." />
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

      <Navbar />

      <section>
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-[#454138] md:text-5xl xl:text-6xl">
              ScoreConnect
            </h1>
            <p className="mb-6 max-w-2xl font-light text-[#454138] md:text-lg lg:mb-8 lg:text-xl">
              ScoreConnect is a user-friendly digital scoreboard control software, designed for sports venues and event
              organizers.
            </p>
            {/*
            <Button href="/contact" className="mr-3 rounded bg-[#454138] px-4 py-2 text-[#dcd8c0] hover:bg-[#dcd8c0] hover:text-[#454138] transition duration-200 ease-in-out border border-[#454138]">
              Get started
            </Button>
            <Button href="/login" intent="secondary" className="rounded bg-[#454138] px-4 py-2 text-[#dcd8c0] hover:bg-[#dcd8c0] hover:text-[#454138] transition duration-200 ease-in-out border border-[#454138]">
              Login
            </Button>
            */}
          </div>
        </div>
      </section>

      {/*
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div key={singleItem.title} className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 p-1.5 text-blue-700 dark:bg-primary-900 lg:h-12 lg:w-12">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
    </>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  if (req.headers?.host?.includes("next-enterprise.vercel.app")) {
    return {
      redirect: {
        destination: "https://blazity.com/open-source/nextjs-enterprise-boilerplate",
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}
