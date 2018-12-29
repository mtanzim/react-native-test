import React from "react";
import Game from "./components/Game";
import StartMenu from "./components/StartMenu";

export default class App extends React.Component {
  difficulty = [
    {
      id: 0,
      label: "Easy",
      config: {
        NUMCOMPONENTS: 9,
        SUMCOMPONENTS: 3,
        GAME_TIME: 7
      }
    },
    {
      id: 1,
      label: "Hard",
      config: {
        NUMCOMPONENTS: 12,
        SUMCOMPONENTS: 5,
        GAME_TIME: 5
      }
    },
    {
      id: 2,
      label: "Impossibru",
      config: {
        NUMCOMPONENTS: 12,
        SUMCOMPONENTS: 9,
        GAME_TIME: 3
      }
    },
  ];

  // default settings
  NUMCOMPONENTS = 12;
  SUMCOMPONENTS = 5;
  GAME_TIME = 5;

  #LOWER_BOUND = 1;
  #UPPPER_BOUND = 10;
  #LOADING_TIME = 500;
  #TICKER_INTERVAL = 1000;
  #MAX_GAMES_LIMIT = 999;

  state = {
    gameId: 0,
    wins: 0,
    losses: 0,
    running: false,
  };



  startGame = () => {
    this.setState({running: true});
  }
  stopGame = () => {
    this.setState({running: false});
  }

  setDifficulty = config => () => {
    let { NUMCOMPONENTS, SUMCOMPONENTS, GAME_TIME } = config;
    
    this.NUMCOMPONENTS = NUMCOMPONENTS;
    this.SUMCOMPONENTS = SUMCOMPONENTS;
    this.GAME_TIME = GAME_TIME;

    console.log(config);
    this.startGame()
    // console.log(this.SUMCOMPONENTS)

  };

  resetAll = (childTimer, goBack = false) => () => {
    clearTimeout(childTimer);
    this.setState({
      gameId: 0,
      wins: 0,
      losses: 0
    });

    if (goBack) {
      this.stopGame();
    }

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
    return this.state.running ? (
      <Game
        key={this.state.gameId}
        id={this.state.gameId}
        wins={this.state.wins}
        losses={this.state.losses}
        numComponents={this.NUMCOMPONENTS}
        sumComponents={this.SUMCOMPONENTS}
        lowerBound={this.#LOWER_BOUND}
        upperBound={this.#UPPPER_BOUND}
        loadingTime={this.#LOADING_TIME}
        gameTime={this.GAME_TIME}
        tickerInterval={this.#TICKER_INTERVAL}
        resetGame={this.resetGame}
        resetAll={this.resetAll}
      />
    ) :
    (
      <StartMenu difficultyArr={this.difficulty} setDifficulty={this.setDifficulty}/>
    )
  }
}
