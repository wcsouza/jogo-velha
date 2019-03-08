var express = require("express");
var app = express();
var http = require("http").Server(app);
var cors = require("cors");

var port = process.env.PORT || 8080;

app.use(cors());

app.get("/", function(req, res) {
  res.send("server is running");
});

// register socket
require("./socket")(http);

http.listen(port, function() {
  console.log("listening on port " + port);
});
