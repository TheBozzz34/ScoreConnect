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
  const [reconnectionAttempts, setReconnectionAttempts] = useState<number>(0)
  const maxReconnectionAttempts = 5; // Adjust this value as needed

  const connectWebSocket = () => {
    const newSocket = new WebSocket("wss://wss.catgirlsaresexy.org")
    // const newSocket = new WebSocket("ws://127.0.0.1:8080")

    newSocket.onopen = () => {
      console.log("WebSocket connected")
      setConnectionStatus("Connected")
      setReconnectionAttempts(0); // Reset reconnection attempts on successful connection
    }

    newSocket.onmessage = (event) => {
      const newMessage = event.data
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    newSocket.onclose = () => {
      console.log("WebSocket connection closed, trying to reconnect")
      setConnectionStatus("Disconnected")
      setTimeout(() => {
        connectWebSocket(); // Attempt to reconnect
        setReconnectionAttempts(reconnectionAttempts + 1);
      }, 2000); // Adjust this timeout as needed
      /*
      if (reconnectionAttempts < maxReconnectionAttempts) {
        setTimeout(() => {
          connectWebSocket(); // Attempt to reconnect
          setReconnectionAttempts(reconnectionAttempts + 1);
        }, 2000); // Adjust this timeout as needed
      }
      */
    }

    setSocket(newSocket)
  }

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    }
  }, []);

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
