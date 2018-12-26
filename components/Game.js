import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import EachCard from "./EachCard";

export default class Game extends React.Component {
  static propTypes = {
    numComponents: PropTypes.number.isRequired,
    sumComponents: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    upperBound: PropTypes.number.isRequired,
    loadingTime: PropTypes.number.isRequired,
    gameTime: PropTypes.number.isRequired,
    tickerInterval: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.currentSum = 0;
    this.gameSum = 0;
    this.numberArray = [];
    // this.gameStatus = 'PLAYING'
    this.state = this.generateRandoms();

    setInterval(() => {
      this.setState(prevState => {
        return { remainingTime: prevState.remainingTime - 1 };
      }, this.checkTimeStatus);
    }, this.props.tickerInterval);
  }

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

    let isLoading = false;
    let isWin = false;
    let selectedIds = [];
    let remainingTime = this.props.gameTime;

    return { remainingTime, isLoading, selectedIds, isWin };
  };

  restartGame = isWin => {
    this.setState({ isLoading: true, isWin });
    setTimeout(
      () => this.setState(this.generateRandoms()),
      this.props.loadingTime
    );
  };

  checkTimeStatus = () => {
    if (this.state.remainingTime <= 0 && !this.state.isWin) this.restartGame(false);
  };

  checkStatus = () => {
    // console.warn(this.currentSum);
    this.currentSum = this.state.selectedIds.reduce(
      (acc, cur) => acc + this.numberArray[cur],
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
          {!this.state.isLoading && Array.from({length:this.state.remainingTime}).map( (a,i) => (
            <Text style={styles.timeChild} key={i}>X</Text>
          ))}
        </View>
        <View style={styles.childContainer}>
          {!this.state.isLoading &&
            this.numberArray.map((a, i) => (
              <EachCard
                isCardSelected={this.isCardSelected(i)}
                val={a}
                id={i}
                key={i}
                handlePress={this.handlePress}
              />
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingTop: 60,
    // marginTop: 30
  },
  sumTarget: {
    marginHorizontal: 15,
    paddingVertical: 30,
    fontSize: 40,
    textAlign: "center"
  },
  timeContainer: {
    flex: 0.15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: 'flex-start',
    marginHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "flex-start",
    // backgroundColor: 'yellow',
    height: 20,
  },
  timeChild: {
    backgroundColor: 'red',
    color: 'red',
    width: 50,
    height: 25,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  childContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  WON_STYLE: {
    backgroundColor: "green"
  },
  LOST_STYLE: {
    backgroundColor: "red"
  },
  PLAYING_STYLE: {
    backgroundColor: "orange"
  },
});
