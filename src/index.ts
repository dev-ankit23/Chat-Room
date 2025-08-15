import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allsocket: WebSocket[] = [];

wss.on("connection", (socket) => {
  allsocket.push(socket);
  userCount = userCount + 1;
  console.log("User Connected " + userCount);

  socket.on("message", (message) => {
    console.log("Message Received " + message.toString());
    allsocket.forEach((s) => {
      if (s) {
        // Type guard to ensure socket exists
        s.send(message.toString() + " :Sent From Server");
      }
    });
  });
});
