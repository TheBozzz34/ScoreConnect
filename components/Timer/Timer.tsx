import React from "react"
import { useTimer } from "react-timer-hook"

interface TimerProps {
  expiryTimestamp: Date
}

export default function Timer({ expiryTimestamp }: TimerProps) {
  const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  })

  return (
    <div style={{ textAlign: "center" }}>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date()
          time.setSeconds(time.getSeconds() + 300)
          restart(time)
        }}
      >
        Restart
      </button>
    </div>
  )
}
