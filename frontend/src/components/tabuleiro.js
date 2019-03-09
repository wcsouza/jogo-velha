import React, { Component } from "react";
import ButtonTabuleiro from "./buttonTabuleiro";

export default class tabuleiro extends Component {
  render() {
    const { tabuleiro, onClick } = this.props;
    return (
      <React.Fragment>
        <ButtonTabuleiro x="0" y="0" onClick={onClick} text={tabuleiro["00"]} />
        <ButtonTabuleiro x="0" y="1" onClick={onClick} text={tabuleiro["01"]} />
        <ButtonTabuleiro x="0" y="2" onClick={onClick} text={tabuleiro["02"]} />
        <br />
        <ButtonTabuleiro x="1" y="0" onClick={onClick} text={tabuleiro["10"]} />
        <ButtonTabuleiro x="1" y="1" onClick={onClick} text={tabuleiro["11"]} />
        <ButtonTabuleiro x="1" y="2" onClick={onClick} text={tabuleiro["12"]} />
        <br />
        <ButtonTabuleiro x="2" y="0" onClick={onClick} text={tabuleiro["20"]} />
        <ButtonTabuleiro x="2" y="1" onClick={onClick} text={tabuleiro["21"]} />
        <ButtonTabuleiro x="2" y="2" onClick={onClick} text={tabuleiro["22"]} />
      </React.Fragment>
    );
  }
}
