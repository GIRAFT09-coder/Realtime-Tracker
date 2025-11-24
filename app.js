const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

io.on("connection", (socket) => {
    socket.on("location", (data) => {
        console.log("received location: ", data);
        io.emit("received-location", {id: socket.id, latitude: data.latitude, longitude: data.longitude});
    })
    socket.on("disconnect", () => {
        io.emit("User disconnected", socket.id);
    })
    console.log("New user connected");
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
