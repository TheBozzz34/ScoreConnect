import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { BsPencilSquare } from "react-icons/bs"
import Navbar from "components/Navbar/Navbar"
import { useWebSocket } from "../../context/WebSocketContext"
import { auth } from "../../firebase"

export default function Scoreboard() {
  const { messages, sendMessage, connectionStatus } = useWebSocket()
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)

  const [teamAName, setTeamAName] = useState("Team A")
  const [teamBName, setTeamBName] = useState("Team B")

  const [teamANameTemp, setTeamANameTemp] = useState("Team A")
  const [teamBNameTemp, setTeamBNameTemp] = useState("Team B")

  const [showTeamAPopup, setShowTeamAPopup] = useState(false)
  const [showTeamBPopup, setShowTeamBPopup] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWidth = 640
  const canvasHeight = 360

  const hasInitialized = useRef(false)

  const router = useRouter()

  useEffect(() => {
    const getInitalData = async () => {
      console.log("Getting initial data")
      try {
        const token = await auth.currentUser?.getIdToken() // Fetch the token asynchronously
        const testMessageJson = {
          id: Math.floor(Math.random() * 100000),
          type: 8,
          text: "getInitialData",
          token: token,
        }

        sendMessage(JSON.stringify(testMessageJson))
      } catch (error) {
        // Handle any errors that may occur while fetching the token
        console.error("Error fetching token:", error)
      }
    }

    if (!hasInitialized.current) {
      getInitalData()
      hasInitialized.current = true
    }

    messages.forEach((message) => {
      const messageJson = JSON.parse(message) as { type: number; text: string }
      if (messageJson.type === 18) {
        const data = JSON.parse(messageJson.text)
        setTeamAName((data as { teamAName: string }).teamAName)
        setTeamBName((data as { teamBName: string }).teamBName)
        setTeamAScore(parseInt((data as { teamAScore: string }).teamAScore))
        setTeamBScore(parseInt((data as { teamBScore: string }).teamBScore))
      }
    })

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login")
      }
    })
  }, [router, sendMessage, messages])

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

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (ctx) {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(teamAName, canvasWidth / 4, canvasHeight / 2)
      ctx.fillText(teamBName, (canvasWidth / 4) * 3, canvasHeight / 2)

      ctx.font = "bold 72px Arial"
      ctx.fillText(teamAScore.toString(), canvasWidth / 4, (canvasHeight / 4) * 3)
      ctx.fillText(teamBScore.toString(), (canvasWidth / 4) * 3, (canvasHeight / 4) * 3)
    }
  }, [teamAScore, teamBScore, teamAName, teamBName])

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

          <div className="flex flex-col space-y-4 rounded-lg border-2 border-gray-200 p-4">
            <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
              WS Server:
              <span className="w-fit rounded bg-gray-300 p-1" style={{ display: "inline-flex", alignItems: "center" }}>
                {connectionStatus === "Connected" ? "Connected" : "Disconnected"}
              </span>
            </p>
            <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
              Scoreboard:
              <span className="w-fit rounded bg-gray-300 p-1" style={{ display: "inline-flex", alignItems: "center" }}>
                Disconnected
              </span>
            </p>
            <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
              Audio:
              <span className="w-fit rounded bg-gray-300 p-1" style={{ display: "inline-flex", alignItems: "center" }}>
                Disconnected
              </span>
            </p>

            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() =>
                sendMessage(JSON.stringify({ id: Math.floor(Math.random() * 100000), type: 8, text: "getInitialData" }))
              }
            >
              Refresh
            </button>
          </div>
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

      <div className="flex justify-center">
        <div className="m-3 w-fit flex-none rounded-lg border-2 border-gray-200">
          <h1 className="flex items-center justify-center border-b-2 border-gray-200 p-2 text-2xl font-semibold">
            Preview
          </h1>

          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="m-3 rounded-lg" />
        </div>
      </div>
    </>
  )
}
