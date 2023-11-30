import Image from "next/image"
import React from "react"
import "../../styles/yorha.module.css"
import { useIsMobile } from "utils/useIsMobile"

export default function Me() {
  return (
    <>
      <div
        className={`mt-4 w-[80%] max-w-md rounded-lg border-2 border-[#dcd8c0] bg-[#454138] p-4 text-[#dcd8c0] shadow ${
          useIsMobile() ? "mx-auto" : "mr-5"
        }`}
      >
        <h3 className="border-b-2 border-[#dcd8c0] text-2xl font-bold">About Me</h3>

        <Image
          src="/yorha-no-2-type-b-1.png"
          width={150}
          height={150}
          className="mx-auto mt-4 rounded-full border-2 border-[#dcd8c0]"
          alt="Me"
        />

        <p className="mt-2">
          Hi! I&apos;m <span className="font-bold">Necrozma</span>, a student from the United States. I&apos;m a
          full-stack developer, and I&apos;m currently working on <span className="font-bold">ScoreConnect</span>, a
          digital scoreboard control software.
        </p>
        <p className="mt-2">
          This website is a work in progress, and I&apos;m still working on it. I&apos;m also working on a few other
          projects, which you can find on my{" "}
          <a href="https://github.com/thebozzz34" className="underline">
            GitHub
          </a>
          .
        </p>
        <p className="mt-2">
          You can find me on{" "}
          <a href="https://twitter.com/sadan9921" className="underline">
            Twitter
          </a>
          ,{" "}
          <a href="https://instagram.com/k._eturah" className="underline">
            Instagram
          </a>
          , and{" "}
          <a href="https://necrozma.xyz" className="underline">
            more
          </a>
          .
        </p>
      </div>
    </>
  )
}
