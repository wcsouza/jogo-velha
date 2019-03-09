import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class buttonTabuleiro extends Component {
  render() {
    const { x, y, onClick, text } = this.props;
    return (
      <Button variant="contained" color="default" onClick={e => onClick(x, y)}>
        {text}
      </Button>
    );
  }
}
