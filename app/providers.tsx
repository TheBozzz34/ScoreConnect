// app/providers.tsx
"use client"

import { NextUIProvider } from "@nextui-org/react"
import { WebSocketProvider } from "context/WebSocketContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <NextUIProvider>
        {children}
      </NextUIProvider>
  )
}
