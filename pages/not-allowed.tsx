import { signOut } from "firebase/auth"
import Head from "next/head"
import React, { useEffect } from "react"
import "../styles/yorha.module.css"
import { auth } from "../firebase"

const NotAllowed = () => {
  const [errorCode, setErrorCode] = React.useState("")

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out")
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  useEffect(() => {
    signOutUser()
    const params = new URLSearchParams(window.location.search)
    setErrorCode(params.get("error") || "")
  }, [])

  return (
    <>
      <Head>
        <title>ScoreConnect Error</title>
      </Head>
      <div className="error-container">
        <h1>{errorCode}</h1>
        {errorCode === "auth/user-disabled" && (
          <h2>Your account has been disabled. Please contact a ScoreConnect administrator.</h2>
        )}
        {errorCode === "auth/domain-not-allowed" && (
          <h2>Your email domain is not allowed. Please contact a ScoreConnect administrator.</h2>
        )}
      </div>
    </>
  )
}

export default NotAllowed
