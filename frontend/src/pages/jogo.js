import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";
import Lista from "../components/lista";

const ButtonJogo = ({ x, y, onClick, text }) => (
  <Button variant="contained" color="default" onClick={e => onClick(x, y)}>
    {text}
  </Button>
);

export default class jogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: "",
      marcador: "",
      tabuleiro: null,
      lista: [],
      suaVez: false,
      estaJogando: false
    };
  }
  socket = io("http://localhost:8080", { path: "/socket" });

  componentDidMount() {
    const nick = this.props.location.state.nick;
    this.setState({ nick }, () => {
      this.conectar();
    });
  }

  conectar = () => {
    this.socket.connect();

    const me = this;

    this.socket.on("started", function(marcador, suaVez, tabuleiro) {
      me.setState({ marcador, suaVez, tabuleiro, estaJogando: true });
    });

    this.socket.on("updateList", function(lista) {
      me.setState({ lista });
    });

    this.socket.on("update", function(tabuleiro) {
      me.setState({ tabuleiro, suaVez: !me.state.suaVez });
    });

    this.entrarJogo();
  };

  entrarJogo = () => {
    this.socket.emit("join", this.state.nick);
  };

  onClick = (x, y) => {
    const { tabuleiro, estaJogando, suaVez } = this.state;

    if (!estaJogando || !suaVez || tabuleiro[x + "" + y]) return;

    this.socket.emit("jogada", { x, y });
  };

  render() {
    const { tabuleiro, suaVez, estaJogando } = this.state;

    const renderSuaVez = () => {
      if (!estaJogando) return <p>Você não está no jogo! Aguarde...</p>;

      if (suaVez) return <p>Sua vez de jogar!</p>;

      return <p>Aguarde seu oponente jogar!</p>;
    };

    const renderTabuleiro = () => {
      if (tabuleiro)
        return (
          <React.Fragment>
            <ButtonJogo
              x="0"
              y="0"
              onClick={this.onClick}
              text={tabuleiro["00"]}
            />
            <ButtonJogo
              x="0"
              y="1"
              onClick={this.onClick}
              text={tabuleiro["01"]}
            />
            <ButtonJogo
              x="0"
              y="2"
              onClick={this.onClick}
              text={tabuleiro["02"]}
            />
            <br />
            <ButtonJogo
              x="1"
              y="0"
              onClick={this.onClick}
              text={tabuleiro["10"]}
            />
            <ButtonJogo
              x="1"
              y="1"
              onClick={this.onClick}
              text={tabuleiro["11"]}
            />
            <ButtonJogo
              x="1"
              y="2"
              onClick={this.onClick}
              text={tabuleiro["12"]}
            />
            <br />
            <ButtonJogo
              x="2"
              y="0"
              onClick={this.onClick}
              text={tabuleiro["20"]}
            />
            <ButtonJogo
              x="2"
              y="1"
              onClick={this.onClick}
              text={tabuleiro["21"]}
            />
            <ButtonJogo
              x="2"
              y="2"
              onClick={this.onClick}
              text={tabuleiro["22"]}
            />
          </React.Fragment>
        );
    };

    return (
      <div>
        Seu nick: {this.state.nick}
        <br />
        {renderSuaVez()}
        <br />
        {renderTabuleiro()}
        <br />
        <Lista itens={this.state.lista} />
      </div>
    );
  }
}
