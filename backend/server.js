var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 8080;

var tabuleiro;

resetState();

function resetState() {
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
  client.on("join", function(name) {
    console.log("Joined: " + name);
    var marcador = Object.keys(io.sockets.connected).length == 1 ? "X" : "O";

    client.name = name;
    client.marcador = marcador;
    client.emit("started", marcador);
    client.broadcast.emit("update", tabuleiro);

    // mandando mensagem para um cliente pelo id especifico
    // if (clients.length > 1) {
    //   clients.forEach(element => {
    //     console.log("no private", element);
    //     if (element.id != client.id) {
    //       var dest = io.sockets.connected[element.id];
    //       dest.emit("private", "msg privada");
    //     }
    //   });
    // }
  });

  client.on("jogada", function({ x, y }) {
    console.log("jogada", x, y);
    let ref = x + "" + y;
    if (tabuleiro[ref]) return;

    tabuleiro[ref] = client.marcador;

    client.emit("update", tabuleiro);
    client.broadcast.emit("update", tabuleiro);
  });

  client.on("disconnect", function() {
    console.log("Disconnect", Object.keys(io.sockets.connected).length);

    resetState();

    io.emit("update", tabuleiro);
  });
});

http.listen(port, function() {
  console.log("listening on port " + port);
});
