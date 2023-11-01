import React, { useEffect, useState } from "react"

export default function Clock() {
  const date = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => date[1](new Date()), 1000)
    return () => clearInterval(timer)
  }, [date])
  return (
    <div>
      <h1>Time: {date[0].toLocaleTimeString()}</h1>
    </div>
  )
}
