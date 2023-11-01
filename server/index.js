const WebSocket = require("ws")

// Create a WebSocket server instance on a specific port (e.g., 8080)
const wss = new WebSocket.Server({ port: 8080 })

// Event handler for when a client connects to the WebSocket server
wss.on("connection", (ws) => {
  console.log("Client connected")

  // Event handler for when a client sends a message
  ws.on("message", (message) => {
    console.log(`Received: ${message}`)

    // Send a response back to the client
    ws.send(`You sent: ${message}`)
  })

  // Event handler for when a client disconnects
  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

console.log("WebSocket server is running on port 8080")
