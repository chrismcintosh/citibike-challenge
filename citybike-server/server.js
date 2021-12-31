// External Includes
const express = require("express");
const http = require("http");
// const request = require("request")
const cors = require("cors");
const axios = require("axios")
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach";
const routes = require("./routes/index.js");

// Initialize the app
const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(routes);

const server = http.createServer(app);
const port = process.env.PORT || 4001;

// Initialize Socket
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true
});

io.on("connection", (socket) => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log("New connection " + socketId + " from " + clientIp);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  axios.get(citybikeurl).then(res => {
    console.log(res.data.network)
    io.emit("citybike", res.data.network)
  });
});

// Listen for the Server
server.listen(port, () => console.log(`Listening on port ${port}`));
