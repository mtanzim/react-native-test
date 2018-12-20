import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Game extends React.Component {
  render() {
    // console.warn('Hello');
    // console.warn('ooh this is fun!');
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
        <Text style={styles.textSubtitle}>Welcome to my React Native Project</Text>
        <Text style={styles.textSubtitle}>How fast will this change with an emulator?</Text>
        <Text style={styles.textSubtitle}>Ooooh that is much faster! Is it working over network?</Text>
        <Text style={styles.textAuthor}> - Tanzim Mokammel</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
  },
  textSubtitle: {
    fontSize: 12,
    // alignText: 'center'
  },
  textAuthor: {
    fontSize: 20,
  }
  
});