import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class entrar extends Component {
  constructor(props) {
    super(props);
    this.state = { nick: "" };
  }

  entrarJogo = () => {
    const { nick } = this.state;
    if (nick) this.props.history.push("/jogo", { nick });
  };

  render() {
    return (
      <div>
        Entrar
        <br />
        <input
          value={this.state.nick}
          onChange={e => {
            this.setState({ nick: e.target.value });
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.entrarJogo();
          }}
        >
          Jogar
        </Button>
        {/* <Link to="/jogo/">Jogar</Link> */}
      </div>
    );
  }
}
