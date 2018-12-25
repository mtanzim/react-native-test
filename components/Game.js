import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import EachCard from "./EachCard";

export default class Game extends React.Component {
  static propTypes = {
    numComponents: PropTypes.number.isRequired,
    sumComponents: PropTypes.number.isRequired
  };

  LOWER_BOUND = 10;
  UPPPER_BOUND = 40;
  LOADING_TIME = 500;

  constructor(props) {
    super(props);
    this.currentSum = 0;
    this.state = this.generateRandoms();
  }

  generateRandoms = () => {
    let currentSum = 0;
    let sum = 0;
    let numberArray = Array.from({ length: this.props.numComponents }).map(
      () => this.LOWER_BOUND + Math.floor(this.UPPPER_BOUND * Math.random())
    );
    // TODO: shuffle random numbers
    sum = numberArray
      .slice(0, this.props.sumComponents)
      .reduce((a, b) => a + b, 0);

    let isLoading = false;
    let isWin = false;
    let selectedNumbers = [];

    return { sum, numberArray, isLoading, isWin, selectedNumbers, currentSum };
  };

  restartGame = isWin => {
    this.setState({ isLoading: true, isWin });
    setTimeout(() => this.setState(this.generateRandoms()), this.LOADING_TIME);
  };

  handlePress = (val, id) => () => {
    // console.log(val);
    if (!this.isCardSelected(id)) {
      this.setState(
        {
          currentSum: this.state.currentSum + val,
          selectedNumbers: this.state.selectedNumbers.concat([id])
        },
        () => {
          if (this.state.currentSum === this.state.sum) {
            this.restartGame(true);
          } else if (this.state.currentSum > this.state.sum) {
            this.restartGame(false);
          }
        }
      );
    }
  };

  isCardSelected = id => this.state.selectedNumbers.indexOf(id) >= 0;

  render() {
    console.log(this.state.selectedNumbers);
    return (
      <View style={styles.container}>
        <Text style={styles.sumTarget}>
          {!this.state.isLoading
            ? this.state.sum
            : this.state.isWin
            ? "WON"
            : "LOST"}
        </Text>
        <View style={styles.childContainer}>
          {!this.state.isLoading &&
            this.state.numberArray.map((a, i) => (
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
    paddingTop: 60
    // marginTop: 30
  },
  sumTarget: {
    marginHorizontal: 15,
    paddingVertical: 30,
    fontSize: 40,
    backgroundColor: "cyan",
    textAlign: "center"
  },
  childContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ddd",
    marginTop: 75
  }
});
