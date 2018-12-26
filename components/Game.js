import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";

import EachCard from "./EachCard";

import shuffle from 'lodash.shuffle';

export default class Game extends React.Component {
  static propTypes = {
    numComponents: PropTypes.number.isRequired,
    sumComponents: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    upperBound: PropTypes.number.isRequired,
    loadingTime: PropTypes.number.isRequired,
    gameTime: PropTypes.number.isRequired,
    tickerInterval: PropTypes.number.isRequired,
    resetGame: PropTypes.func.isRequired,
    resetAll: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired
  };

  constructor(props) {
    console.log(`Mounted game ${props.id}`);
    super(props);
    this.currentSum = 0;
    this.gameSum = 0;
    this.numberArray = [];
    this.numberArrayShuffled = [];
    this.timer = undefined;
    this.state = this.generateRandoms();
  }

  startTimer = () => {
    return setInterval(() => {
      this.setState(prevState => {
        return { remainingTime: prevState.remainingTime - 1 };
      }, this.checkTimeStatus);
    }, this.props.tickerInterval);
  };

  generateRandoms = () => {
    // let currentSum = 0;
    // let sum = 0;
    this.gameSum = 0;
    this.currentSum = 0;
    this.numberArray = Array.from({ length: this.props.numComponents }).map(
      () =>
        this.props.lowerBound +
        Math.floor(this.props.upperBound * Math.random())
    );
    // TODO: shuffle random numbers
    this.gameSum = this.numberArray
      .slice(0, this.props.sumComponents)
      .reduce((a, b) => a + b, 0);

    this.numberArrayShuffled = shuffle(this.numberArray);

    let isLoading = false;
    let isWin = false;
    let selectedIds = [];
    let remainingTime = this.props.gameTime;
    // console.log(this.timer)
    if (!this.timer) this.timer = this.startTimer();
    // console.log(this.timer)

    return { remainingTime, isLoading, selectedIds, isWin };
  };

  restartGame = (isWin) => {
    console.log('Restarting!');
    clearTimeout(this.timer);
    this.setState({ isLoading: true, isWin });
    setTimeout(
      // () => this.setState(this.generateRandoms()),
      () => this.props.resetGame(isWin),
      this.props.loadingTime
    );
  };

  checkTimeStatus = () => {
    if (this.state.remainingTime <= 0 && !this.state.isWin)
      this.restartGame(false);
  };

  checkStatus = () => {
    // if (this.state.selectedIds.length < this.props.sumComponents) return;
    // console.log('Checking status');
    // console.warn(this.currentSum);
    this.currentSum = this.state.selectedIds.reduce(
      (acc, cur) => acc + this.numberArrayShuffled[cur],
      0
    );
    if (this.gameSum === this.currentSum) {
      this.restartGame(true);
    } else if (this.currentSum > this.gameSum) {
      this.restartGame(false);
    }
  };

  handlePress = (val, id) => () => {
    // setState callback ensures
    if (!this.isCardSelected(id)) {
      this.setState(
        prevState => ({ selectedIds: [...prevState.selectedIds, id] }),
        this.checkStatus
      );
    }
  };

  isCardSelected = id => this.state.selectedIds.indexOf(id) >= 0;

  render() {
    // console.log(this.state.selectedIds);
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <Text>{`${this.props.wins} wins`}</Text>
          <Text>{this.props.wins + this.props.losses ? `${Math.floor(this.props.wins/ (this.props.wins + this.props.losses)*100)}% win rate`: ``}</Text>
          <Text>{`${this.props.losses} losses`}</Text>
        </View>
        <Text
          style={[
            styles.sumTarget,
            !this.state.isLoading && styles.PLAYING_STYLE,
            this.state.isLoading && this.state.isWin && styles.WON_STYLE,
            this.state.isLoading && !this.state.isWin && styles.LOST_STYLE
          ]}
        >
          {!this.state.isLoading
            ? this.gameSum
            : this.state.isWin
            ? "WON"
            : "LOST"}
        </Text>
        <View style={styles.timeContainer}>
          {!this.state.isLoading &&
            Array.from({ length: this.state.remainingTime }).map((a, i) => (
              <Text style={styles.timeChild} key={i}>
                X
              </Text>
            ))}
        </View>
        <View style={styles.childContainer}>
          {!this.state.isLoading &&
            this.numberArrayShuffled.map((a, i) => (
              <EachCard
                isCardSelected={this.isCardSelected(i)}
                val={a}
                id={i}
                key={i}
                handlePress={this.handlePress}
              />
            ))}
        </View>
        <Button color={styles.resetBtn.backgroundColor} disabled={this.props.id < 1} title="Reset" onPress={this.props.resetAll(this.timer)}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingTop: 35,
    paddingBottom: 50,
    paddingHorizontal: 15,
    // marginTop: 30
  },
  resetBtn: {
    backgroundColor: '#03a9f4',
  },
  scoreContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginHorizontal: 2,
    paddingVertical: 2,
    fontSize: 40,
    textAlign: "center"
  },
  sumTarget: {
    marginHorizontal: 15,
    paddingVertical: 30,
    fontSize: 40,
    textAlign: "center"
  },
  timeContainer: {
    flex: 0.25,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    marginHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    // backgroundColor: 'yellow',
    height: 20
  },
  timeChild: {
    backgroundColor: "#f44336",
    color: "#f44336",
    width: 50,
    height: 25,
    marginHorizontal: 3,
    marginVertical: 2
  },
  childContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "flex-start"
  },
  WON_STYLE: {
    backgroundColor: "#4caf50"
  },
  LOST_STYLE: {
    backgroundColor: "#f44336"
  },
  PLAYING_STYLE: {
    backgroundColor: "#ff9800"
  }
});
