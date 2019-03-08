var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 8080;

var primeiro;
var clients = {};
var tabuleiro;

resetState();

function resetState() {
  primeiro = true;
  tabuleiro = {
    "00": "",
    "01": "",
    "02": "",
    "10": "",
    "11": "",
    "12": "",
    "20": "",
    "21": "",
    "22": ""
  };
}

app.get("/", function(req, res) {
  res.send("server is running");
});

io.on("connection", function(client) {
  //console.log("Conectado:", client);
  client.on("join", function(name) {
    console.log("Joined: " + name);
    var marcador = primeiro ? "X" : "O";
    if (primeiro) primeiro = false;

    clients[client.id] = { name, marcador };
    client.emit("started", marcador);
    client.broadcast.emit("update", tabuleiro);
  });

  client.on("jogada", function({ x, y }) {
    console.log("jogada", x, y);
    tabuleiro[x + "" + y] = clients[client.id].marcador;
    client.emit("update", tabuleiro);
    client.broadcast.emit("update", tabuleiro);
  });

  client.on("disconnect", function() {
    console.log("Disconnect");

    delete clients[client.id];

    resetState();

    io.emit("update", tabuleiro);
  });
});

http.listen(port, function() {
  console.log("listening on port " + port);
});
