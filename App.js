import React from "react";
import Game from "./components/Game";

export default class App extends React.Component {

  #NUMCOMPONENTS = 6;
  #SUMCOMPONENTS = 3;
  #LOWER_BOUND = 10;
  #UPPPER_BOUND = 40;
  #LOADING_TIME = 500;
  #GAME_TIME = 10;
  #TICKER_INTERVAL = 1000;

  render() {
    return (
      <Game
        numComponents={this.#NUMCOMPONENTS}
        sumComponents={this.#SUMCOMPONENTS}
        lowerBound={this.#LOWER_BOUND}
        upperBound={this.#UPPPER_BOUND}
        loadingTime={this.#LOADING_TIME}
        gameTime={this.#GAME_TIME}
        tickerInterval={this.#TICKER_INTERVAL}
      />
    );
  }
}
