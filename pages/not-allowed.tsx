import Head from "next/head"
import React, { useEffect } from "react"
import "../styles/yorha.module.css"
import { auth, provider } from "../firebase"
import { signOut } from "firebase/auth"


const NotAllowed = () => {

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
    }, [])

    return (
        <>
            <Head>
                <title>ScoreConnect Error</title>
            </Head>
            <div className="error-container">
                <h1>Error</h1>
                <h2>Access denied</h2>
                <p>Your account does not appear to have access. Are you using your domain email?</p>
            </div>
        </>
    )
}

export default NotAllowed
