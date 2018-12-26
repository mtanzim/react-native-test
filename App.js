import React from "react";
import Game from "./components/Game";

export default class App extends React.Component {
  #NUMCOMPONENTS = 12;
  #SUMCOMPONENTS = 5;
  #LOWER_BOUND = 1;
  #UPPPER_BOUND = 10;
  #LOADING_TIME = 500;
  #GAME_TIME = 5;
  #TICKER_INTERVAL = 1000;
  #MAX_GAMES_LIMIT = 999;

  state = {
    gameId: 0,
    wins: 0,
    losses: 0
  };

  resetAll = (childTimer) => () => {
    clearTimeout(childTimer);
    this.setState({
      gameId: 0,
      wins: 0,
      losses: 0
    });
  };

  resetGame = isWin => {
    this.setState(
      prevState => {
        if (prevState.gameId > this.#MAX_GAMES_LIMIT) {
          return {
            gameId: 0,
            wins: 0,
            losses: 0
          };
        } else {
          return {
            gameId: prevState.gameId + 1,
            wins: isWin ? prevState.wins + 1 : prevState.wins,
            losses: !isWin ? prevState.losses + 1 : prevState.losses
          };
        }
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  render() {
    return (
      <Game
        key={this.state.gameId}
        id={this.state.gameId}
        wins={this.state.wins}
        losses={this.state.losses}
        numComponents={this.#NUMCOMPONENTS}
        sumComponents={this.#SUMCOMPONENTS}
        lowerBound={this.#LOWER_BOUND}
        upperBound={this.#UPPPER_BOUND}
        loadingTime={this.#LOADING_TIME}
        gameTime={this.#GAME_TIME}
        tickerInterval={this.#TICKER_INTERVAL}
        resetGame={this.resetGame}
        resetAll={this.resetAll}
      />
    );
  }
}
