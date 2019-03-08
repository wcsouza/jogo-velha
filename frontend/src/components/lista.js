import React, { Component } from "react";

export default class lista extends Component {
  render() {
    return (
      <div>
        Lista:
        <ul>
          {this.props.itens.map(it => {
            return (
              <li key={it.name}>
                {it.name} {it.status}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
