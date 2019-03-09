import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default class lista extends Component {
  render() {
    return (
      <div>
        Lista:
        <List>
          {this.props.itens.map(it => {
            return (
              <ListItem key={it.name}>
                <ListItemText primary={it.name} secondary={it.status} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
