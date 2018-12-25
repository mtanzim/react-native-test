import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

export default class EachCard extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    val: PropTypes.number.isRequired,
    // key: PropTypes.number.isRequired
  };

  render() {
    return (
      <Text style={styles.childTarget} id={this.props.id} key={this.props.index}>
        {this.props.val}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  childTarget: {
    width:100,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 10,
    fontSize: 23,
    backgroundColor: "#aaa",
    textAlign: "center"
  }
});
