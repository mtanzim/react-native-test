import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class EachCard extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    val: PropTypes.number.isRequired,
    handlePress: PropTypes.func.isRequired,
    isCardSelected: PropTypes.bool.isRequired
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.handlePress(this.props.val, this.props.id)}
      >
        <Text
          style={[
            styles.childTarget,
            this.props.isCardSelected && styles.selected
          ]}
          id={this.props.id}
          key={this.props.id}
        >
          {this.props.val}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  childTarget: {
    width: 100,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 10,
    fontSize: 23,
    textAlign: "center",
    backgroundColor: "#aaa",
  },
  selected: {
    opacity: 0.3
  },

});
