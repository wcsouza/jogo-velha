import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Entrar from "./pages/entrar";
import Jogo from "./pages/jogo";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Entrar} />
          <Route path="/jogo/" component={Jogo} />
          {/* <Route path="/users/" component={Users} />  */}
        </div>
      </Router>
    );
  }
}

export default App;
