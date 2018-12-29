import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
// import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from "prop-types";
// import {Font} from 'expo';

export default class StartMenu extends React.Component {
  static propTypes = {
    difficultyArr: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        config: PropTypes.shape({
          NUMCOMPONENTS: PropTypes.number,
          SUMCOMPONENTS: PropTypes.number,
          GAME_TIME: PropTypes.number
        })
      })
    ).isRequired,
    setDifficulty: PropTypes.func.isRequired
  };

  /*   componentDidMount() {
    Font.loadAsync({
      'fa_solid_900': require('../assets/fonts/solid-900.otf'),
    });
  } */

  render() {
    return (
      <View style={styles.menuContainer}>
        <View style={styles.menuTextContainer}>
          <Text style={styles.titleText}>+ + +</Text>
          <Text style={styles.menuText}>
            Tap the numbers to add to the specified sum before time runs out!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.menuText}>
            Select difficulty to start the game:
          </Text>
          {this.props.difficultyArr.map(a => (
            <Button
              style={styles.buttonStyles}
              key={a.id}
              onPress={this.props.setDifficulty(a.config)}
              title={a.label}
            />
          ))}
        </View>
        {/* <FontAwesome>{Icons.chevronLeft}</FontAwesome> */}
        <TouchableOpacity
          onPress={() =>
            Linking.canOpenURL("https://github.com/mtanzim")
              .then(supported => {
                if (!supported) console.log("Cannot open");
                else Linking.openURL("https://github.com/mtanzim");
              })
              .catch(err => console.log(err))
          }
        >
          <Text style={{ color: "black", textAlign: "center" }}>@mtanzim</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#ddd",
    paddingTop: 35,
    paddingBottom: 50,
    paddingHorizontal: 15
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 65
  },
  buttonStyles: {},
  menuTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 25
  },
  menuText: {
    // alignSelf: 'center',
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
    paddingVertical: 0
  },
  titleText: {
    // width: 75,
    // marginHorizontal: 25,
    fontSize: 80,
    alignSelf: "center",
    marginVertical: 5,
    paddingVertical: 0
  },
  selected: {
    opacity: 0.3
  }
});
