import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import EachCard from './EachCard'

export default class Game extends React.Component {
  static propTypes = {
    numComponents: PropTypes.number.isRequired,
    sumComponents: PropTypes.number.isRequired
  };

  LOWER_BOUND = 10;
  UPPPER_BOUND = 40;

  numberArray = Array
    .from({ length: this.props.numComponents })
    .map( () => this.LOWER_BOUND + Math.floor(this.UPPPER_BOUND * Math.random()));

  // TODO: shuffle random numbers
  sum = this.numberArray
    .slice(0,this.props.sumComponents)
    .reduce((a, b) =>  a + b, 0);

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sumTarget}>{this.sum}</Text>
        <View style={styles.childContainer}>
          {this.numberArray.map((a, i) => (
            <EachCard val={a} id={i} key={i}/>
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
    backgroundColor: "cyan",
    textAlign: "center"
  },
  childContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#ddd",
    marginTop: 75
  },
});
