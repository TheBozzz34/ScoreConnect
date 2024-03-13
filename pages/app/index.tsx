import { onAuthStateChanged, User } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { BsPencilSquare } from "react-icons/bs"
import { useTimer } from "react-timer-hook"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { Navbar } from "components/Navbar/nav-bar.component"
import { auth } from "../../firebase"
import { useIsMobile } from "../../utils/useIsMobile"

export default function Scoreboard() {
  const [userAccount, setUserAccount] = useState<User | null>(null)
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  // const { messages, sendMessage, connectionStatus } = useWebSocket()

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://wss.catgirlsaresexy.org",
    {
      share: true,
      shouldReconnect: () => true,
    },
  )

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const ignore = useRef<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAccount(user)
      } else {
        setUserAccount(null)
      }
    })
  }, [])

  useEffect(() => {

    if (ignore.current) return;

    if (readyState !== ReadyState.OPEN) return;

    if (!userAccount) return;

    const message = {
      action: "get",
      boardId: userAccount?.uid,
    }
    sendMessage(JSON.stringify(message))

    ignore.current = true;

  }, [readyState, sendMessage, userAccount])

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

  const [showControls, setShowControls] = useState(false)

  const [periodTemp, setPeriodTemp] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWidth = 640
  const canvasHeight = 360

  const [possession, setPossession] = useState(0)

  const router = useRouter()
  const isMobile = useIsMobile()

  const now = new Date()

  let { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp: new Date(now.getTime() + 1000 * 60 * 30),
    onExpire: () => console.warn("onExpire called"),
  })

  let resetBoard = () => {
    setCurrentPeriod(1)
    setTeamAScore(0)
    setTeamBScore(0)
    setTeamAFouls(0)
    setTeamBFouls(0)
    const time = new Date()
    time.setSeconds(time.getSeconds() + 300)
    restart(time)
    pause()
  }

  function reportData() {
    // console.log("Reporting data")
    const data = {
      teamAName: teamAName,
      teamBName: teamBName,
      teamAScore: teamAScore,
      teamBScore: teamBScore,
      teamAFouls: teamAFouls,
      teamBFouls: teamBFouls,
      currentPeriod: currentPeriod,
      minutes: minutes,
      seconds: seconds,
      possession: possession,
    }
    const dataJson = JSON.stringify(data)
    const messageJson = {
      action: "set",
      boardId: userAccount?.uid,
      boardData: dataJson,
    }

    if(areAllZero) return

    sendMessage(JSON.stringify(messageJson))
  }

  useEffect(() => {
    if (ignore.current) {
      ignore.current = false
      return
    }
    reportData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamAScore, teamBScore, teamAFouls, teamBFouls, currentPeriod, minutes, seconds, possession])

  useEffect(() => {
    messageHistory.forEach((message) => {
      const messageJson = JSON.parse(message.data) as {
        boardId?: string
        boardData?: string
      }

      if (messageJson.boardId && messageJson.boardData) {
        const data = JSON.parse(messageJson.boardData) as {
          teamAName: string
          teamBName: string
          teamAScore: number
          teamBScore: number
          teamAFouls: number
          teamBFouls: number
          currentPeriod: number
          minutes: number
          seconds: number
          possession: number
        }

        setTeamAName(data.teamAName)
        setTeamBName(data.teamBName)
        setTeamAScore(data.teamAScore)
        setTeamBScore(data.teamBScore)
        setTeamAFouls(data.teamAFouls)
        setTeamBFouls(data.teamBFouls)
        setCurrentPeriod(data.currentPeriod)
        setPossession(data.possession)
      }
    }
    )
  } , [messageHistory])


  const incrementTeamAScore = () => {
    setTeamAScore(teamAScore + 1)
  }

  const decrementTeamAScore = () => {
    if (teamAScore > 0) {
      setTeamAScore(teamAScore - 1)
    }
  }

  // Function to increment the score for Team B
  const incrementTeamBScore = () => {
    setTeamBScore(teamBScore + 1)
  }

  const decrementTeamBScore = () => {
    if (teamBScore > 0) {
      setTeamBScore(teamBScore - 1)
    }
  }

  const decrementTeamAFouls = () => {
    if (teamAFouls > 0) {
      setTeamAFouls(teamAFouls - 1)
    }
  }

  const decrementTeamBFouls = () => {
    if (teamBFouls > 0) {
      setTeamBFouls(teamBFouls - 1)
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const areAllZero = teamAScore === 0 && teamBScore === 0 && teamAFouls === 0 && teamBFouls === 0 && currentPeriod === 1 && minutes === 30 && seconds === 0 && possession === 0 && teamAName === "Team A" && teamBName === "Team B" 

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    if (ctx) {
      ctx.fillStyle = "transparent"

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // Display team names
      ctx.fillStyle = "white"
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(teamAName, canvasWidth / 4, canvasHeight / 3)
      ctx.fillText(teamBName, (canvasWidth / 4) * 3, canvasHeight / 3)

      // Display scores
      ctx.font = "bold 72px Arial"
      ctx.fillText(teamAScore.toString(), canvasWidth / 4, (canvasHeight / 4) * 2)
      ctx.fillText(teamBScore.toString(), (canvasWidth / 4) * 3, (canvasHeight / 6) * 3)

      // Display fouls
      ctx.font = "bold 24px Arial"
      ctx.fillText(`Fouls: ${teamAFouls}`, canvasWidth / 4, (canvasHeight / 6) * 3 + 50)
      ctx.fillText(`Fouls: ${teamBFouls}`, (canvasWidth / 4) * 3, (canvasHeight / 6) * 3 + 50)

      // Display periods
      ctx.fillText(`Period: ${currentPeriod}`, canvasWidth / 2, canvasHeight - 50)

      const arrowWidth = 80
      const arrowHeight = 40
      const arrowMargin = 70 // Adjust the margin as needed
      const totalArrowWidth = arrowWidth * 2 + arrowMargin
      const arrowX = canvasWidth / 2 - totalArrowWidth / 3
      const arrowY = canvasHeight - 100

      ctx.beginPath()
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(arrowX + arrowHeight, arrowY - arrowHeight / 2)
      ctx.lineTo(arrowX + arrowHeight, arrowY + arrowHeight / 2)
      ctx.closePath()
      ctx.fillStyle = possession === 1 ? "yellow" : "white"
      ctx.fill()

      // Draw right arrow
      ctx.beginPath()
      ctx.moveTo(arrowX + arrowWidth + arrowMargin, arrowY)
      ctx.lineTo(arrowX + arrowWidth + arrowMargin - arrowHeight, arrowY - arrowHeight / 2)
      ctx.lineTo(arrowX + arrowWidth + arrowMargin - arrowHeight, arrowY + arrowHeight / 2)
      ctx.closePath()
      ctx.fillStyle = possession === 2 ? "yellow" : "white"
      ctx.fill()

      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const clickY = e.clientY - rect.top

        if (
          clickX > arrowX &&
          clickX < arrowX + arrowHeight &&
          clickY > arrowY - arrowHeight / 2 &&
          clickY < arrowY + arrowHeight / 2
        ) {
          canvas.style.cursor = "pointer"
        } else if (
          clickX > arrowX + arrowWidth + arrowMargin - arrowHeight &&
          clickX < arrowX + arrowWidth + arrowMargin &&
          clickY > arrowY - arrowHeight / 2 &&
          clickY < arrowY + arrowHeight / 2
        ) {
          canvas.style.cursor = "pointer"
        } else {
          canvas.style.cursor = "default"
        }
      })

      canvas.addEventListener(
        "click",
        debounce((e) => {
          const rect = canvas.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const clickY = e.clientY - rect.top

          if (
            clickX > arrowX &&
            clickX < arrowX + arrowHeight &&
            clickY > arrowY - arrowHeight / 2 &&
            clickY < arrowY + arrowHeight / 2
          ) {
            // If already active, deactivate it
            setPossession(possession === 1 ? 0 : 1)
          }

          // Check if the click is within the right arrow
          if (
            clickX > arrowX + arrowWidth + arrowMargin - arrowHeight &&
            clickX < arrowX + arrowWidth + arrowMargin &&
            clickY > arrowY - arrowHeight / 2 &&
            clickY < arrowY + arrowHeight / 2
          ) {
            // If already active, deactivate it
            setPossession(possession === 2 ? 0 : 2)
          }
        }, 500)
      )

      // Display timer/clock
      ctx.fillStyle = "white"
      if (seconds < 10) {
        ctx.fillText(`${minutes}:0${seconds}`, canvasWidth / 2, canvasHeight - 170)
      } else {
        ctx.fillText(`${minutes}:${seconds}`, canvasWidth / 2, canvasHeight - 170)
      }
    }
  }, [
    teamAScore,
    teamBScore,
    teamAName,
    teamBName,
    teamAFouls,
    teamBFouls,
    currentPeriod,
    minutes,
    seconds,
    possession,
  ])

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timer: number
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  return (
    <>
      <Head>
        <title>ScoreConnect ScoreBoard</title>
      </Head>{" "}
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        {showControls ? (
          <section className="mt-4 w-2/3 grow">
            <div className="mr-3 rounded-lg border-2 border-white">
              <h1 className="flex items-center justify-center border-b-2 border-white p-2 text-2xl font-semibold ">
                Controls
              </h1>

              <button
                className="rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-black"
                onClick={() => setShowControls(false)}
              >
                Hide Controls &#40;temp button&#41;
              </button>

              <div className="flex flex-col space-y-4 rounded-lg p-4">
                <button
                  className="rounded border border-white py-2 text-black transition duration-200 ease-in-out hover:bg-white hover:text-black"
                  onClick={() => {
                    setShowPeriodPopup(true)
                  }}
                >
                  Change Period
                </button>

                <p className="mb-3 border-t-2 border-white pt-4 font-light  dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                  Timer:
                  <span
                    className="w-fit rounded bg-white p-2 text-black"
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                  <span
                    className="ml-2 w-fit rounded bg-white p-2 text-black"
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    {isRunning ? "Running" : "Paused"}
                  </span>
                  <button
                    className="ml-2 rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-transparent"
                    onClick={() => {
                      if (isRunning) {
                        pause()
                      } else {
                        resume()
                      }
                    }}
                  >
                    {isRunning ? "super cool icon 1" : "super cool icon 2"}
                  </button>
                  <button
                    className="ml-2 rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-black"
                    onClick={() => {
                      setShowPresetsPopup(true)
                    }}
                  >
                    Presets
                  </button>
                  <button
                    className="ml-2 mr-1 rounded border  border-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-white hover:text-black"
                    onClick={() => {
                      const inputTime = prompt("Enter time in format MM:SS")
                      if (inputTime) {
                        const timeSplit = inputTime.split(":")
                        const currentTime = new Date()
                        currentTime.setMinutes(currentTime.getMinutes() + parseInt(timeSplit[0]))
                        currentTime.setSeconds(currentTime.getSeconds() + parseInt(timeSplit[1]))
                        restart(currentTime)
                        pause()
                      }
                    }}
                  >
                    Custom Timer
                  </button>
                </p>
                <span className="mb-3 border-t-2 border-white font-light  dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl"></span>

                <button
                  className="rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-transparent"
                  onClick={() => resetBoard()}
                >
                  Reset Board
                </button>
              </div>
            </div>
          </section>
        ) : (
          <button
            className="rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-black"
            onClick={() => setShowControls(true)}
          >
            Show Controls &#40;temp button&#41;
          </button>
        )}

        <section className="glass !w-2/3 grow">
          <div className="mt-4">
            <div className="justify-center rounded-lg pb-4 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-2">
              <div className="border-r-2 border-[#ffffff33] text-center">
                <h2
                  className="flex cursor-pointer items-center justify-center text-2xl font-semibold text-[#ffffff93]"
                  onClick={() => setShowTeamAPopup(true)}
                >
                  {teamAName}
                  <BsPencilSquare className="ml-2 " onClick={() => setShowTeamAPopup(true)} />
                </h2>
                <button
                  onClick={incrementTeamAScore}
                  className="glass-button"
                >
                  Increment score
                </button>
                <button
                  onClick={decrementTeamAScore}
                  className="glass-button"
                >
                  Decrement score
                </button>
                <br />
                <button
                  onClick={() => setTeamAScore(0)}
                  className="glass-button"
                >
                  Reset score
                </button>
                <span
                  className="glass-button"
                  onClick={() => setTeamAScore(teamAScore + 2)}
                >
                  {" "}
                  +2
                </span>
                <span
                  className="glass-button"
                  onClick={() => setTeamAScore(teamAScore + 3)}
                >
                  {" "}
                  +3
                </span>
                <span
                  className="glass-button"
                  onClick={() => setTeamAScore(teamAScore + 4)}
                >
                  {" "}
                  +4
                </span>

                <br />
                <button
                  onClick={() => setTeamAFouls(teamAFouls + 1)}
                  className="glass-button"
                >
                  Increment fouls
                </button>
                <button
                  onClick={decrementTeamAFouls}
                  className="glass-button"
                >
                  Decrement fouls
                </button>
                <br />
                <button
                  onClick={() => setTeamAFouls(0)}
                  className="glass-button"
                >
                  Reset fouls
                </button>
              </div>
              <div className="border-l-2 border-[#ffffff33] text-center">
                <h2
                  className="flex cursor-pointer items-center justify-center text-2xl font-semibold text-[#ffffff93]"
                  onClick={() => setShowTeamBPopup(true)}
                >
                  {teamBName}
                  <BsPencilSquare className="ml-2 " onClick={() => setShowTeamBPopup(true)} />
                </h2>
                <button
                  onClick={incrementTeamBScore}
                  className="glass-button"
                >
                  Increment score
                </button>
                <button
                  onClick={decrementTeamBScore}
                  className="glass-button"
                >
                  Decrement score
                </button>
                <br />
                <button
                  onClick={() => setTeamBScore(0)}
                  className="glass-button"
                >
                  Reset score
                </button>
                <span
                  className="glass-button"
                  onClick={() => setTeamBScore(teamBScore + 2)}
                >
                  {" "}
                  +2
                </span>
                <span
                  className="glass-button"
                  onClick={() => setTeamBScore(teamBScore + 3)}
                >
                  {" "}
                  +3
                </span>
                <span
                  className="glass-button"
                  onClick={() => setTeamBScore(teamBScore + 4)}
                >
                  {" "}
                  +4
                </span>
                <br />
                <button
                  onClick={() => setTeamBFouls(teamBFouls + 1)}
                  className="glass-button"
                >
                  Increment fouls
                </button>
                <button
                  onClick={decrementTeamBFouls}
                  className="glass-button"
                >
                  Decrement fouls
                </button>
                <br />
                <button
                  onClick={() => setTeamBFouls(0)}
                  className="glass-button"
                >
                  Reset fouls
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {showTeamAPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50 text-white">
          {/* <NameChangeOverlay onClick={() => setShowTeamAPopup(false)} /> */}
          <div className="w-64 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-black">Change Team A Name</h2>
            <input
              type="text"
              value={teamANameTemp}
              onChange={(e) => setTeamANameTemp(e.target.value)}
              className="mb-4 w-full rounded bg-black p-2  outline-none"
            />
            <div className="flex justify-between">
              <button
                className="rounded border border-black bg-black px-4 py-2  transition duration-200 ease-in-out hover:bg-white hover:text-black"
                onClick={() => handleTeamANameChange(teamANameTemp)}
              >
                Save
              </button>
              <button
                className="rounded border border-black bg-black px-4 py-2  transition duration-200 ease-in-out hover:bg-white hover:text-black"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50 text-white">
          {/* <NameChangeOverlay onClick={() => setShowTeamBPopup(false)} /> */}
          <div className="w-64 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-black">Change Team B Name</h2>
            <input
              type="text"
              value={teamBNameTemp}
              onChange={(e) => setTeamBNameTemp(e.target.value)}
              className="mb-4 w-full rounded bg-black p-2  outline-none"
            />
            <div className="flex justify-between">
              <button
                className="rounded border border-black bg-black px-4 py-2  transition duration-200 ease-in-out hover:bg-white hover:text-black"
                onClick={() => handleTeamBNameChange(teamBNameTemp)}
              >
                Save
              </button>
              <button
                className="rounded border border-black bg-black px-4 py-2  transition duration-200 ease-in-out hover:bg-white hover:text-black"
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
          <div className="w-64 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-black">Presets</h2>
            <div className="flex flex-col space-y-4 rounded-lg p-4">
              <button
                className="rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-black"
                onClick={() => {
                  const time = new Date()
                  time.setSeconds(time.getSeconds() + 60)
                  restart(time)
                  pause()
                }}
              >
                1 Minute Period
              </button>

              <button
                className="rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-black"
                onClick={() => {
                  const time = new Date()
                  time.setSeconds(time.getSeconds() + 300)
                  restart(time)
                  pause()
                }}
              >
                5 Minute Period
              </button>
              <button
                className="rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-black"
                onClick={() => {
                  const time = new Date()
                  time.setSeconds(time.getSeconds() + 600)
                  restart(time)
                  pause()
                }}
              >
                10 Minute Period
              </button>
              <button
                className="rounded border border-white bg-white px-4 py-2 text-black transition duration-200 ease-in-out hover:bg-black"
                onClick={() => {
                  const time = new Date()
                  time.setSeconds(time.getSeconds() + 900)
                  restart(time)
                  pause()
                }}
              >
                15 Minute Period
              </button>
            </div>
            <div className="flex justify-between">
              <button
                className="rounded border border-black bg-black px-4 py-2  transition duration-200 ease-in-out hover:bg-white hover:text-black"
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
          <div className="w-64 rounded-lg bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-black">Change Period</h2>
            <input
              type="number"
              value={periodTemp}
              onChange={(e) => setPeriodTemp(parseInt(e.target.value))}
              className="mb-4 w-full rounded bg-black p-2  outline-none"
            />
            <div className="flex justify-between">
              <button
                className="rounded border border-black bg-black px-4 py-2  transition duration-200 ease-in-out hover:bg-white hover:text-black"
                onClick={() => setShowPeriodPopup(false)}
              >
                Cancel
              </button>

              <button
                className="rounded border border-black bg-black px-4 py-2  transition duration-200 ease-in-out hover:bg-white hover:text-black"
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
      <div className="flex flex-col items-center justify-center">
        <div className="flex !w-2/3 items-start justify-start">
          <div className="flex flex-none items-center justify-center glass">
            <div className="w-fit rounded-lg">
              <h1 className="flex items-center justify-center p-2 text-2xl font-semibold ">
                Preview 
                <button
                  className="ml-2 rounded border border-white bg-white px-4 text-black transition duration-200 ease-in-out hover:bg-transparent"
                  onClick={() => {
                    const message = {
                      action: "get",
                      boardId: userAccount?.uid,
                    }
                    sendMessage(JSON.stringify(message))
                  }}
                >
                  Update Board Manually
                </button>
              </h1>
              <div className="flex justify-center">
                <div className="flex items-center justify-center">
                  <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="m-3 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
