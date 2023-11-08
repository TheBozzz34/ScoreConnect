import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { BsPencilSquare } from "react-icons/bs"
import Navbar from "components/Navbar/Navbar"
import { auth } from "../../firebase"

export default function Scoreboard() {
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)

  const [teamAName, setTeamAName] = useState("Team A")
  const [teamBName, setTeamBName] = useState("Team B")

  const [teamANameTemp, setTeamANameTemp] = useState("Team A")
  const [teamBNameTemp, setTeamBNameTemp] = useState("Team B")

  const [showTeamAPopup, setShowTeamAPopup] = useState(false)
  const [showTeamBPopup, setShowTeamBPopup] = useState(false)

  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login")
      }
    })
  }, [router])

  const incrementTeamAScore = () => {
    setTeamAScore(teamAScore + 1) // You can change this value to the appropriate increment
  }

  // Function to increment the score for Team B
  const incrementTeamBScore = () => {
    setTeamBScore(teamBScore + 1) // You can change this value to the appropriate increment
  }

  const handleTeamANameChange = (newName: React.SetStateAction<string>) => {
    setTeamAName(newName)
    setShowTeamAPopup(false)
  }

  const handleTeamBNameChange = (newName: React.SetStateAction<string>) => {
    setTeamBName(newName)
    setShowTeamBPopup(false)
  }

  return (
    <>
      <Head>
        <meta property="og:url" content="https://next-enterprise.vercel.app/" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>ScoreConnect Web</title>
      </Head>

      <Navbar />

      <div className="flex">
        {" "}
        {/* This container makes the two "WIP" divs appear on the same line */}
        <div className="ml-3 w-1/6 flex-none rounded-lg border-2 border-gray-200">
          <h1 className="flex items-center justify-center border-b-2 border-gray-200 p-2 text-2xl font-semibold">
            Settings
          </h1>
        </div>
        <section className="grow bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
            <div className="justify-center space-y-8 rounded-lg border-2 border-gray-200 p-4 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-2">
              <div className="border-r-2 border-gray-200 pr-4 text-center">
                <h2
                  className="flex cursor-pointer items-center justify-center text-2xl font-semibold"
                  onClick={() => setShowTeamAPopup(true)}
                >
                  {teamAName}
                  <BsPencilSquare className="ml-2 text-blue-400" onClick={() => setShowTeamAPopup(true)} />
                </h2>
                <p className="text-lg font-bold">{teamAScore}</p>
                <button
                  onClick={incrementTeamAScore}
                  className="mr-1 mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Increment score
                </button>
                <button
                  onClick={() => setTeamAScore(teamAScore - 1)}
                  className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Decrement score
                </button>
                <br />
                <button
                  onClick={() => setTeamAScore(0)}
                  className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Reset score
                </button>
              </div>
              <div className="text-center">
                <h2
                  className="flex cursor-pointer items-center justify-center text-2xl font-semibold"
                  onClick={() => setShowTeamBPopup(true)}
                >
                  {teamBName}
                  <BsPencilSquare className="ml-2 text-blue-400" onClick={() => setShowTeamBPopup(true)} />
                </h2>
                <p className="text-lg font-bold">{teamBScore}</p>
                <button
                  onClick={incrementTeamBScore}
                  className="mr-1 mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Increment score
                </button>
                <button
                  onClick={() => setTeamBScore(teamBScore - 1)}
                  className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Decrement score
                </button>
                <br />
                <button
                  onClick={() => setTeamBScore(0)}
                  className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Reset score
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="mr-3 w-1/6 flex-none rounded-lg border-2 border-gray-200">
          <h1 className="flex items-center justify-center border-b-2 border-gray-200 p-2 text-2xl font-semibold">
            Audio
          </h1>
        </div>
      </div>

      {/*

  <div className="border-2 border-gray-200 w-1/6 flex-none m-3 rounded-lg">
    <h1 className="text-2xl font-semibold flex items-center justify-center border-b-2 border-gray-200 p-2">
      WIP
    </h1>
    test
  </div>

  <div className="border-2 border-gray-200 w-1/6 flex-none mr-3 rounded-lg float-right">
    <h1 className="text-2xl font-semibold flex items-center justify-center border-b-2 border-gray-200 p-2">
      WIP
    </h1>
    test2
  </div>

  */}

      {showTeamAPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50">
          {/* <NameChangeOverlay onClick={() => setShowTeamAPopup(false)} /> */}
          <div className="w-64 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Change Team A Name</h2>
            <input
              type="text"
              value={teamANameTemp}
              onChange={(e) => setTeamANameTemp(e.target.value)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <div className="flex justify-between">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => handleTeamANameChange(teamANameTemp)}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => setShowTeamAPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team B Name Change Popup */}
      {showTeamBPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50">
          {/* <NameChangeOverlay onClick={() => setShowTeamBPopup(false)} /> */}
          <div className="w-64 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Change Team B Name</h2>
            <input
              type="text"
              value={teamBNameTemp}
              onChange={(e) => setTeamBNameTemp(e.target.value)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <div className="flex justify-between">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => handleTeamBNameChange(teamBNameTemp)}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => setShowTeamBPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="m-3 flex-none rounded-lg border-2 border-gray-200">
        <h1 className="flex items-center justify-center border-b-2 border-gray-200 p-2 text-2xl font-semibold">
          Preview
        </h1>

        <canvas id="scoreboardCanvas" width="1920" height="1080" className="border-2 border-gray-200"></canvas>
      </div>
    </>
  )
}
