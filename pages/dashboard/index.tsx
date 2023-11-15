import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/navigation"
import React, { ChangeEvent, useEffect, useState } from "react"
import NavBar from "components/Navbar/Navbar"
import { useWebSocket } from "../../context/WebSocketContext"
import { auth } from "../../firebase"

export default function Profile() {
  const router = useRouter()
  const { messages, sendMessage, connectionStatus } = useWebSocket()
  const [inputText, setInputText] = useState("")

  const sendMessageWithToken = async () => {
    try {
      const token = await auth.currentUser?.getIdToken() // Fetch the token asynchronously
      const testMessageJson = {
        id: Math.floor(Math.random() * 100000),
        type: parseInt(inputText),
        text: "ping!",
        token: token,
      }

      sendMessage(JSON.stringify(testMessageJson))
    } catch (error) {
      // Handle any errors that may occur while fetching the token
      console.error("Error fetching token:", error)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  useEffect(() => {
    console.log("Checking auth state")
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login")
      }
    })
  }, [router, messages])

  // const time = new Date();

  function messageFmt(message: string) {
    return message
    //message = message.slice(10)
    // return `server - ${message}`
  }

  return (
    <>
      <Head>
        <meta property="og:url" content="https://sc.necrozma.xyz" />
        <title>ScoreConnect Web</title>
      </Head>
      <NavBar />
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid w-1/3 px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4  text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Dashboard
            </h1>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Connection Status:
            </p>
            <div className="flex flex-col space-y-4 rounded-lg border-2 border-gray-200 p-4">
              <p className="mb-3 font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                WS Server:
                <span
                  className="w-fit rounded bg-gray-300 p-1"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  {connectionStatus === "Connected" ? "Connected" : "Disconnected"}
                </span>
              </p>
              <p className="mb-3 font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                Scoreboard:
                <span
                  className="w-fit rounded bg-gray-300 p-1"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  Disconnected
                  <svg height="1em" width="1em" style={{ marginLeft: "0.3em" }}>
                    <circle cx="0.5em" cy="0.5em" r="0.4em" stroke="black" strokeWidth="0.1em" fill="red" />
                  </svg>
                </span>
              </p>

              <button
                className="rounded-lg border-2 border-gray-200 p-4 transition duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-800"
                onClick={() => sendMessage("test")}
              >
                Test Scoreboard Connection
              </button>

              <button
                className="rounded-lg border-2 border-gray-200 p-4 transition duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-800"
                onClick={() => router.push("/scoreboard")}
              >
                Open Scoreboard
              </button>
            </div>

            <div
              id="websocketTestInput"
              className="mt-1 flex flex-col space-y-4 rounded-lg border-2 border-gray-200 p-4"
            >
              <p className="mb-3 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-4 lg:text-xl">
                WebSocket Test
              </p>
              <input
                type="number"
                placeholder="Message type"
                className="rounded-lg border-2 border-gray-200 p-4"
                onChange={handleChange}
                value={inputText}
              />
              <button
                onClick={sendMessageWithToken}
                className="rounded-lg border-2 border-gray-200 p-4 transition duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-800"
              >
                Send Message
              </button>
            </div>

            <div className="mt-1 flex flex-col space-y-4 rounded-lg border-2 border-gray-200 p-4">
              <h2>WebSocket Messages</h2>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{messageFmt(message)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/*
export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            session: await auth.getUser(context)
        }
    }
}
*/
