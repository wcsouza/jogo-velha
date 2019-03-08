const Server = require("socket.io");

var tabuleiro;
var player1Id;
var player2Id;
var playerTurn;
var ready;

resetState();

function resetState() {
  ready = false;
  player1Id = null;
  player2Id = null;
  playerTurn = null;
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

module.exports = function(http) {
  io = new Server(http, { path: "/socket" });

  function updateList() {
    var sockets = io.sockets.sockets;
    var lista = [];

    for (var socketId in sockets) {
      var status =
        socketId == player1Id ? "P1" : socketId == player2Id ? "P2" : "";
      lista.push({ name: sockets[socketId].name, status });
    }

    io.emit("updateList", lista);
  }

  function iniciarJogo() {
    if (ready) return;

    if (!player1Id || !player2Id) {
      var sockets = io.sockets.sockets;
      var primeiro = true;
      for (var socketId in sockets) {
        if (primeiro) {
          player1Id = socketId;
          primeiro = false;
        } else {
          player2Id = socketId;
          break;
        }
      }
    }

    if (player1Id && player2Id) {
      ready = true;
      playerTurn = player1Id;

      var player1 = io.sockets.connected[player1Id];
      player1.marcador = "X";
      player1.emit("started", player1.marcador, true, tabuleiro);

      var player2 = io.sockets.connected[player2Id];
      player2.marcador = "O";
      player2.emit("started", player2.marcador, false, tabuleiro);
    }
  }

  io.on("connection", function(client) {
    client.on("join", function(name) {
      client.name = name;

      iniciarJogo();

      updateList();
    });

    client.on("jogada", function({ x, y }) {
      let ref = x + "" + y;
      if (tabuleiro[ref] || playerTurn != client.id) return;

      tabuleiro[ref] = client.marcador;

      playerTurn = playerTurn == player1Id ? player2Id : player1Id;

      client.emit("update", tabuleiro);
      client.broadcast.emit("update", tabuleiro);
    });

    function estaJogando(playerId) {
      return playerId == player1Id || playerId == player2Id;
    }

    client.on("disconnect", function() {
      if (estaJogando(client.id)) {
        resetState();
        iniciarJogo();
      }

      updateList();
    });
  });
};
