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
      if (messageJson.boardId === userAccount?.uid) {
        const data = JSON.parse(messageJson.boardData)
        console.log(data)
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
    </>
  )
}

export default Public
