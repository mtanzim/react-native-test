import React from "react";
import Game from "./components/Game";

export default class App extends React.Component {
  #NUMCOMPONENTS = 6;
  #SUMCOMPONENTS = 3;

  render() {
    return (
      <Game
        numComponents={this.#NUMCOMPONENTS}
        sumComponents={this.#SUMCOMPONENTS}
      />
    );
  }
}
