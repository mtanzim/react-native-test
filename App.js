import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
        <Text style={styles.textSubtitle}>Welcome to my React Native Project.</Text>
        <Text style={styles.textAuthor}> - Tanzim Mokammel</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
  },
  textSubtitle: {
    fontSize: 20,
  },
  textAuthor: {
    fontSize: 12,
  }
  
});