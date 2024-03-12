import { onAuthStateChanged, User } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useWebSocket } from "context/WebSocketContext"
import { auth } from "../../firebase"

const Public = () => {
  const { messages, sendMessage } = useWebSocket()
  const [userAccount, setUserAccount] = useState<User | null>(null)
  const router = useRouter()

  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)
  const [teamAFouls, setTeamAFouls] = useState(0)
  const [teamBFouls, setTeamBFouls] = useState(0)
  const [currentPeriod, setCurrentPeriod] = useState(1)

  const [teamAName, setTeamAName] = useState("Team A")
  const [teamBName, setTeamBName] = useState("Team B")


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
    messages.forEach((message) => {
      const messageJson = JSON.parse(message) as { boardId: string; boardData: string }

      console.log(messageJson)

      if (messageJson.boardId === userAccount?.uid) {
        const data = JSON.parse(messageJson.boardData) as {
          teamAScore: number
          teamBScore: number
          teamAFouls: number
          teamBFouls: number
          currentPeriod: number
          teamAName: string
          teamBName: string
        }
        
        setTeamAScore(data.teamAScore)
        setTeamBScore(data.teamBScore)
        setTeamAFouls(data.teamAFouls)
        setTeamBFouls(data.teamBFouls)
        setCurrentPeriod(data.currentPeriod)
        setTeamAName(data.teamAName)
        setTeamBName(data.teamBName)
        
      }
    })
    

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login")
      }
    })
  }, [router, sendMessage, messages, userAccount?.uid])

  return (
    <>
      <Head>
        <title>ScoreConnect Public Page</title>
      </Head>

      <body
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >

        <h1 className="text-4xl font-bold">ScoreConnect</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            <h2 className="text-2xl font-bold">{teamAName}</h2>

            <hr className="w-1/4 mx-4" />

            <h2 className="text-2xl font-bold">{teamAScore}</h2>
            <hr className="w-1/4 mx-4" />
            
            <h2 className="text-2xl font-bold">{teamAFouls}</h2>
          </div>
          <div className="flex flex-row items-center justify-center">
            <h2 className="text-2xl font-bold">{teamBName}</h2>

            <hr className="w-1/4 mx-4" />
            <h2 className="text-2xl font-bold">{teamBScore}</h2>
            <hr className="w-1/4 mx-4" />
            <h2 className="text-2xl font-bold">{teamBFouls}</h2>
          </div>
          <div className="flex flex-row items-center justify-center">
            <h2 className="text-2xl font-bold">{currentPeriod}</h2>
          </div>
        </div>
      </body>
    </>
  )
}

export default Public
