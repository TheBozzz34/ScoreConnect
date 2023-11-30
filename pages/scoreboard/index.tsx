import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { BsPencilSquare } from "react-icons/bs"
import { useTimer } from "react-timer-hook"
import { useWebSocket } from "../../context/WebSocketContext"
import { auth } from "../../firebase"
import { useIsMobile } from "../../utils/useIsMobile"
import { set } from "lodash"

export default function Scoreboard() {
  const { messages, sendMessage, connectionStatus } = useWebSocket()
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)
  const [teamAFouls, setTeamAFouls] = useState(0)
  const [teamBFouls, setTeamBFouls] = useState(0)
  const [currentPeriod, setCurrentPeriod] = useState(1)

  const [teamAName, setTeamAName] = useState("Team A")
  const [teamBName, setTeamBName] = useState("Team B")

  const [teamANameTemp, setTeamANameTemp] = useState("Team A")
  const [teamBNameTemp, setTeamBNameTemp] = useState("Team B")

  const [showTeamAPopup, setShowTeamAPopup] = useState(false)
  const [showTeamBPopup, setShowTeamBPopup] = useState(false)

  const [showPresetsPopup, setShowPresetsPopup] = useState(false)
  const [showPeriodPopup, setShowPeriodPopup] = useState(false)
  const [showTimerPopup, setShowTimerPopup] = useState(false)

  const [periodTemp, setPeriodTemp] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWidth = 640
  const canvasHeight = 360

  const hasInitialized = useRef(false)

  const router = useRouter()
  const isMobile = useIsMobile()

  const now = new Date()

  let {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: new Date(now.getTime() + 1000 * 60 * 30), onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    if (isMobile) {
      router.push("/mobile")
    }
  }, [isMobile, router])

  let resetBoard = () => {
    setCurrentPeriod(1)
    setTeamAScore(0)
    setTeamBScore(0)
    setTeamAFouls(0)
    setTeamBFouls(0)
    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    restart(time)
    pause()
  }


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
    pause()
  }, [])


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#454138";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Display team names
      ctx.fillStyle = "#dcd8c0";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(teamAName, canvasWidth / 4, canvasHeight / 3);
      ctx.fillText(teamBName, (canvasWidth / 4) * 3, canvasHeight / 3);

      // Display scores
      ctx.font = "bold 72px Arial";
      ctx.fillText(teamAScore.toString(), canvasWidth / 4, (canvasHeight / 4) * 2);
      ctx.fillText(teamBScore.toString(), (canvasWidth / 4) * 3, (canvasHeight / 6) * 3);

      // Display fouls
      ctx.font = "bold 24px Arial";
      ctx.fillText(`Fouls: ${teamAFouls}`, canvasWidth / 4, (canvasHeight / 6) * 3 + 50);
      ctx.fillText(`Fouls: ${teamBFouls}`, (canvasWidth / 4) * 3, (canvasHeight / 6) * 3 + 50);

      // Display periods
      ctx.fillText(`Period: ${currentPeriod}`, canvasWidth / 2, canvasHeight - 50);

      // Display timer/clock
      if (seconds < 10) {
        ctx.fillText(`${minutes}:0${seconds}`, canvasWidth / 2, canvasHeight - 170);
      } else {
        ctx.fillText(`${minutes}:${seconds}`, canvasWidth / 2, canvasHeight - 170);
      }
    }
  }, [teamAScore, teamBScore, teamAName, teamBName, teamAFouls, teamBFouls, currentPeriod, minutes, seconds]);


  return (
    <>
      <Head>
        <title>ScoreConnect ScoreBoard</title>
      </Head>
      <div className="flex">
        {" "}
        {/* This container makes the two "WIP" divs appear on the same line */}
        <div className="ml-3 w-1/6 flex-none rounded-lg border-2 border-[#454138]">
          <h1 className="flex items-center justify-center border-b-2 border-[#454138] p-2 text-2xl font-semibold text-[#454138]">
            Settings
          </h1>

          <div className="flex flex-col space-y-4 rounded-lg p-4">
            <p className="mb-3 max-w-2xl font-light text-[#454138] dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
              WS Server:
              <span
                className="w-fit rounded bg-[#454138] p-1 text-[#dcd8c0]"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                {connectionStatus === "Connected" ? "Connected" : "Disconnected"}
              </span>
            </p>
            <p className="mb-3 max-w-2xl font-light text-[#454138] dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
              Scoreboard:
              <span
                className="w-fit rounded bg-[#454138] p-1 text-[#dcd8c0]"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Disconnected
              </span>
            </p>
            <p className="mb-3 max-w-2xl font-light text-[#454138] dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
              Audio:
              <span
                className="w-fit rounded bg-[#454138] p-1 text-[#dcd8c0]"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Disconnected
              </span>
            </p>

            <button
              className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
              onClick={() =>
                sendMessage(JSON.stringify({ id: Math.floor(Math.random() * 100000), type: 8, text: "getInitialData" }))
              }
            >
              Refresh
            </button>
          </div>
        </div>
        <section className="grow">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
            <div className="justify-center space-y-8 rounded-lg border-2 border-[#454138] p-4 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-2">
              <div className="border-r-2 border-[#454138] pr-4 text-center">
                <h2
                  className="flex cursor-pointer items-center justify-center text-2xl font-semibold text-[#454138]"
                  onClick={() => setShowTeamAPopup(true)}
                >
                  {teamAName}
                  <BsPencilSquare className="ml-2 text-[#605b52]" onClick={() => setShowTeamAPopup(true)} />
                </h2>
                <p className="text-lg font-bold text-[#454138]">{teamAScore}</p>
                <button
                  onClick={incrementTeamAScore}
                  className="mr-1 mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Increment score
                </button>
                <button
                  onClick={() => setTeamAScore(teamAScore - 1)}
                  className="mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Decrement score
                </button>
                <br />
                <button
                  onClick={() => setTeamAScore(0)}
                  className="mt-2 mr-1 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Reset score
                </button>
                <br />
                <button
                  onClick={() => setTeamAFouls(teamAFouls + 1)}
                  className="mt-2 mr-1 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Increment fouls
                </button>
                <button
                  onClick={() => setTeamAFouls(teamAFouls - 1)}
                  className="mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Decrement fouls
                </button>
                <br />
                <button
                  onClick={() => setTeamAFouls(0)}
                  className="mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Reset fouls
                </button>
              </div>
              <div className="text-center border-l-2 border-[#454138] pl-4">
                <h2
                  className="flex cursor-pointer items-center justify-center text-2xl font-semibold text-[#454138]"
                  onClick={() => setShowTeamBPopup(true)}
                >
                  {teamBName}
                  <BsPencilSquare className="ml-2 text-[#605b52]" onClick={() => setShowTeamBPopup(true)} />
                </h2>
                <p className="text-lg font-bold text-[#454138]">{teamBScore}</p>
                <button
                  onClick={incrementTeamBScore}
                  className="mr-1 mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Increment score
                </button>
                <button
                  onClick={() => setTeamBScore(teamBScore - 1)}
                  className="mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Decrement score
                </button>
                <br />
                <button
                  onClick={() => setTeamBScore(0)}
                  className="mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Reset score
                </button>
                <br />
                <button
                  onClick={() => setTeamBFouls(teamBFouls + 1)}
                  className="mt-2 mr-1 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Increment fouls
                </button>
                <button
                  onClick={() => setTeamBFouls(teamBFouls - 1)}
                  className="mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Decrement fouls
                </button>
                <br />
                <button
                  onClick={() => setTeamBFouls(0)}
                  className="mt-2 rounded border border-[#454138] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                >
                  Reset fouls
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="mr-3 w-1/6 flex-none rounded-lg border-2 border-[#454138]">
          <h1 className="flex items-center justify-center border-b-2 border-[#454138] p-2 text-2xl font-semibold text-[#454138]">
            Misc
          </h1>
          <div className="flex flex-col space-y-4 rounded-lg p-4">
            <p className="max-w-2xl font-light text-[#454138] dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
              Period:
              <span
                className="w-fit rounded bg-[#454138] p-1 text-[#dcd8c0]"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                {currentPeriod}
              </span>
            </p>

            <button
              className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
              onClick={() => {setShowPeriodPopup(true)}}
            >
              Change Period
            </button>

            <p className="mb-3 max-w-2xl font-light text-[#454138] dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl border-t-2 border-[#454138] pt-4">
              Timer:
              <span
                className="w-fit rounded bg-[#454138] p-1 text-[#dcd8c0]"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
              </span>

              <span
                className="w-fit rounded bg-[#454138] p-1 text-[#dcd8c0] ml-2"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                {isRunning ? "Running" : "Paused"}
              </span>
            </p>

            <div className="flex justify-between">

              <button
                className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138] w-2/3 mr-1"
                onClick={() => {
                  const inputTime = prompt("Enter time in format MM:SS");
                  if (inputTime) {
                    const timeSplit = inputTime.split(":");
                    const currentTime = new Date();
                    currentTime.setMinutes(currentTime.getMinutes() + parseInt(timeSplit[0]));
                    currentTime.setSeconds(currentTime.getSeconds() + parseInt(timeSplit[1]));
                    restart(currentTime);
                    pause();
                  }
                }}
                
                >
                Custom Timer
              </button>

              <button
                className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138] w-1/3"
                onClick={() => {
                  setShowPresetsPopup(true)
                }}
              >
                Presets
              </button>

            </div>



            <button
              className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
              onClick={() => {
                const timerRunning = isRunning
                if (timerRunning) {
                  pause()
                } else {
                  resume()
                }
              }
              }
            >

              {isRunning ? "Pause Timer" : "Resume Timer"}
            </button>

            <span className="mb-3 max-w-2xl font-light text-[#454138] dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl border-t-2 border-[#454138]"></span>

            <button
                className="rounded bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
                onClick={() => resetBoard()}
              >
                Reset Board
              </button>

          </div>
        </div>
      </div>

      {showTeamAPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50">
          {/* <NameChangeOverlay onClick={() => setShowTeamAPopup(false)} /> */}
          <div className="w-64 rounded-lg bg-[#454138] p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-[#dcd8c0]">Change Team A Name</h2>
            <input
              type="text"
              value={teamANameTemp}
              onChange={(e) => setTeamANameTemp(e.target.value)}
              className="mb-4 w-full rounded bg-[#dcd8c0] p-2 text-[#454138] outline-none"
            />
            <div className="flex justify-between">
              <button
                className="rounded border border-[#dcd8c0] bg-[#dcd8c0] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                onClick={() => handleTeamANameChange(teamANameTemp)}
              >
                Save
              </button>
              <button
                className="rounded border border-[#dcd8c0] bg-[#dcd8c0] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
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
          <div className="w-64 rounded-lg bg-[#454138] p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-[#dcd8c0]">Change Team B Name</h2>
            <input
              type="text"
              value={teamBNameTemp}
              onChange={(e) => setTeamBNameTemp(e.target.value)}
              className="mb-4 w-full rounded bg-[#dcd8c0] p-2 text-[#454138] outline-none"
            />
            <div className="flex justify-between">
              <button
                className="rounded border border-[#dcd8c0] bg-[#dcd8c0] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                onClick={() => handleTeamBNameChange(teamBNameTemp)}
              >
                Save
              </button>
              <button
                className="rounded border border-[#dcd8c0] bg-[#dcd8c0] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                onClick={() => setShowTeamBPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Presets Popup */}
      {showPresetsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50">
          {/* <NameChangeOverlay onClick={() => setShowTeamBPopup(false)} /> */}
          <div className="w-64 rounded-lg bg-[#454138] p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-[#dcd8c0]">Presets</h2>
            <div className="flex flex-col space-y-4 rounded-lg p-4">

              <button
                className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + 60);
                  restart(time)
                  pause()
                }}
              >
                1 Minute Period
              </button>

              <button
                className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + 300);
                  restart(time)
                  pause()
                }}
              >
                5 Minute Period
              </button>
              <button
                className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + 600);
                  restart(time)
                  pause()
                }}
              >
                10 Minute Period
              </button>
              <button
                className="rounded border border-[#454138] bg-[#454138] px-4 py-2 text-[#dcd8c0] transition duration-200 ease-in-out hover:bg-[#dcd8c0] hover:text-[#454138]"
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + 900);
                  restart(time)
                  pause()
                }
                }
              >
                15 Minute Period
              </button>
            </div>
            <div className="flex justify-between">
              <button
                className="rounded border border-[#dcd8c0] bg-[#dcd8c0] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                onClick={() => setShowPresetsPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Period Popup */}
      {showPeriodPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50">
          <div className="w-64 rounded-lg bg-[#454138] p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-[#dcd8c0]">Change Period</h2>
            <input
              type="number"
              value={periodTemp}
              onChange={(e) => setPeriodTemp(parseInt(e.target.value))}
              className="mb-4 w-full rounded bg-[#dcd8c0] p-2 text-[#454138] outline-none"
            />
            <div className="flex justify-between">
              <button
                className="rounded border border-[#dcd8c0] bg-[#dcd8c0] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                onClick={() => setShowPeriodPopup(false)}
              >
                Cancel
              </button>

              <button
                className="rounded border border-[#dcd8c0] bg-[#dcd8c0] px-4 py-2 text-[#454138] transition duration-200 ease-in-out hover:bg-[#454138] hover:text-[#dcd8c0]"
                onClick={() => {
                  setCurrentPeriod(periodTemp)
                  setShowPeriodPopup(false)
                }}
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="m-3 w-fit flex-none rounded-lg border-2 border-[#454138]">
          <h1 className="flex items-center justify-center border-b-2 border-[#454138] p-2 text-2xl font-semibold text-[#454138]">
            Preview
          </h1>

          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="m-3 rounded-lg" />
        </div>
      </div>
    </>
  )
}
