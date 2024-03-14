// app/page.tsx
"use client"

import { Card, CardFooter, Code, Image, Link, Snippet, Spacer } from "@nextui-org/react"
import { onAuthStateChanged } from "firebase/auth"
import { User } from "firebase/auth/cordova"
import { useEffect, useState } from "react"

import { GithubIcon } from "../components/icons"
import { Navbar } from "../components/Navbar/nav-bar.component"
import { subtitle, title } from "../components/primatives"
import { siteConfig } from "../config/site"
import { auth } from "../firebase"

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userAccount, setUserAccount] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAccount(user)
      } else {
        setUserAccount(null)
      }
    })
  }, [])

  return (
    <div className="text-white">
      <Navbar />
      <section className="flex flex-col items-center justify-start gap-4 py-8 md:py-10">
        <div className="max-w-lg justify-start text-left">
          <h1 className={title()}>Make&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
          <br />
          <h1 className={title()}>displays regardless of your design experience.</h1>
          <h4 className={subtitle({ class: "mt-4 text-white" })}>Beautiful, fast and modern projector control app.</h4>

          <Spacer y={4} />

          <div className="flex justify-start gap-3">
            <Link
              isExternal
              href={siteConfig.links.docs}
              className="rounded-md border border-white bg-transparent px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-white hover:text-black"
            >
              Documentation
            </Link>
            <Link
              isExternal
              className="rounded-md border border-white bg-transparent px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-white hover:text-black"
              href={siteConfig.links.github}
            >
              <GithubIcon size={20} />
              GitHub
            </Link>

            <Snippet
              hideSymbol
              hideCopyButton
              className="select-none rounded-md border border-white bg-transparent px-4 py-2"
            >
              <span className="text-white">
                Get started by emailing{" "}
                <Code color="primary">{/*siteConfig.contact[0].email*/}very epic contact email </Code>
              </span>
            </Snippet>
          </div>
        </div>
      </section>

      <hr className="mx-auto w-2/3 border-t border-white" />

      <section id="feature-cards" className="flex flex-col items-center justify-start gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg justify-start text-right">
          <h1 className={title()}>Features</h1>
          <h4 className={subtitle({ class: "mt-4 text-gray-300" })}>
            Built with modern technologies, ScoreConnect is packed with features to make your life easier.
          </h4>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="flex flex-row items-center justify-center gap-4 py-8 md:py-10">
            <Card
              isFooterBlurred
              className="col-span-12 h-[300px] w-full transition duration-300 ease-in-out hover:scale-105 sm:col-span-7"
              radius="md"
            >
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 h-full w-full object-cover"
                src="https://images.squarespace-cdn.com/content/v1/65af8fbd2deabc7e06961ae1/1706217479790-RK827VAI1ESCMHOYGH5O/Social+Card.png"
                radius="md"
              />
              <CardFooter className="absolute bottom-0 z-10 rounded-b-md border-t border-white bg-black/40">
                <div className="flex grow items-center gap-2">
                  <Image
                    alt="app icon"
                    className="h-11 w-11 rounded-full bg-black"
                    src="https://sc.necrozma.xyz/_next/image?url=%2Fyorha-no-2-type-b-1.png&w=256&q=75"
                  />
                  <div className="flex flex-col">
                    <p className="text-white/60">Powerful</p>
                    <p className="text-white/60">Create beautiful displays with ease.</p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card
              isFooterBlurred
              className="col-span-12 h-[300px] w-full transition duration-300 ease-in-out hover:scale-105 sm:col-span-7"
              radius="md"
            >
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 h-full w-full object-cover"
                src="https://modulabs.co.kr/wp-content/uploads/2023/10/nextjs14-1536x864.png"
                radius="md"
              />
              <CardFooter className="absolute bottom-0 z-10 rounded-b-md border-t border-white bg-black/40">
                <div className="flex grow items-center gap-2">
                  <Image
                    alt="app icon"
                    className="w-20 rounded-full bg-black"
                    src="https://sc.necrozma.xyz/_next/image?url=%2Fyorha-no-2-type-b-1.png&w=256&q=75"
                  />
                  <div className="flex flex-col">
                    <p className="text-white/60">Modern</p>
                    <p className="text-white/60">
                      ScoreConnect is built with modern technologies and has a beautiful interface.
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card
              isFooterBlurred
              className="col-span-12 h-[300px] w-full transition duration-300 ease-in-out hover:scale-105 sm:col-span-7"
              radius="md"
            >
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 h-full w-full object-cover"
                src="https://img.freepik.com/premium-photo/abstract-neon-lights-background-colorful-design_910135-4906.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699228800&semt=ais"
                radius="md"
              />
              <CardFooter className="absolute bottom-0 z-10 rounded-b-md border-t border-white bg-black/40">
                <div className="flex grow items-center gap-2">
                  <Image
                    alt="app icon"
                    className="h-11 w-11 rounded-full bg-black"
                    src="https://sc.necrozma.xyz/_next/image?url=%2Fyorha-no-2-type-b-1.png&w=256&q=75"
                  />
                  <div className="flex flex-col">
                    <p className="text-white/60">Fast.</p>
                    <p className="text-white/60">ScoreConnect is fast. Really fast.</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <hr className="mx-auto w-2/3 border-t border-white" />

      <Spacer y={20} />

      <footer className="mx-4 rounded-lg border-2 border-white bg-transparent shadow">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm">
            © 2024{" "}
            <a href="https://necrozma.xyz" className="hover:underline">
              ScoreConnect
            </a>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0">
            <li>
              <a href="/about" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/privacy" className="me-4 hover:underline md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/licensing" className="me-4 hover:underline md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>

      <Spacer y={4} />
    </div>
  )
}
