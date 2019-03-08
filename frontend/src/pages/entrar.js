import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class entrar extends Component {
  render() {
    return (
      <div>
        Entrar
        <br />
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <Link to="/jogo/">Jogar</Link>
      </div>
    );
  }
}
