import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";

const ButtonJogo = ({ x, y, onClick, text }) => (
  <Button variant="contained" color="default" onClick={e => onClick(x, y)}>
    {text}
  </Button>
);

export default class jogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marcador: "",
      tabuleiro: {
        "00": "",
        "01": "",
        "02": "",
        "10": "",
        "11": "",
        "12": "",
        "20": "",
        "21": "",
        "22": ""
      }
    };
  }
  socket = io("http://localhost:8080");

  componentDidMount() {
    this.conectar();
  }

  conectar = () => {
    this.socket.connect();
    console.log(this.socket);

    const me = this;

    this.socket.on("started", function(data) {
      console.log("started:", data);
      me.setState({ marcador: data });
    });

    this.socket.on("update", function(data) {
      console.log("update:", data);
      me.setState({ tabuleiro: data });
    });

    // this.socket.on("private", function(data) {
    //   alert("private: " + data);
    // });

    this.entrarJogo();
  };

  entrarJogo = () => {
    this.socket.emit("join", "nick");
  };

  onClick = (x, y) => {
    console.log("Clicado:", x, y);
    const { tabuleiro } = this.state;
    let ref = x + "" + y;

    if (tabuleiro[ref]) return;

    //tabuleiro[ref] = this.state.marcador;
    //this.setState({ tabuleiro });
    this.socket.emit("jogada", { x, y });
  };

  render() {
    const { tabuleiro } = this.state;
    return (
      <div>
        {/* <Button
          variant="contained"
          color="default"
          onClick={() => this.entrarJogo()}
        >
          Start
        </Button> */}
        Aqui se joga
        <br />
        <ButtonJogo x="0" y="0" onClick={this.onClick} text={tabuleiro["00"]} />
        <ButtonJogo x="0" y="1" onClick={this.onClick} text={tabuleiro["01"]} />
        <ButtonJogo x="0" y="2" onClick={this.onClick} text={tabuleiro["02"]} />
        <br />
        <ButtonJogo x="1" y="0" onClick={this.onClick} text={tabuleiro["10"]} />
        <ButtonJogo x="1" y="1" onClick={this.onClick} text={tabuleiro["11"]} />
        <ButtonJogo x="1" y="2" onClick={this.onClick} text={tabuleiro["12"]} />
        <br />
        <ButtonJogo x="2" y="0" onClick={this.onClick} text={tabuleiro["20"]} />
        <ButtonJogo x="2" y="1" onClick={this.onClick} text={tabuleiro["21"]} />
        <ButtonJogo x="2" y="2" onClick={this.onClick} text={tabuleiro["22"]} />
      </div>
    );
  }
}
