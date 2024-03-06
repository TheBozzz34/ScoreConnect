import Head from "next/head"
import React from "react"

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>ScoreConnect Error</title>
      </Head>
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Looks like the information you seek is lost in the depths of the system.</p>
        <p>
          Return <a href="/">home</a> and try again?
        </p>
      </div>
    </>
  )
}

export default Custom404
