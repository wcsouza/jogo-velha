import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import io from "socket.io-client";
import Lista from "../components/lista";
import Tabuleiro from "../components/tabuleiro";

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
        return <Tabuleiro tabuleiro={tabuleiro} onClick={this.onClick} />;
    };

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {renderSuaVez()}
        </Grid>
        <Grid item xs={9}>
          {renderTabuleiro()}
        </Grid>
        <Grid item xs={3}>
          <Lista itens={this.state.lista} />
        </Grid>
      </Grid>
    );
  }
}
