import Head from "next/head"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import Confetti from "react-confetti"
import { BsArrowUpSquareFill } from "react-icons/bs"

const Onboarding = () => {
  const [showIndicator, setShowIndicator] = useState(true)
  let [cardIndex, setCardIndex] = useState(0)
  const router = useRouter()
  return (
    <>
      <Head>
        <title>ScoreConnect Onboarding</title>
      </Head>
      <div>
        {cardIndex === 3 && <Confetti />}

        {showIndicator && (
          <div
            className="absolute right-0 top-10 mt-10 animate-bounce cursor-pointer p-4 text-[#454138] transition duration-200 ease-in-out"
            onMouseEnter={() => setShowIndicator(false)}
          >
            <BsArrowUpSquareFill onClick={() => setCardIndex(0)} className="text-4xl" />
          </div>
        )}

        <div className="flex flex-col space-y-4 p-4">
          <h1 className="text-center font-light text-[#454138]">Onboarding</h1>
          <p className="mb-3 text-center font-light text-[#454138]">
            This page will guide you through the process of using ScoreConnect.
          </p>
          {cardIndex === 0 && (
            <div className="mx-auto flex w-1/4 flex-col space-y-4 rounded-lg border-2 border-[#454138] p-4">
              <h2 className="mb-3 text-center font-light text-[#454138]">Step 1: Profile</h2>
              <p className="mb-3 text-center font-light text-[#454138]">
                Your profile contains your name, email, and other information. <br></br> <br></br> You can view your
                profile by clicking on the profile icon in the top right corner of the page and selecting
                &quot;Profile&quot;.
              </p>
              <button
                onClick={() => setCardIndex(cardIndex + 1)}
                className="rounded-lg border-2 border-[#454138] p-4 transition duration-200 ease-in-out hover:border-[#454138] hover:bg-[#454138] hover:text-[#dcd8c0]"
              >
                Next
              </button>
            </div>
          )}

          {cardIndex === 1 && (
            <div className="mx-auto flex w-1/4 flex-col space-y-4 rounded-lg border-2 border-[#454138] p-4">
              <h2 className="mb-3 text-center font-light text-[#454138]">Step 2: Settings</h2>
              <p className="mb-3 text-center font-light text-[#454138]">
                Your settings contain your scoreboard connection information. <br></br> <br></br> You can view your
                settings by clicking on the profile icon in the top right corner of the page and selecting
                &quot;Settings&quot;.
              </p>
              <button
                onClick={() => setCardIndex(cardIndex + 1)}
                className="rounded-lg border-2 border-[#454138] p-4 transition duration-200 ease-in-out hover:border-[#454138] hover:bg-[#454138] hover:text-[#dcd8c0]"
              >
                Next
              </button>
              <button
                onClick={() => setCardIndex(cardIndex - 1)}
                className="rounded-lg border-2 border-[#454138] p-4 transition duration-200 ease-in-out hover:border-[#454138] hover:bg-[#454138] hover:text-[#dcd8c0]"
              >
                Back
              </button>
            </div>
          )}

          {cardIndex === 2 && (
            <div className="mx-auto flex w-1/4 flex-col space-y-4 rounded-lg border-2 border-[#454138] p-4">
              <h2 className="mb-3 text-center font-light text-[#454138]">Step 3: Scoreboard</h2>
              <p className="mb-3 text-center font-light text-[#454138]">
                Your scoreboard is where you can view and control your scoreboard. <br></br> <br></br> You can view your
                scoreboard by clicking on the profile icon in the top right corner of the page and selecting
                &quot;Scoreboard&quot;.
              </p>
              <button
                onClick={() => setCardIndex(cardIndex + 1)}
                className="rounded-lg border-2 border-[#454138] p-4 transition duration-200 ease-in-out hover:border-[#454138] hover:bg-[#454138] hover:text-[#dcd8c0]"
              >
                Finish
              </button>
              <button
                onClick={() => setCardIndex(cardIndex - 1)}
                className="rounded-lg border-2 border-[#454138] p-4 transition duration-200 ease-in-out hover:border-[#454138] hover:bg-[#454138] hover:text-[#dcd8c0]"
              >
                Back
              </button>
            </div>
          )}

          {cardIndex === 3 && (
            <div className="mx-auto flex w-1/4 flex-col space-y-4 rounded-lg border-2 border-[#454138] p-4">
              <h2 className="mb-1 text-center font-light text-[#454138]">Congrats! You&apos;re all set up!</h2>
              <p className="mb-3 text-center font-light text-[#454138]">You&apos;re now ready to use ScoreConnect!</p>
              <button
                onClick={() => router.push("/scoreboard")}
                className="rounded-lg border-2 border-[#454138] p-4 transition duration-200 ease-in-out hover:border-[#454138] hover:bg-[#454138] hover:text-[#dcd8c0]"
              >
                View Scoreboard Page
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Onboarding
