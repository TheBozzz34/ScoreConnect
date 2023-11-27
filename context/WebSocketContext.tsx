// context/WebSocketContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type WebSocketContextType = {
  messages: string[]
  sendMessage: (message: string) => void
  connectionStatus: string
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}

interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected")

  useEffect(() => {
    const newSocket = new WebSocket("wss://wss.catgirlsaresexy.org")

    newSocket.onopen = () => {
      console.log("WebSocket connected")
      setConnectionStatus("Connected")
    }

    newSocket.onmessage = (event) => {
      const newMessage = event.data
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    newSocket.onclose = () => {
      console.log("WebSocket connection closed")
      setConnectionStatus("Disconnected")
    }

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    }
  }

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage, connectionStatus }}>
      {children}
    </WebSocketContext.Provider>
  )
}
